import { useState, useEffect, useCallback, useRef } from 'react'
import logo from '../assets/logo.png'
import './DataDash.css'

const TOKEN_KEY = 'hb_admin_token'
const REFRESH_INTERVAL = 30

const POSITIONS = {
  'delivery-driver':  'Delivery Driver',
  'laundry-operator': 'Laundry Operator',
  'garment-care':     'Garment Care Specialist',
  'customer-support': 'Customer Support',
  'ironing-pressing': 'Ironing & Pressing',
  'general-staff':    'General Staff',
}

const POS_COLORS = {
  'delivery-driver':  { bg: '#dcfce7', color: '#15803d' },
  'laundry-operator': { bg: '#dbeafe', color: '#1d4ed8' },
  'garment-care':     { bg: '#ffedd5', color: '#c2410c' },
  'customer-support': { bg: '#fef9c3', color: '#a16207' },
  'ironing-pressing': { bg: '#ede9fe', color: '#6d28d9' },
  'general-staff':    { bg: '#f1f5f9', color: '#475569' },
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function initials(name = '') {
  return name.split(' ').filter(Boolean).map(n => n[0]).join('').slice(0, 2).toUpperCase()
}

function formatShort(ts) {
  const d = new Date(ts)
  const now = new Date()
  if (d.toDateString() === now.toDateString()) {
    return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
  }
  const yest = new Date(now); yest.setDate(yest.getDate() - 1)
  if (d.toDateString() === yest.toDateString()) return 'Yesterday'
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })
}

function formatFull(ts) {
  return new Date(ts).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

function applyFilters(data, type, { status, position, state: fState, investment }, search) {
  return data.filter(item => {
    if (status === 'unread' && item.is_read) return false

    if (search) {
      const q = search.toLowerCase()
      const hay = type === 'franchise'
        ? `${item.first_name} ${item.last_name || ''} ${item.email} ${item.mobile} ${item.city} ${item.state}`.toLowerCase()
        : `${item.name} ${item.email || ''} ${item.phone} ${POSITIONS[item.position] || item.position}`.toLowerCase()
      if (!hay.includes(q)) return false
    }

    if (type === 'jobs'      && position   && item.position       !== position)   return false
    if (type === 'franchise' && fState     && item.state          !== fState)     return false
    if (type === 'franchise' && investment && item.investment_range !== investment) return false

    return true
  })
}

// ── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({ icon, label, value, color, unread }) {
  return (
    <div className="dd-stat-card">
      <div className="dd-stat-icon" style={{ background: color + '18', color }}>{icon}</div>
      <div className="dd-stat-body">
        <div className="dd-stat-value">
          {value ?? '—'}
          {unread > 0 && <span className="dd-stat-unread">{unread} new</span>}
        </div>
        <div className="dd-stat-label">{label}</div>
      </div>
    </div>
  )
}

