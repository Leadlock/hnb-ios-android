import { useState, useRef, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './PricingPage.css'
import logoImg from '../assets/logo.png'
import logoAnimation from '../assets/logo_animation.mp4'
import { triggerHaptic } from '../utils/native'
import {
  commercialLaundryCategories,
} from '../data/data'

import commercialLaundryIcon from '../assets/icons/commercial_laundry.svg'
import dryCleaningIcon from '../assets/icons/dry_cleaning.svg'
import washIronIcon from '../assets/icons/wash_iron.svg'
import washFoldIcon from '../assets/icons/wash_fold.svg'
import steamPressingIcon from '../assets/icons/steam_pressing.svg'
import carpetIcon from '../assets/icons/carpet_cleaning.svg'
import shoeIcon from '../assets/icons/shoe_care.svg'
import bagIcon from '../assets/icons/bag_care.svg'
import curtainIcon from '../assets/icons/curtain_cleaning.svg'
import mattressIcon from '../assets/icons/mattress_cleaning.svg'
import toyIcon from '../assets/icons/toy_cleaning.svg'

// serviceKey maps each accordion entry to the DB service_type value
const accordionServices = [
  { icon: dryCleaningIcon,  accent: '#1F5FFF', title: 'Dry Cleaning',              serviceKey: 'Dry Cleaning',                              sub: 'Professional solvent-based cleaning for delicate & formal wear',     price: 'from INR 50' },
  { icon: washIronIcon,     accent: '#16a34a', title: 'Wash & Iron',               serviceKey: 'Wash & Iron',                               sub: 'Machine washed and professionally pressed per item',                 price: 'INR 199 / kg' },
  { icon: washFoldIcon,     accent: '#ea580c', title: 'Wash & Fold',               serviceKey: 'Wash & Fold',                               sub: 'Washed, dried and folded — ideal for everyday laundry',              price: 'INR 149 / kg' },
  { icon: steamPressingIcon,accent: '#9333ea', title: 'Steam Press',               serviceKey: 'Steam Press',                               sub: 'Professional steam press only — crisp, crease-free results per item', price: 'from INR 30' },
  { icon: carpetIcon,       accent: '#2563eb', title: 'Carpet, Sofa & Chairs',    serviceKey: 'Carpet, Sofa & Chairs',                     sub: 'Deep extraction cleaning for rugs, upholstery, and seating',         price: 'from INR 45 / sqft' },
  { icon: shoeIcon,         accent: '#e11d48', title: 'Shoe Cleaning',            serviceKey: 'Shoe Cleaning',                             sub: 'Professional deep clean, whitening, and luxury restoration',         price: 'from INR 250 / pair' },
  { icon: bagIcon,          accent: '#d97706', title: 'Bag Cleaning',             serviceKey: 'Bag Cleaning',                              sub: 'Expert cleaning and conditioning for all bag types',                 price: 'from INR 350' },
  { icon: curtainIcon,      accent: '#f59e0b', title: 'Curtain, Bedding Linens & Towel & Baths', serviceKey: 'Curtain, Bedding Linens & Towel & Baths', sub: 'Curtains, bedding, and mattress sanitization', price: 'from INR 8 / sqft' },
  { icon: toyIcon,          accent: '#f59e0b', title: 'Toy & Baby Care', serviceKey: 'Toy & Baby Care', sub: "Soft toys, strollers, prams and baby car seats — safe non-toxic cleaning", price: 'from INR 200' },
  { icon: commercialLaundryIcon, accent: '#0f766e', title: 'Commercial Laundry', serviceKey: 'Commercial Laundry', sub: 'High-volume laundry for hotels, restaurants, spas, and businesses', price: 'Custom Pricing' },
]

// Convert API grouped data for one service into the SubCategoryAccordion format
function apiToCategories(serviceData) {
  if (!serviceData) return null
  return Object.entries(serviceData).map(([catLabel, items]) => ({
    label: catLabel || null,
    items: items.map(item => ({ label: item.label, price: item.priceDisplay })),
  }))
}

// ── Orbit data ──
const innerRing = [
  { label: 'Dry Cleaning',  dot: '#1F5FFF' },
  { label: 'Wash & Iron',   dot: '#16a34a' },
  { label: 'Wash & Fold',   dot: '#ea580c' },
  { label: 'Shoe Cleaning', dot: '#8b5cf6' },
  { label: 'Bag Cleaning',  dot: '#d97706' },
  { label: 'Steam Press',   dot: '#1F5FFF' },
]

const outerRing = [
  { label: 'Carpet Cleaning',   dot: '#1F5FFF' },
  { label: 'Curtain Cleaning',  dot: '#16a34a' },
  { label: 'Bedding Cleaning',  dot: '#1F5FFF' },
  { label: 'Toy & Baby Care',   dot: '#f59e0b' },
  { label: 'Commercial Laundry', dot: '#0f766e' },
]

function OrbitDiagram() {
  return (
    <div className="pp-orbit-wrap">
      <div className="pp-ring-circle pp-ring-inner-circle" />
      <div className="pp-ring-circle pp-ring-outer-circle" />

      {/* Inner ring — 6 items, start at top (−90°) */}
      <div className="pp-orbit-ring pp-ring-inner-spin">
        {innerRing.map((n, i) => {
          const angle = (i * 360 / innerRing.length - 90) * (Math.PI / 180)
          const x = Math.cos(angle) * 115
          const y = Math.sin(angle) * 115
          return (
            <div key={i} className="pp-orbit-node" style={{ left: x, top: y }}>
              <span className="pp-orbit-dot" style={{ background: n.dot }} />
              <span className="pp-orbit-label">{n.label}</span>
            </div>
          )
        })}
      </div>

      {/* Outer ring — 5 items, offset by half-step (−90° + 36° = −54°) so they sit between inner nodes */}
      <div className="pp-orbit-ring pp-ring-outer-spin">
        {outerRing.map((n, i) => {
          const angle = (i * 360 / outerRing.length - 54) * (Math.PI / 180)
          const x = Math.cos(angle) * 200
          const y = Math.sin(angle) * 200
          return (
            <div key={i} className="pp-orbit-node" style={{ left: x, top: y }}>
              <span className="pp-orbit-dot" style={{ background: n.dot }} />
              <span className="pp-orbit-label">{n.label}</span>
            </div>
          )
        })}
      </div>

      <div className="pp-orbit-center">
        <video
          src={logoAnimation}
          className="pp-orbit-logo"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
    </div>
  )
}


function SubCategoryAccordion({ cat }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="ppa-sub-item">
      <button className="ppa-sub-row" onClick={() => { triggerHaptic('selection'); setOpen(o => !o) }}>
        <span className="ppa-sub-label">{cat.label}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          style={{ transition: 'transform 0.25s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}>
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>
      {open && (
        <div className="ppa-sub-body">
          {cat.badge && <div className="ppa-sub-badge">{cat.badge}</div>}
          {cat.items.map((item, i) => (
            <div key={i} className="ppa-sub-price-row">
              <span className="ppa-sub-item-info">
                <span>{item.label}</span>
                {item.note && <span className="ppa-sub-item-note">{item.note}</span>}
              </span>
              <span className="ppa-sub-price">{item.price}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Generic accordion for services added via the CMS that have no hardcoded entry
function GenericAccordionItem({ title, categories, isOpen, onToggle, meta }) {
  const itemCount = categories.reduce((sum, cat) => sum + cat.items.length, 0)
  const fromPrice = Math.min(...categories.flatMap(c => c.items.map(i => parseFloat(i.price) || 0)).filter(p => p > 0))
  return (
    <div className={`ppa-item ${isOpen ? 'open' : ''}`}>
      <button className="ppa-row" onClick={onToggle}>
        <span className="ppa-icon ppa-icon-generic">
          {meta?.svg_icon ? (
            <span className="ppa-svg-inline" dangerouslySetInnerHTML={{ __html: meta.svg_icon }} />
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
            </svg>
          )}
        </span>
        <span className="ppa-info">
          <span className="ppa-title">{title}</span>
          <span className="ppa-sub">{meta?.description || `${itemCount} item${itemCount !== 1 ? 's' : ''} available`}</span>
        </span>
        {!isNaN(fromPrice) && isFinite(fromPrice) && (
          <span className="ppa-price">from INR {fromPrice}</span>
        )}
        <span className={`ppa-chevron ${isOpen ? 'open' : ''}`}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </span>
      </button>
      <div className="ppa-body" style={{ maxHeight: isOpen ? 'none' : '0' }}>
        <div className="ppa-body-inner">
          {categories.map((cat, i) =>
            cat.label
              ? <SubCategoryAccordion key={i} cat={cat} />
              : cat.items.map((item, j) => (
                  <div key={j} className="ppa-sub-price-row">
                    <span className="ppa-sub-item-info"><span>{item.label}</span></span>
                    <span className="ppa-sub-price">{item.price}</span>
                  </div>
                ))
          )}
        </div>
      </div>
    </div>
  )
}

function AccordionItem({ s, isOpen, onToggle, categories, meta }) {
  // Use DB description if available, otherwise the hardcoded sub
  const description = meta?.description || s.sub
  // Use DB SVG if explicitly set; fall back to hardcoded import ONLY when meta has no record yet
  // If meta exists but svg_icon is empty (admin cleared it), show no icon
  const hasMeta = meta !== null && meta !== undefined
  const svgIcon = meta?.svg_icon || null
  const showImg = !hasMeta && s.icon  // only use hardcoded import when service has no meta row at all
  return (
    <div className={`ppa-item ${isOpen ? 'open' : ''}`}>
      <button className="ppa-row" onClick={onToggle}>
        <span className="ppa-icon">
          {svgIcon ? (
            <span className="ppa-svg-inline" dangerouslySetInnerHTML={{ __html: svgIcon }} />
          ) : showImg ? (
            <img src={s.icon} alt={s.title} className="ppa-svg" />
          ) : null}
        </span>
        <span className="ppa-info">
          <span className="ppa-title">{s.serviceKey || s.title}</span>
          <span className="ppa-sub">{description}</span>
        </span>
        <span className="ppa-price">{s.price}</span>
        <span className={`ppa-chevron ${isOpen ? 'open' : ''}`}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </span>
      </button>
      <div className="ppa-body" style={{ maxHeight: isOpen ? 'none' : '0' }}>
        <div className="ppa-body-inner">
          {categories
              ? categories.map((cat, i) =>
                  cat.label
                    ? <SubCategoryAccordion key={i} cat={cat} />
                    : cat.items.map((item, j) => (
                        <div key={j} className="ppa-sub-price-row">
                          <span className="ppa-sub-item-info"><span>{item.label}</span></span>
                          <span className="ppa-sub-price">{item.price}</span>
                        </div>
                      ))
                )
              : <span style={{ color: 'var(--gray-400)', fontStyle: 'italic' }}>Pricing details coming soon.</span>
          }
        </div>
      </div>
    </div>
  )
}

function PricingFAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  const bodyRef = useRef(null)
  return (
    <div className={`pp-faq-item ${open ? 'open' : ''}`}>
      <button className="pp-faq-q" onClick={() => setOpen(o => !o)}>
        <span>{q}</span>
        <span className="pp-faq-x">{open ? '✕' : '+'}</span>
      </button>
      <div className="pp-faq-body" style={{ maxHeight: open ? bodyRef.current?.scrollHeight + 'px' : '0' }}>
        <div ref={bodyRef} className="pp-faq-a">{a}</div>
      </div>
    </div>
  )
}

const hiwSteps = [
  {
    n: 1,
    title: 'Book via WhatsApp or App',
    desc: 'Tell us what you need — we send back a confirmed price before we collect anything. Zero surprises, ever.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    badge: 'Step 1',
    color: '#6366f1',
  },
  {
    n: 2,
    title: 'Free Pickup from Your Door',
    desc: 'We come to you at a time that suits you. Pickup and delivery are always free — on every single order.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
    badge: 'Step 2',
    color: '#22d3ee',
  },
  {
    n: 3,
    title: 'Pay Only on Delivery',
    desc: 'Cash, card, or bank transfer — you pay when your fresh clothes are back at your door. Not a second before.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
      </svg>
    ),
    badge: 'Step 3',
    color: '#4ade80',
  },
]

function HowItWorks() {
  const sectionRef = useRef(null)
  const cardRefs = useRef([])

  useEffect(() => {
    const cards = cardRefs.current
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('hiw-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    cards.forEach((c) => c && observer.observe(c))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="pp-hiw" ref={sectionRef}>
      <div className="pp-hiw-glow pp-hiw-glow--left" />
      <div className="pp-hiw-glow pp-hiw-glow--right" />
      <div className="container pp-hiw-inner">
        <div className="pp-hiw-header">
          <div className="section-tag pp-hiw-tag">HOW IT WORKS</div>
          <h2 className="pp-hiw-title">Simple, Transparent &amp; Hassle-Free</h2>
          <p className="pp-hiw-sub">From booking to delivery — we handle everything so you don't have to.</p>
        </div>

        <div className="pp-hiw-cards">
          {hiwSteps.map((st, i) => (
            <div
              key={st.n}
              className="pp-hiw-card"
              ref={(el) => (cardRefs.current[i] = el)}
              style={{ '--hiw-color': st.color, '--hiw-delay': `${i * 140}ms` }}
            >
              <div className="pp-hiw-card-top">
                <div className="pp-hiw-icon-ring" style={{ '--hiw-color': st.color }}>
                  {st.icon}
                </div>
                <span className="pp-hiw-step-badge">{st.badge}</span>
              </div>
              <h4 className="pp-hiw-card-title">{st.title}</h4>
              <p className="pp-hiw-card-desc">{st.desc}</p>
              <div className="pp-hiw-card-bar" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function PricingPage() {
  const [open, setOpen] = useState(null)
  const [openExtra, setOpenExtra] = useState(null)
  const [allOpen, setAllOpen] = useState(false)
  const [apiPricing, setApiPricing] = useState({})
  const [apiMeta, setApiMeta] = useState({})

  useEffect(() => {
    fetch('/api/pricing')
      .then(r => r.json())
      .then(d => {
        if (d.success) {
          setApiPricing(d.data)
          if (d.meta) setApiMeta(d.meta)
        }
      })
      .catch(() => {})
  }, [])

  // Sort accordionServices by the order the API returns them (DB sort_order)
  const apiKeyOrder = Object.keys(apiPricing)
  const sortedAccordionServices = apiKeyOrder.length
    ? [...accordionServices].sort((a, b) => {
        const ai = a.serviceKey ? apiKeyOrder.indexOf(a.serviceKey) : 999
        const bi = b.serviceKey ? apiKeyOrder.indexOf(b.serviceKey) : 999
        return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi)
      })
    : accordionServices

  // Service types from API that have no matching accordion entry
  const knownServiceKeys = new Set(accordionServices.map(s => s.serviceKey).filter(Boolean))
  const unknownServices = apiKeyOrder.filter(svc => !knownServiceKeys.has(svc))

  // Resolve categories for each accordion entry
  function getCategories(s) {
    if (s.serviceKey && apiPricing[s.serviceKey]) {
      return apiToCategories(apiPricing[s.serviceKey])
    }
    if (s.title === 'Commercial Laundry') return commercialLaundryCategories
    return null
  }

  return (
    <>
      <Header />
      <main className="pp-main">

        {/* Hero */}
        <section className="pp-hero">
          <div className="pp-hero-left">
            <div className="section-tag pp-tag">● OUR PRICING</div>
            <h1 className="pp-title">All Your Care, <span className="gradient-text">One Place.</span></h1>
            <p className="pp-sub">Every service priced upfront. Free pickup &amp; delivery across India — no minimums, no surprises.</p>

            <div className="pp-pills">
              <span className="pp-pill"><span style={{ color: '#16a34a' }}>●</span> Free Pickup &amp; Delivery</span>
              <span className="pp-pill"><span style={{ color: '#1F5FFF' }}>●</span> Transparent Pricing</span>
              <span className="pp-pill"><span style={{ color: '#8b5cf6' }}>●</span> 11 Services</span>
              <span className="pp-pill"><span style={{ color: '#ea580c' }}>●</span> Same-Day Available</span>
            </div>

            <a href="https://wa.me/917045110077?text=Hi" target="_blank" rel="noreferrer" className="btn pp-wa-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.553 4.103 1.523 5.824L.057 23.882a.5.5 0 00.606.63l6.288-1.652A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.698-.504-5.248-1.385l-.376-.217-3.892 1.022 1.04-3.793-.232-.389A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              WhatsApp Us
            </a>
          </div>

          <div className="pp-hero-right">
            <OrbitDiagram />
          </div>
        </section>

        {/* Accordion */}
        <section className="pp-accordion-section">
          <div className="pp-accordion-header">
            <button
              className="pp-expand-toggle"
              onClick={() => { triggerHaptic('selection'); setAllOpen(o => !o); setOpen(null); setOpenExtra(null) }}
            >
              {allOpen ? 'Collapse All' : 'Expand All'}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                style={{ transition: 'transform 0.25s', transform: allOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>
          </div>
          <div className="pp-accordion-wrap">
            {sortedAccordionServices.map((s, i) => (
              <AccordionItem
                key={i} s={s}
                isOpen={allOpen || open === i}
                onToggle={() => { triggerHaptic('selection'); setAllOpen(false); setOpen(open === i ? null : i) }}
                categories={getCategories(s)}
                meta={s.serviceKey ? apiMeta[s.serviceKey] : null}
              />
            ))}
            {unknownServices.map(svc => (
              <GenericAccordionItem
                key={svc}
                title={svc}
                categories={apiToCategories(apiPricing[svc])}
                isOpen={allOpen || openExtra === svc}
                onToggle={() => { triggerHaptic('selection'); setAllOpen(false); setOpenExtra(openExtra === svc ? null : svc) }}
                meta={apiMeta[svc]}
              />
            ))}
          </div>
        </section>

        {/* How It Works */}
        <HowItWorks />

        {/* Pricing Questions */}
        <section className="pp-faq">
          <div className="pp-faq-wrap">
            <h2 className="pp-faq-title">Pricing Questions</h2>
            {[
              { q: 'Is there a minimum order?',                     a: 'No minimum order at all. You can send one item if you like — pickup and delivery are always free regardless of order size.' },
              { q: 'Are pickup and delivery included in the price?', a: 'Yes, free collection and delivery is included on every order, every time. No delivery charges, ever.' },
              { q: 'How do I get a price before booking?',           a: "Simply message us on WhatsApp with a list of your items. We'll reply with a full quote within 60 seconds — no hidden fees, no surprises." },
              { q: 'When do I pay?',                                 a: 'For standard orders, payment is collected at delivery. You can also pay via bank transfer or online payment before delivery if preferred. We accept cash, card via app, bank transfer, and online payment.' },
              { q: "What if my item type isn't listed here?",        a: "No problem — message us on WhatsApp and we'll give you a custom quote. We handle almost anything and will always be upfront about the price." },
            ].map((item, i) => (
              <PricingFAQItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
        </section>

        {/* Ready to Book */}
        <section className="pp-rtb">
          <h2 className="pp-rtb-title">Ready to Book?</h2>
          <p className="pp-rtb-sub">Message us on WhatsApp for an instant quote — we reply in under 60 seconds.<br />Free pickup included.</p>
          <div className="pp-rtb-btns">
            <a href="https://wa.me/917045110077?text=Hi" target="_blank" rel="noreferrer" className="pp-rtb-wa">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.553 4.103 1.523 5.824L.057 23.882a.5.5 0 00.606.63l6.288-1.652A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.698-.504-5.248-1.385l-.376-.217-3.892 1.022 1.04-3.793-.232-.389A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
              Get a Quote
            </a>
            <a href="mailto:info@hnb.co.in" className="pp-rtb-email">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              info@hnb.co.in
            </a>
          </div>
        </section>

      </main>
      <a
        href="https://wa.me/917045110077?text=Hi"
        target="_blank"
        rel="noreferrer"
        className="pp-float-wa"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.553 4.103 1.523 5.824L.057 23.882a.5.5 0 00.606.63l6.288-1.652A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.698-.504-5.248-1.385l-.376-.217-3.892 1.022 1.04-3.793-.232-.389A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
        </svg>
      </a>
      <Footer />
    </>
  )
}