// ── Inbox Item ────────────────────────────────────────────────────────────────
function InboxItem({ item, type, isSelected, isChecked, onSelect, onCheck }) {
  const isUnread = !item.is_read
  const name = type === 'franchise'
    ? `${item.first_name} ${item.last_name || ''}`.trim()
    : item.name

  const tagLabel = type === 'franchise'
    ? `${item.city}, ${item.state}`
    : POSITIONS[item.position] || item.position

  const preview = type === 'franchise'
    ? `${item.investment_range || 'Investment not specified'} · ${item.timeline || 'Timeline not specified'}`
    : (item.message || 'No message provided')

  const pc = type === 'jobs' ? (POS_COLORS[item.position] || POS_COLORS['general-staff']) : null

  return (
    <div
      className={`dd-item ${isUnread ? 'unread' : ''} ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(item.id)}
    >
      <div
        className="dd-item-check"
        onClick={e => { e.stopPropagation(); onCheck(item.id) }}
      >
        <div className={`dd-cb ${isChecked ? 'checked' : ''}`}>
          {isChecked && (
            <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="2 6 5 9 10 3" />
            </svg>
          )}
        </div>
      </div>

      <div
        className="dd-item-avatar"
        style={pc ? { background: `linear-gradient(135deg, ${pc.color}aa, ${pc.color})` } : {}}
      >
        {initials(name)}
      </div>

      <div className="dd-item-body">
        <div className="dd-item-row1">
          <span className="dd-item-name">{name}</span>
          <span className="dd-item-time">{formatShort(item.created_at)}</span>
        </div>
        <div className="dd-item-row2">
          {type === 'jobs'
            ? <span className="dd-item-tag" style={{ background: pc.bg, color: pc.color }}>{tagLabel}</span>
            : <span className="dd-item-loc">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                {tagLabel}
              </span>
          }
          <span className="dd-item-preview">{preview.length > 55 ? preview.slice(0, 55) + '…' : preview}</span>
        </div>
      </div>

      {isUnread && !isSelected && <div className="dd-unread-pip" />}
    </div>
  )
}

// ── Detail Panel ──────────────────────────────────────────────────────────────
function DetailPanel({ item, type, onClose, onMarkRead, onDelete }) {
  if (!item) {
    return (
      <div className="dd-detail-empty">
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
        <p>Select a submission to view details</p>
      </div>
    )
  }

  const name  = type === 'franchise' ? `${item.first_name} ${item.last_name || ''}`.trim() : item.name
  const email = item.email
  const phone = type === 'franchise' ? item.mobile : item.phone
  const pc    = type === 'jobs' ? (POS_COLORS[item.position] || POS_COLORS['general-staff']) : null

  const subject = type === 'franchise'
    ? `Franchise Enquiry — ${item.city}, ${item.state}`
    : `Application for ${POSITIONS[item.position] || item.position}`

  return (
    <div className="dd-detail">

      {/* ── Subject + action buttons ── */}
      <div className="dd-email-topbar">
        <h2 className="dd-email-subject">{subject}</h2>
        <div className="dd-email-topbar-actions">
          {!item.is_read && (
            <button className="dd-action-btn dd-action-read" onClick={() => onMarkRead(item.id)}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              Mark Read
            </button>
          )}
          <button className="dd-action-btn dd-action-delete" onClick={() => onDelete(item.id)}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
              <path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
            </svg>
            Delete
          </button>
          <button className="dd-detail-close" onClick={onClose}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      </div>

      {/* ── From / sender row ── */}
      <div className="dd-email-from-row">
        <div
          className="dd-email-from-avatar"
          style={pc ? { background: `linear-gradient(135deg, ${pc.color}99, ${pc.color})` } : {}}
        >
          {initials(name)}
        </div>

        <div className="dd-email-from-body">
          <div className="dd-email-from-name">
            {name}
            {type === 'jobs' && (
              <span className="dd-email-badge" style={{ background: pc.bg, color: pc.color }}>
                {POSITIONS[item.position] || item.position}
              </span>
            )}
            {type === 'franchise' && (
              <span className="dd-email-loc">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                {item.city}, {item.state}
              </span>
            )}
          </div>
          <div className="dd-email-from-contact">
            {email && <a href={`mailto:${email}`}>{email}</a>}
            {email && phone && <span className="dd-dot-sep">·</span>}
            {phone && <a href={`tel:${phone}`}>{phone}</a>}
          </div>
        </div>

        <div className="dd-email-timestamp">
          <div className="dd-email-ts-date">{formatFull(item.created_at)}</div>
          <span className={`dd-read-status ${item.is_read ? 'is-read' : 'is-unread'}`}>
            {item.is_read ? '✓ Read' : '● Unread'}
          </span>
        </div>
      </div>

      <div className="dd-email-rule" />

      {/* ── Body ── */}
      <div className="dd-email-body">
        {type === 'franchise' && (
          <>
            <p className="dd-email-intro">
              Hi, I'm interested in opening a <strong>Hangers &amp; Basket</strong> franchise
              in <strong>{item.city}, {item.state}</strong>.
            </p>

            {(item.investment_range || item.timeline) && (
              <div className="dd-email-chips">
                {item.investment_range && (
                  <div className="dd-email-chip">
                    <span>Investment Range</span>
                    <strong>{item.investment_range}</strong>
                  </div>
                )}
                {item.timeline && (
                  <div className="dd-email-chip">
                    <span>Preferred Timeline</span>
                    <strong>{item.timeline}</strong>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {type === 'jobs' && (
          <>
            <p className="dd-email-intro">
              I am applying for the position of <strong>{POSITIONS[item.position] || item.position}</strong>.
            </p>
            {item.message
              ? <div className="dd-email-msg-box">
                  <div className="dd-email-msg-label">Message</div>
                  <p className="dd-email-msg-text">{item.message}</p>
                </div>
              : <p className="dd-email-no-msg">No message provided.</p>
            }
          </>
        )}

        {/* Contact footer */}
        <div className="dd-email-contact-footer">
          <div className="dd-ecf-title">Contact Details</div>
          <div className="dd-ecf-rows">
            <div className="dd-ecf-row">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.86 9.11 19.79 19.79 0 01.77 .5 2 2 0 012.78 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L7.09 7.91a16 16 0 006 6l.91-.91a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 15.28z"/></svg>
              <a href={`tel:${phone}`}>{phone}</a>
            </div>
            {email && (
              <div className="dd-ecf-row">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <a href={`mailto:${email}`}>{email}</a>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  )
}

// ── Toolbar ───────────────────────────────────────────────────────────────────
function Toolbar({ filteredData, allData, checkedIds, setCheckedIds, onBulkRead, countdown, onRefresh, refreshing, activeTab, filters, setFilters, search, setSearch }) {
  const allChecked  = filteredData.length > 0 && filteredData.every(i => checkedIds.has(i.id))
  const someChecked = !allChecked && filteredData.some(i => checkedIds.has(i.id))
  const unreadCount = allData.filter(i => !i.is_read).length

  const states      = activeTab === 'franchise' ? [...new Set(allData.map(i => i.state).filter(Boolean))].sort()      : []
  const investments = activeTab === 'franchise' ? [...new Set(allData.map(i => i.investment_range).filter(Boolean))]   : []

  const toggleAll = () => {
    if (allChecked) {
      setCheckedIds(new Set())
    } else {
      setCheckedIds(new Set(filteredData.map(i => i.id)))
    }
  }

  return (
    <div className="dd-toolbar">
      <div className="dd-toolbar-left">
        {/* Select-all checkbox */}
        <div
          className={`dd-cb ${allChecked ? 'checked' : someChecked ? 'partial' : ''}`}
          onClick={toggleAll}
          title={allChecked ? 'Deselect all' : 'Select all'}
        >
          {allChecked && (
            <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="2 6 5 9 10 3" />
            </svg>
          )}
          {someChecked && !allChecked && <div className="dd-cb-dash" />}
        </div>

        {checkedIds.size > 0 ? (
          <button className="dd-bulk-btn" onClick={onBulkRead}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            Mark {checkedIds.size} as Read
          </button>
        ) : (
          <div className="dd-filters">
            <button
              className={`dd-chip ${filters.status === 'all' ? 'active' : ''}`}
              onClick={() => setFilters(f => ({ ...f, status: 'all' }))}
            >
              All <span className="dd-chip-n">{allData.length}</span>
            </button>
            <button
              className={`dd-chip ${filters.status === 'unread' ? 'active' : ''}`}
              onClick={() => setFilters(f => ({ ...f, status: 'unread' }))}
            >
              Unread
              {unreadCount > 0 && <span className="dd-chip-n unread">{unreadCount}</span>}
            </button>

            {activeTab === 'jobs' && (
              <select
                className="dd-filter-sel"
                value={filters.position}
                onChange={e => setFilters(f => ({ ...f, position: e.target.value }))}
              >
                <option value="">All Positions</option>
                {Object.entries(POSITIONS).map(([id, label]) => (
                  <option key={id} value={id}>{label}</option>
                ))}
              </select>
            )}

            {activeTab === 'franchise' && (
              <>
                <select
                  className="dd-filter-sel"
                  value={filters.state}
                  onChange={e => setFilters(f => ({ ...f, state: e.target.value }))}
                >
                  <option value="">All States</option>
                  {states.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <select
                  className="dd-filter-sel"
                  value={filters.investment}
                  onChange={e => setFilters(f => ({ ...f, investment: e.target.value }))}
                >
                  <option value="">All Investments</option>
                  {investments.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
              </>
            )}
          </div>
        )}
      </div>

      <div className="dd-toolbar-right">
        <div className="dd-search-wrap">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            className="dd-search"
            placeholder={activeTab === 'franchise' ? 'Search name, city, email…' : 'Search name, position…'}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && <button className="dd-search-clear" onClick={() => setSearch('')}>×</button>}
        </div>

        <button
          className={`dd-refresh-pill ${refreshing ? 'spinning' : ''}`}
          onClick={onRefresh}
          title="Refresh now"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
            <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>
          </svg>
          {refreshing ? 'Refreshing…' : `${countdown}s`}
        </button>
      </div>
    </div>
  )
}

const UNITS = ['piece', 'pair', 'kg', 'sqft', '2pc', '3pc', 'job']
const BLANK_FORM = { service_type: '', category: '', item_name: '', price: '', unit: 'piece' }

// ── Pricing Tab ───────────────────────────────────────────────────────────────
const BLANK_META = { description: '', svg_icon: '', accent_color: '#1F5FFF' }

function PricingTab({ token }) {
  const [pricing,          setPricing]          = useState([])
  const [loading,          setLoading]          = useState(true)
  const [editingId,        setEditingId]        = useState(null)
  const [editValue,        setEditValue]        = useState('')
  const [saving,           setSaving]           = useState(false)
  const [editingNameId,    setEditingNameId]    = useState(null)
  const [editNameValue,    setEditNameValue]    = useState('')
  const [savingName,       setSavingName]       = useState(false)
  const [uploadStatus,     setUploadStatus]     = useState(null)
  const [expandedServices, setExpandedServices] = useState(new Set())
  const [showAdd,          setShowAdd]          = useState(false)
  const [addForm,          setAddForm]          = useState(BLANK_FORM)
  const [addSaving,        setAddSaving]        = useState(false)
  // Service metadata (description + SVG + accent)
  const [serviceMeta,      setServiceMeta]      = useState({})
  const [showEditMeta,     setShowEditMeta]     = useState(null)
  const [editMetaForm,     setEditMetaForm]     = useState(BLANK_META)
  const [savingMeta,       setSavingMeta]       = useState(false)
  // Inline add-item within a category
  const [inlineAdd,        setInlineAdd]        = useState(null)  // { svc, cat } | null
  const [inlineForm,       setInlineForm]       = useState({ item_name: '', price: '', unit: 'piece' })
  const [inlineSaving,     setInlineSaving]     = useState(false)
  const fileInputRef    = useRef(null)
  const svgFileInputRef = useRef(null)
  const headers = { Authorization: `Bearer ${token}` }

  const fetchPricing = useCallback(async () => {
    setLoading(true)
    try {
      const res  = await fetch('/api/admin/pricing', { headers })
      const data = await res.json()
      if (data.success) {
        setPricing(data.data)
        setExpandedServices(new Set([...new Set(data.data.map(i => i.service_type))]))
      }
    } catch {}
    finally { setLoading(false) }
  }, [token]) // eslint-disable-line react-hooks/exhaustive-deps

  const fetchServiceMeta = useCallback(async () => {
    try {
      const res  = await fetch('/api/admin/service-meta', { headers })
      const data = await res.json()
      if (data.success) setServiceMeta(data.data)
    } catch {}
  }, [token]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { fetchPricing(); fetchServiceMeta() }, [fetchPricing, fetchServiceMeta])

  const openEditMeta = (svc) => {
    const existing = serviceMeta[svc] || {}
    setEditMetaForm({
      description:  existing.description  || '',
      svg_icon:     existing.svg_icon     || '',
      accent_color: existing.accent_color || '#1F5FFF',
    })
    setShowEditMeta(svc)
  }

  const reorderService = async (svc, direction) => {
    const sorted = [...serviceTypes].sort((a, b) =>
      (serviceMeta[a]?.sort_order ?? 999) - (serviceMeta[b]?.sort_order ?? 999)
    )
    const idx = sorted.indexOf(svc)
    if (direction === 'up' && idx === 0) return
    if (direction === 'down' && idx === sorted.length - 1) return
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1
    const newOrder = [...sorted]
    ;[newOrder[idx], newOrder[swapIdx]] = [newOrder[swapIdx], newOrder[idx]]
    const newMeta = { ...serviceMeta }
    newOrder.forEach((s, i) => { newMeta[s] = { ...(newMeta[s] || {}), sort_order: i + 1 } })
    setServiceMeta(newMeta)
    await fetch('/api/admin/service-meta/reorder', {
      method: 'PATCH',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ order: newOrder }),
    }).catch(console.error)
  }

  const saveServiceMeta = async () => {
    if (!showEditMeta) return
    setSavingMeta(true)
    try {
      const res = await fetch(`/api/admin/service-meta/${encodeURIComponent(showEditMeta)}`, {
        method: 'PATCH',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify(editMetaForm),
      })
      const data = await res.json()
      if (data.success) {
        setServiceMeta(prev => ({ ...prev, [showEditMeta]: { ...editMetaForm } }))
        setShowEditMeta(null)
      }
    } catch {}
    finally { setSavingMeta(false) }
  }

  // Group: service_type → category → items[]
  const grouped = {}
  for (const item of pricing) {
    if (!grouped[item.service_type]) grouped[item.service_type] = {}
    const cat = item.category || ''
    if (!grouped[item.service_type][cat]) grouped[item.service_type][cat] = []
    grouped[item.service_type][cat].push(item)
  }
  // Include services from serviceMeta even if they have no pricing items yet
  const serviceTypes = [...new Set([...Object.keys(grouped), ...Object.keys(serviceMeta)])]

  // ── Inline edit (price) ──
  const startEdit = (item) => { setEditingId(item.id); setEditValue(String(item.price)) }

  const saveEdit = async (id) => {
    const price = parseFloat(editValue)
    if (isNaN(price) || price < 0) { setEditingId(null); return }
    setSaving(true)
    try {
      await fetch(`/api/admin/pricing/${id}`, {
        method: 'PATCH',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ price }),
      })
      setPricing(prev => prev.map(i => i.id === id ? { ...i, price } : i))
    } catch {}
    finally { setSaving(false); setEditingId(null) }
  }

  // ── Inline edit (name) ──
  const startEditName = (item) => { setEditingNameId(item.id); setEditNameValue(item.item_name) }

  const saveEditName = async (id) => {
    const name = editNameValue.trim()
    if (!name) { setEditingNameId(null); return }
    setSavingName(true)
    try {
      await fetch(`/api/admin/pricing/${id}`, {
        method: 'PATCH',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ item_name: name }),
      })
      setPricing(prev => prev.map(i => i.id === id ? { ...i, item_name: name } : i))
    } catch {}
    finally { setSavingName(false); setEditingNameId(null) }
  }

  // ── Delete ──
  const handleDelete = async (id) => {
    setPricing(prev => prev.filter(i => i.id !== id))
    await fetch(`/api/admin/pricing/${id}`, { method: 'DELETE', headers }).catch(console.error)
  }

  // ── Add ──
  const handleAdd = async (e) => {
    e.preventDefault()
    const price = parseFloat(addForm.price)
    if (!addForm.service_type || !addForm.item_name || isNaN(price) || price <= 0) return
    setAddSaving(true)
    try {
      const res  = await fetch('/api/admin/pricing', {
        method: 'POST',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_type: addForm.service_type,
          category:     addForm.category,
          item_name:    addForm.item_name,
          price,
          unit: addForm.unit,
        }),
      })
      const data = await res.json()
      if (data.success && data.item) {
        setPricing(prev => [...prev, data.item])
        setExpandedServices(prev => new Set([...prev, addForm.service_type]))
      }
      setAddForm(BLANK_FORM)
      setShowAdd(false)
    } catch {}
    finally { setAddSaving(false) }
  }

  // ── Inline add item within a category ──
  const openInlineAdd = (svc, cat) => {
    setInlineAdd({ svc, cat })
    setInlineForm({ item_name: '', price: '', unit: 'piece' })
  }

  const saveInlineAdd = async () => {
    const price = parseFloat(inlineForm.price)
    if (!inlineForm.item_name.trim() || isNaN(price) || price <= 0) return
    setInlineSaving(true)
    try {
      const res  = await fetch('/api/admin/pricing', {
        method: 'POST',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_type: inlineAdd.svc,
          category:     inlineAdd.cat,
          item_name:    inlineForm.item_name.trim(),
          price,
          unit: inlineForm.unit,
        }),
      })
      const data = await res.json()
      if (data.success && data.item) {
        setPricing(prev => [...prev, data.item])
        setExpandedServices(prev => new Set([...prev, inlineAdd.svc]))
      }
      setInlineAdd(null)
    } catch {}
    finally { setInlineSaving(false) }
  }

  // ── SVG file upload (for service icon) ──
  const handleSvgFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const text = ev.target.result?.trim() || ''
      setEditMetaForm(f => ({ ...f, svg_icon: text }))
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  // ── Upload ──
  const handleUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploadStatus('uploading')
    const form = new FormData()
    form.append('file', file)
    try {
      const res  = await fetch('/api/admin/pricing/upload', { method: 'POST', headers, body: form })
      const data = await res.json()
      if (data.success) {
        setUploadStatus('success')
        await fetchPricing()
        setTimeout(() => setUploadStatus(null), 3000)
      } else {
        setUploadStatus('error')
        setTimeout(() => setUploadStatus(null), 4000)
      }
    } catch {
      setUploadStatus('error')
      setTimeout(() => setUploadStatus(null), 4000)
    }
    e.target.value = ''
  }

  // ── Export CSV ──
  const exportCSV = () => {
    const rows = [['Service Type', 'Category', 'Item Name', 'Price (INR)', 'Unit']]
    for (const item of pricing) {
      rows.push([item.service_type, item.category || '', item.item_name, item.price, item.unit])
    }
    const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob)
    a.download = 'HB-Pricing.csv'; a.click()
  }

  // ── Export Excel ──
  const exportExcel = async () => {
    const res = await fetch('/api/admin/pricing/export', { headers })
    const blob = await res.blob()
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob)
    a.download = 'HB-Pricing.xlsx'; a.click()
  }

  const toggleService = (svc) => {
    setExpandedServices(prev => {
      const next = new Set(prev)
      next.has(svc) ? next.delete(svc) : next.add(svc)
      return next
    })
  }

  if (loading) return <div className="dd-loading"><div className="dd-spinner-lg" /><p>Loading pricing…</p></div>

  return (
    <div className="dd-pricing-wrap">

      {/* ── Edit Service Details Modal ── */}
      {showEditMeta && (
        <div className="dd-modal-overlay" onClick={() => setShowEditMeta(null)}>
          <div className="dd-modal dd-meta-modal" onClick={e => e.stopPropagation()}>
            <div className="dd-modal-hdr">
              <h3>Edit Service: <span style={{ color: '#1F5FFF' }}>{showEditMeta}</span></h3>
              <button className="dd-modal-close" onClick={() => setShowEditMeta(null)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="dd-modal-form">
              <div className="dd-modal-field">
                <label>Description</label>
                <textarea
                  rows="3"
                  className="dd-meta-textarea"
                  value={editMetaForm.description}
                  onChange={e => setEditMetaForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="Short service description shown on the pricing page…"
                />
              </div>
              <div className="dd-modal-field">
                <label>Accent Color</label>
                <div className="dd-meta-color-row">
                  <input
                    type="color"
                    className="dd-meta-color-swatch"
                    value={editMetaForm.accent_color}
                    onChange={e => setEditMetaForm(f => ({ ...f, accent_color: e.target.value }))}
                  />
                  <input
                    type="text"
                    className="dd-meta-color-hex"
                    value={editMetaForm.accent_color}
                    onChange={e => setEditMetaForm(f => ({ ...f, accent_color: e.target.value }))}
                    placeholder="#1F5FFF"
                    maxLength={7}
                  />
                </div>
              </div>
              <div className="dd-modal-field">
                <label>SVG Icon</label>
                <div className="dd-meta-icon-upload-row">
                  {/* Preview */}
                  <div className="dd-meta-icon-preview-box">
                    {editMetaForm.svg_icon.trim() ? (
                      <div
                        className="dd-meta-icon-render"
                        style={{ color: editMetaForm.accent_color }}
                        dangerouslySetInnerHTML={{ __html: editMetaForm.svg_icon }}
                      />
                    ) : (
                      <div className="dd-meta-icon-empty">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                          <rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 9h18M9 21V9"/>
                        </svg>
                        <span>No icon</span>
                      </div>
                    )}
                  </div>

                  {/* Controls */}
                  <div className="dd-meta-icon-controls">
                    <button
                      type="button"
                      className="dd-meta-upload-svg-btn"
                      onClick={() => svgFileInputRef.current?.click()}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/>
                        <path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/>
                      </svg>
                      {editMetaForm.svg_icon.trim() ? 'Replace SVG' : 'Upload SVG'}
                    </button>
                    {editMetaForm.svg_icon.trim() && (
                      <button
                        type="button"
                        className="dd-meta-remove-svg-btn"
                        onClick={() => setEditMetaForm(f => ({ ...f, svg_icon: '' }))}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                        Remove
                      </button>
                    )}
                    <span className="dd-meta-svg-hint">Upload a .svg file — it will show on the pricing page</span>
                  </div>
                </div>
                <input
                  ref={svgFileInputRef}
                  type="file"
                  accept=".svg,image/svg+xml"
                  style={{ display: 'none' }}
                  onChange={handleSvgFile}
                />
              </div>
              <div className="dd-modal-actions">
                <button type="button" className="dd-modal-cancel" onClick={() => setShowEditMeta(null)}>Cancel</button>
                <button type="button" className="dd-modal-submit" onClick={saveServiceMeta} disabled={savingMeta}>
                  {savingMeta ? 'Saving…' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Add Item Modal ── */}
      {showAdd && (
        <div className="dd-modal-overlay" onClick={() => setShowAdd(false)}>
          <div className="dd-modal" onClick={e => e.stopPropagation()}>
            <div className="dd-modal-hdr">
              <h3>Add Pricing Item</h3>
              <button className="dd-modal-close" onClick={() => setShowAdd(false)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <form className="dd-modal-form" onSubmit={handleAdd}>
              <div className="dd-modal-field">
                <label>Service Type <span>*</span></label>
                <input
                  list="dd-svc-list"
                  value={addForm.service_type}
                  onChange={e => setAddForm(f => ({ ...f, service_type: e.target.value }))}
                  placeholder="Select existing or type a new service…"
                  required
                  autoComplete="off"
                />
                <datalist id="dd-svc-list">
                  {serviceTypes.map(s => <option key={s} value={s} />)}
                </datalist>
                <span className="dd-modal-hint">Pick from the list or type a new service name to create it</span>
              </div>
              <div className="dd-modal-field">
                <label>Category <span className="dd-opt">(optional)</span></label>
                <input
                  value={addForm.category}
                  onChange={e => setAddForm(f => ({ ...f, category: e.target.value }))}
                  placeholder="e.g. Men's Wear"
                />
              </div>
              <div className="dd-modal-field">
                <label>Item Name <span>*</span></label>
                <input
                  value={addForm.item_name}
                  onChange={e => setAddForm(f => ({ ...f, item_name: e.target.value }))}
                  placeholder="e.g. Leather Jacket"
                  required
                />
              </div>
              <div className="dd-modal-row2">
                <div className="dd-modal-field">
                  <label>Price (INR) <span>*</span></label>
                  <input
                    type="number"
                    min="0"
                    value={addForm.price}
                    onChange={e => setAddForm(f => ({ ...f, price: e.target.value }))}
                    placeholder="0"
                    required
                  />
                </div>
                <div className="dd-modal-field">
                  <label>Unit</label>
                  <select value={addForm.unit} onChange={e => setAddForm(f => ({ ...f, unit: e.target.value }))}>
                    {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
                  </select>
                </div>
              </div>
              <div className="dd-modal-actions">
                <button type="button" className="dd-modal-cancel" onClick={() => setShowAdd(false)}>Cancel</button>
                <button type="submit" className="dd-modal-submit" disabled={addSaving}>
                  {addSaving ? 'Adding…' : 'Add Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Actions bar ── */}
      <div className="dd-pricing-bar">
        <span className="dd-pricing-meta">
          {pricing.length} items · {serviceTypes.length} services
        </span>
        <div className="dd-pricing-bar-right">
          {uploadStatus === 'uploading' && <span className="dd-upload-status uploading">Uploading…</span>}
          {uploadStatus === 'success'   && <span className="dd-upload-status success">✓ Rates updated</span>}
          {uploadStatus === 'error'     && <span className="dd-upload-status error">Upload failed</span>}
          <button className="dd-export-btn" onClick={exportCSV} title="Export CSV">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            CSV
          </button>
          <button className="dd-export-btn" onClick={exportExcel} title="Export Excel">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Excel
          </button>
          <button className="dd-upload-btn" onClick={() => fileInputRef.current?.click()} disabled={uploadStatus === 'uploading'}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/>
              <path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/>
            </svg>
            Upload Excel
          </button>
          <button className="dd-add-item-btn" onClick={() => setShowAdd(true)}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add Item
          </button>
          <input ref={fileInputRef} type="file" accept=".xlsx,.xls" style={{ display: 'none' }} onChange={handleUpload} />
        </div>
      </div>

      {/* ── Service accordion groups ── */}
      {[...serviceTypes]
        .sort((a, b) => (serviceMeta[a]?.sort_order ?? 999) - (serviceMeta[b]?.sort_order ?? 999))
        .map((svc, idx, arr) => {
        const categories = grouped[svc] || {}
        const totalItems = Object.values(categories).flat().length
        const isOpen = expandedServices.has(svc)
        return (
          <div key={svc} className="dd-pricing-service">
            <div className={`dd-pricing-svc-hdr ${isOpen ? 'open' : ''}`}>
              <button className="dd-svc-hdr-toggle" onClick={() => toggleService(svc)}>
                {serviceMeta[svc]?.svg_icon ? (
                  <span
                    className="dd-pricing-svc-icon dd-pricing-svc-icon-svg"
                    style={{ color: serviceMeta[svc]?.accent_color || '#1F5FFF' }}
                    dangerouslySetInnerHTML={{ __html: serviceMeta[svc].svg_icon }}
                  />
                ) : (
                  <span className="dd-pricing-svc-icon">{svc.slice(0, 2).toUpperCase()}</span>
                )}
                <span className="dd-pricing-svc-name">{svc}</span>
                {serviceMeta[svc]?.description && (
                  <span className="dd-pricing-svc-desc">{serviceMeta[svc].description}</span>
                )}
                <span className="dd-pricing-svc-cnt">{totalItems} items</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                  style={{ transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}>
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>
              <button className="dd-svc-edit-btn" onClick={() => openEditMeta(svc)} title="Edit service details">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
                Edit Details
              </button>
              <div className="dd-svc-order-btns">
                <button
                  className="dd-svc-order-btn"
                  onClick={() => reorderService(svc, 'up')}
                  disabled={idx === 0}
                  title="Move up"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 15l-6-6-6 6"/></svg>
                </button>
                <button
                  className="dd-svc-order-btn"
                  onClick={() => reorderService(svc, 'down')}
                  disabled={idx === arr.length - 1}
                  title="Move down"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M6 9l6 6 6-6"/></svg>
                </button>
              </div>
            </div>

            {isOpen && (
              <div className="dd-pricing-svc-body">
                {totalItems === 0 && (
                  <div className="dd-pricing-empty">
                    No pricing items yet. Use <strong>Add Item</strong> above to add the first one.
                  </div>
                )}
                {Object.keys(categories).map((cat, catIdx) => {
                  const items = categories[cat]
                  const isAddingHere = inlineAdd?.svc === svc && inlineAdd?.cat === cat
                  return (
                  <div
                    key={cat || '_'}
                    className="dd-pricing-cat-block"
                  >
                    <div className="dd-pricing-cat-label">
                      {cat && <span>{cat}</span>}
                      {!isAddingHere && (
                        <button className="dd-cat-add-btn" onClick={() => openInlineAdd(svc, cat)}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                          </svg>
                          Add item
                        </button>
                      )}
                    </div>
                    <table className="dd-pricing-table">
                      <tbody>
                        {items.map((item, itemIdx) => (
                          <tr
                            key={item.id}
                            className="dd-pricing-row"
                          >
                            <td className="dd-pricing-item-name">
                              {editingNameId === item.id ? (
                                <div className="dd-name-edit">
                                  <input
                                    className="dd-name-input"
                                    type="text"
                                    value={editNameValue}
                                    onChange={e => setEditNameValue(e.target.value)}
                                    onKeyDown={e => { if (e.key === 'Enter') saveEditName(item.id); if (e.key === 'Escape') setEditingNameId(null) }}
                                    autoFocus
                                    disabled={savingName}
                                  />
                                  <button className="dd-price-save" onClick={() => saveEditName(item.id)} disabled={savingName}>
                                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                  </button>
                                  <button className="dd-price-cancel" onClick={() => setEditingNameId(null)}>
                                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                  </button>
                                </div>
                              ) : (
                                <button className="dd-name-display" onClick={() => startEditName(item)}>
                                  {item.item_name}
                                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="dd-price-edit-icon">
                                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                                  </svg>
                                </button>
                              )}
                            </td>
                            <td className="dd-pricing-unit">/ {item.unit}</td>
                            <td className="dd-pricing-price-cell">
                                {editingId === item.id ? (
                                    <div className="dd-price-edit">
                                      <span className="dd-price-edit-prefix">INR</span>
                                      <input
                                        className="dd-price-input"
                                        type="number"
                                        value={editValue}
                                        onChange={e => setEditValue(e.target.value)}
                                        onKeyDown={e => { if (e.key === 'Enter') saveEdit(item.id); if (e.key === 'Escape') setEditingId(null) }}
                                        autoFocus
                                        disabled={saving}
                                      />
                                      <button className="dd-price-save" onClick={() => saveEdit(item.id)} disabled={saving}>
                                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                      </button>
                                      <button className="dd-price-cancel" onClick={() => setEditingId(null)}>
                                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                      </button>
                                    </div>
                                  ) : (
                                    <button className="dd-price-display" onClick={() => startEdit(item)}>
                                      INR {Math.round(item.price)}
                                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="dd-price-edit-icon">
                                        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                                        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                                      </svg>
                                    </button>
                                  )}
                              </td>
                              <td className="dd-pricing-del-cell">
                                <button className="dd-pricing-del-btn" onClick={() => handleDelete(item.id)} title="Remove item">
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
                                    <path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
                                  </svg>
                                </button>
                              </td>
                          </tr>
                        ))}

                        {/* ── Inline add row ── */}
                        {isAddingHere && (
                          <tr className="dd-inline-add-row">
                            <td>
                              <input
                                className="dd-inline-name"
                                type="text"
                                placeholder="Item name…"
                                value={inlineForm.item_name}
                                onChange={e => setInlineForm(f => ({ ...f, item_name: e.target.value }))}
                                onKeyDown={e => { if (e.key === 'Enter') saveInlineAdd(); if (e.key === 'Escape') setInlineAdd(null) }}
                                autoFocus
                                disabled={inlineSaving}
                              />
                            </td>
                            <td>
                              <select
                                className="dd-inline-unit"
                                value={inlineForm.unit}
                                onChange={e => setInlineForm(f => ({ ...f, unit: e.target.value }))}
                                disabled={inlineSaving}
                              >
                                {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
                              </select>
                            </td>
                            <td className="dd-pricing-price-cell">
                              <div className="dd-price-edit">
                                <span className="dd-price-edit-prefix">INR</span>
                                <input
                                  className="dd-price-input"
                                  type="number"
                                  min="0"
                                  placeholder="0"
                                  value={inlineForm.price}
                                  onChange={e => setInlineForm(f => ({ ...f, price: e.target.value }))}
                                  onKeyDown={e => { if (e.key === 'Enter') saveInlineAdd(); if (e.key === 'Escape') setInlineAdd(null) }}
                                  disabled={inlineSaving}
                                />
                                <button className="dd-price-save" onClick={saveInlineAdd} disabled={inlineSaving}>
                                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                </button>
                                <button className="dd-price-cancel" onClick={() => setInlineAdd(null)}>
                                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                </button>
                              </div>
                            </td>
                            <td />
                          </tr>
                        )}
                      </tbody>
                    </table>

                  </div>
                )})}

              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// ── Login Screen ──────────────────────────────────────────────────────────────
function LoginScreen({ onLogin, onForgot }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Invalid credentials')
      sessionStorage.setItem(TOKEN_KEY, data.token)
      onLogin(data.token)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="dd-login-root">
      <div className="dd-login-card">
        <div className="dd-login-brand">
          <span className="dd-login-brand-dot" />
          <span>Hangers &amp; Basket</span>
        </div>
        <h1 className="dd-login-title">Admin Access</h1>
        <p className="dd-login-sub">Restricted area. Authorised personnel only.</p>

        <form className="dd-login-form" onSubmit={handleSubmit} noValidate>
          <div className="dd-login-field">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>
          <div className="dd-login-field">
            <label>Password</label>
            <div className="dd-login-pass-wrap">
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
              <button type="button" className="dd-pass-toggle" onClick={() => setShowPass(s => !s)}>
                {showPass
                  ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                }
              </button>
            </div>
          </div>

          {error && <div className="dd-login-error">{error}</div>}

          <button className="dd-login-btn" type="submit" disabled={loading}>
            {loading ? <span className="dd-spinner" /> : 'Sign In'}
          </button>

          <button type="button" className="dd-login-link" onClick={onForgot}>
            Forgot password?
          </button>
        </form>

        <p className="dd-login-footer">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
          Secured with JWT authentication
        </p>
      </div>
    </div>
  )
}

// ── Forgot Password Screen ──────────────────────────────────────────────────
function ForgotPasswordScreen({ onBack }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/admin/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Something went wrong')
      setSent(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="dd-login-root">
      <div className="dd-login-card">
        <div className="dd-login-brand">
          <span className="dd-login-brand-dot" />
          <span>Hangers &amp; Basket</span>
        </div>
        <h1 className="dd-login-title">Forgot Password</h1>
        <p className="dd-login-sub">Enter your admin email and we'll send you a reset link.</p>

        {sent ? (
          <>
            <div className="dd-login-success">
              If that email exists, a reset link has been sent. Check your inbox — it expires in 1 hour.
            </div>
            <button type="button" className="dd-login-link" style={{ marginTop: 18 }} onClick={onBack}>
              ← Back to login
            </button>
          </>
        ) : (
          <form className="dd-login-form" onSubmit={handleSubmit} noValidate>
            <div className="dd-login-field">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
                autoFocus
                required
              />
            </div>

            {error && <div className="dd-login-error">{error}</div>}

            <button className="dd-login-btn" type="submit" disabled={loading}>
              {loading ? <span className="dd-spinner" /> : 'Send Reset Link'}
            </button>

            <button type="button" className="dd-login-link" onClick={onBack}>
              ← Back to login
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

// ── Reset Password Screen ───────────────────────────────────────────────────
function ResetPasswordScreen({ token, onDone }) {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }
    if (password !== confirm) {
      setError('Passwords do not match')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/admin/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Something went wrong')
      setSuccess(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="dd-login-root">
      <div className="dd-login-card">
        <div className="dd-login-brand">
          <span className="dd-login-brand-dot" />
          <span>Hangers &amp; Basket</span>
        </div>
        <h1 className="dd-login-title">Set New Password</h1>
        <p className="dd-login-sub">Choose a new password for your admin account.</p>

        {success ? (
          <>
            <div className="dd-login-success">Password updated successfully. You can now sign in.</div>
            <button type="button" className="dd-login-btn" style={{ marginTop: 18 }} onClick={onDone}>
              Go to Login
            </button>
          </>
        ) : (
          <form className="dd-login-form" onSubmit={handleSubmit} noValidate>
            <div className="dd-login-field">
              <label>New Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="new-password"
                autoFocus
                required
              />
            </div>
            <div className="dd-login-field">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                autoComplete="new-password"
                required
              />
            </div>

            {error && <div className="dd-login-error">{error}</div>}

            <button className="dd-login-btn" type="submit" disabled={loading}>
              {loading ? <span className="dd-spinner" /> : 'Reset Password'}
            </button>

            <button type="button" className="dd-login-link" onClick={onDone}>
              ← Back to login
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
function Dashboard({ token, onLogout }) {
  const [activeTab,        setActiveTab]        = useState('franchise')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [stats,            setStats]            = useState(null)
  const [franchise,  setFranchise]  = useState([])
  const [jobs,       setJobs]       = useState([])
  const [loading,    setLoading]    = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error,      setError]      = useState('')
  const [selectedId, setSelectedId] = useState(null)
  const [checkedIds, setCheckedIds] = useState(new Set())
  const [search,     setSearch]     = useState('')
  const [filters,    setFilters]    = useState({ status: 'all', position: '', state: '', investment: '' })
  const [countdown,  setCountdown]  = useState(REFRESH_INTERVAL)

  // Track IDs marked as read locally so fetchAll doesn't reset them on refresh
  const localReadsRef = useRef({ franchise: new Set(), jobs: new Set() })

  const headers = { Authorization: `Bearer ${token}` }

  const fetchAll = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true)
    else setLoading(true)
    setError('')
    try {
      const [sRes, fRes, jRes] = await Promise.all([
        fetch('/api/admin/stats',     { headers }),
        fetch('/api/admin/franchise', { headers }),
        fetch('/api/admin/jobs',      { headers }),
      ])
      if ([sRes, fRes, jRes].some(r => r.status === 401)) { onLogout(); return }
      const [s, f, j] = await Promise.all([sRes.json(), fRes.json(), jRes.json()])
      setStats(s.stats)
      // Merge server data with locally-tracked reads so refresh doesn't reset unread state
      const mergeRead = (items, type) =>
        (items || []).map(item => ({
          ...item,
          is_read: (item.is_read || localReadsRef.current[type].has(item.id)) ? 1 : 0,
        }))
      setFranchise(mergeRead(f.data, 'franchise'))
      setJobs(mergeRead(j.data, 'jobs'))
    } catch {
      setError('Failed to load data. Check connection.')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [token]) // eslint-disable-line react-hooks/exhaustive-deps

  // Initial load
  useEffect(() => { fetchAll() }, [fetchAll])

  // Auto-refresh countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) {
          fetchAll(true)
          return REFRESH_INTERVAL
        }
        return c - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [fetchAll])

  // Reset state on tab change
  useEffect(() => {
    setSelectedId(null)
    setCheckedIds(new Set())
    setSearch('')
    setFilters({ status: 'all', position: '', state: '', investment: '' })
  }, [activeTab])

  const activeData   = activeTab === 'franchise' ? franchise : jobs
  const filteredData = applyFilters(activeData, activeTab, filters, search)
  const selectedItem = activeData.find(i => i.id === selectedId) || null

  // Mark single as read (optimistic)
  const markRead = useCallback(async (id) => {
    const type = activeTab === 'franchise' ? 'franchise' : 'jobs'
    const endpoint = `/api/admin/${type}/${id}/read`

    // Track locally so refreshes don't reset the read state
    localReadsRef.current[type].add(id)

    if (activeTab === 'franchise') {
      setFranchise(prev => prev.map(i => i.id === id ? { ...i, is_read: 1 } : i))
    } else {
      setJobs(prev => prev.map(i => i.id === id ? { ...i, is_read: 1 } : i))
    }
    setStats(prev => prev ? {
      ...prev,
      unreadFranchise: activeTab === 'franchise' ? Math.max(0, (prev.unreadFranchise || 0) - 1) : prev.unreadFranchise,
      unreadJobs:      activeTab === 'jobs'      ? Math.max(0, (prev.unreadJobs || 0) - 1)      : prev.unreadJobs,
    } : prev)

    await fetch(endpoint, { method: 'PATCH', headers }).catch(console.error)
  }, [activeTab, token]) // eslint-disable-line react-hooks/exhaustive-deps

  // Handle item click → open + mark read
  const handleSelect = (id) => {
    if (selectedId === id) { setSelectedId(null); return }
    setSelectedId(id)
    const item = activeData.find(i => i.id === id)
    if (item && !item.is_read) markRead(id)
  }

  // Toggle checkbox
  const handleCheck = (id) => {
    setCheckedIds(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  // Bulk mark as read
  const handleBulkRead = async () => {
    const ids = [...checkedIds]
    const unreadIds = ids.filter(id => {
      const item = activeData.find(i => i.id === id)
      return item && !item.is_read
    })
    const endpoint = activeTab === 'franchise'
      ? '/api/admin/franchise/bulk-read'
      : '/api/admin/jobs/bulk-read'

    if (activeTab === 'franchise') {
      setFranchise(prev => prev.map(i => ids.includes(i.id) ? { ...i, is_read: 1 } : i))
    } else {
      setJobs(prev => prev.map(i => ids.includes(i.id) ? { ...i, is_read: 1 } : i))
    }
    setStats(prev => prev ? {
      ...prev,
      unreadFranchise: activeTab === 'franchise' ? Math.max(0, (prev.unreadFranchise || 0) - unreadIds.length) : prev.unreadFranchise,
      unreadJobs:      activeTab === 'jobs'      ? Math.max(0, (prev.unreadJobs || 0) - unreadIds.length)      : prev.unreadJobs,
    } : prev)
    setCheckedIds(new Set())

    await fetch(endpoint, {
      method: 'PATCH',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids }),
    }).catch(console.error)
  }

  const handleDelete = useCallback(async (id) => {
    const type = activeTab === 'franchise' ? 'franchise' : 'jobs'
    const endpoint = `/api/admin/${type}/${id}`

    // Remove from local read tracking
    localReadsRef.current[type].delete(id)

    // Optimistic remove from list
    if (activeTab === 'franchise') {
      setFranchise(prev => prev.filter(i => i.id !== id))
    } else {
      setJobs(prev => prev.filter(i => i.id !== id))
    }
    // Close detail panel if this item was open
    setSelectedId(prev => prev === id ? null : prev)

    await fetch(endpoint, { method: 'DELETE', headers }).catch(console.error)
  }, [activeTab, token]) // eslint-disable-line react-hooks/exhaustive-deps

  const manualRefresh = () => {
    fetchAll(true)
    setCountdown(REFRESH_INTERVAL)
  }

  return (
    <div className="dd-root">
      {/* ── Sidebar unit (sidebar + floating toggle) ── */}
      <div className="dd-sidebar-unit">
        <aside className={`dd-sidebar ${sidebarCollapsed ? 'dd-sidebar--collapsed' : ''}`}>
          <div className="dd-sidebar-brand">
            <img src={logo} alt="H&B" className="dd-logo-img" />
            <div className="dd-sidebar-brand-text">
              <div className="dd-sidebar-name">Hangers &amp; Basket</div>
              <div className="dd-sidebar-role">Admin Console</div>
            </div>
          </div>

        <nav className="dd-sidebar-nav">
          <button
            className={`dd-nav-item ${activeTab === 'franchise' ? 'dd-nav-active' : ''}`}
            onClick={() => setActiveTab('franchise')}
            data-tooltip="Franchise Enquiries"
          >
            <span className="dd-nav-icon dd-nav-icon--franchise" aria-hidden="true" />
            <span className="dd-nav-label">Franchise Enquiries</span>
            <span className="dd-nav-cnt">
              {stats?.unreadFranchise > 0
                ? <span className="dd-nav-unread">{stats.unreadFranchise}</span>
                : <span>{stats?.totalFranchise ?? '—'}</span>
              }
            </span>
          </button>
          <button
            className={`dd-nav-item ${activeTab === 'jobs' ? 'dd-nav-active' : ''}`}
            onClick={() => setActiveTab('jobs')}
            data-tooltip="Job Applications"
          >
            <span className="dd-nav-icon dd-nav-icon--jobs" aria-hidden="true" />
            <span className="dd-nav-label">Job Applications</span>
            <span className="dd-nav-cnt">
              {stats?.unreadJobs > 0
                ? <span className="dd-nav-unread">{stats.unreadJobs}</span>
                : <span>{stats?.totalJobs ?? '—'}</span>
              }
            </span>
          </button>

          <div className="dd-nav-divider" />

          <button
            className={`dd-nav-item ${activeTab === 'pricing' ? 'dd-nav-active' : ''}`}
            onClick={() => setActiveTab('pricing')}
            data-tooltip="Pricing Manager"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
            </svg>
            <span className="dd-nav-label">Pricing Manager</span>
            <span className="dd-nav-cnt"><span className="dd-nav-tag">CMS</span></span>
          </button>
        </nav>

        <button className="dd-sidebar-logout" onClick={onLogout} data-tooltip="Sign Out">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          <span className="dd-nav-label">Sign Out</span>
        </button>
        </aside>

        {/* Floating toggle — always visible at sidebar right edge */}
        <button
          className={`dd-sidebar-float-toggle ${sidebarCollapsed ? 'dd-sidebar-float-toggle--collapsed' : ''}`}
          onClick={() => setSidebarCollapsed(c => !c)}
          title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
      </div>

      {/* ── Main ── */}
      <main className="dd-main">
        <div className="dd-topbar">
          <div className="dd-topbar-info">
            <h1 className="dd-topbar-title">
              {activeTab === 'franchise' ? 'Franchise Enquiries' : activeTab === 'jobs' ? 'Job Applications' : 'Pricing Manager'}
            </h1>
            <p className="dd-topbar-sub">
              {activeTab === 'pricing'
                ? 'Edit prices inline or upload a new Excel rate sheet'
                : 'Submissions inbox — Hangers & Basket'}
            </p>
          </div>
          {stats && activeTab !== 'pricing' && (
            <div className="dd-topbar-stats">
              <div className="dd-topbar-stat">
                <span className="dd-ts-num">
                  {activeTab === 'franchise' ? stats.totalFranchise : stats.totalJobs}
                </span>
                <span className="dd-ts-label">Total</span>
              </div>
              <div className="dd-topbar-stat-divider" />
              <div className="dd-topbar-stat">
                <span className="dd-ts-num">
                  {activeTab === 'franchise' ? (stats.todayFranchise ?? 0) : (stats.todayJobs ?? 0)}
                </span>
                <span className="dd-ts-label">Today</span>
              </div>
              <div className="dd-topbar-stat-divider" />
              <div className={`dd-topbar-stat ${(activeTab === 'franchise' ? stats.unreadFranchise : stats.unreadJobs) > 0 ? 'dd-ts-has-unread' : ''}`}>
                <span className="dd-ts-num">
                  {activeTab === 'franchise' ? stats.unreadFranchise : stats.unreadJobs}
                </span>
                <span className="dd-ts-label">Unread</span>
              </div>
            </div>
          )}
        </div>

        <div className="dd-content">
          {error && activeTab !== 'pricing' && <div className="dd-error-bar">{error}</div>}

          <div key={activeTab} className="dd-tab-pane">
          {activeTab === 'pricing' ? (
            <PricingTab token={token} />
          ) : loading ? (
            <div className="dd-loading">
              <div className="dd-spinner-lg" />
              <p>Loading submissions…</p>
            </div>
          ) : (
            <div className="dd-inbox-wrap">
              <Toolbar
                filteredData={filteredData}
                allData={activeData}
                checkedIds={checkedIds}
                setCheckedIds={setCheckedIds}
                onBulkRead={handleBulkRead}
                countdown={countdown}
                onRefresh={manualRefresh}
                refreshing={refreshing}
                activeTab={activeTab}
                filters={filters}
                setFilters={setFilters}
                search={search}
                setSearch={setSearch}
              />

              <div className={`dd-inbox-pane ${selectedId ? 'split' : ''}`}>
                {/* List */}
                <div className="dd-inbox-list">
                  {filteredData.length === 0 ? (
                    <div className="dd-inbox-empty">
                      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 12h-6l-2 3h-4l-2-3H2"/>
                        <path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z"/>
                      </svg>
                      <p>No submissions found</p>
                      {(filters.status !== 'all' || search || filters.position || filters.state || filters.investment) && (
                        <button className="dd-clear-filters" onClick={() => { setSearch(''); setFilters({ status: 'all', position: '', state: '', investment: '' }) }}>
                          Clear filters
                        </button>
                      )}
                    </div>
                  ) : (
                    filteredData.map(item => (
                      <InboxItem
                        key={item.id}
                        item={item}
                        type={activeTab}
                        isSelected={selectedId === item.id}
                        isChecked={checkedIds.has(item.id)}
                        onSelect={handleSelect}
                        onCheck={handleCheck}
                      />
                    ))
                  )}
                </div>

                {/* Detail */}
                <div className={`dd-detail-pane ${selectedId ? 'visible' : ''}`}>
                  <DetailPanel
                    item={selectedItem}
                    type={activeTab}
                    onClose={() => setSelectedId(null)}
                    onMarkRead={markRead}
                    onDelete={handleDelete}
                  />
                </div>
              </div>
            </div>
          )}
          </div>
        </div>
      </main>
    </div>
  )
}

// ── Root ──────────────────────────────────────────────────────────────────────
export default function DataDash() {
  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_KEY) || '')
  const [resetToken, setResetToken] = useState(() => new URLSearchParams(window.location.search).get('reset') || '')
  const [showForgot, setShowForgot] = useState(false)

  const handleLogin  = (t) => setToken(t)
  const handleLogout = ()  => { sessionStorage.removeItem(TOKEN_KEY); setToken('') }
  const clearReset = () => {
    window.history.replaceState({}, '', '/data-dash')
    setResetToken('')
    setShowForgot(false)
  }

  if (!token) {
    if (resetToken) return <ResetPasswordScreen token={resetToken} onDone={clearReset} />
    if (showForgot) return <ForgotPasswordScreen onBack={() => setShowForgot(false)} />
    return <LoginScreen onLogin={handleLogin} onForgot={() => setShowForgot(true)} />
  }
  return <Dashboard token={token} onLogout={handleLogout} />
}
