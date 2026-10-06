import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './JobsPage.css'

const positions = [
  {
    id: 'delivery-driver',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 5v4h-7V8z"/>
        <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
    color: '#22c55e',
    title: 'Delivery Driver',
    desc: 'Door-to-door pickup & delivery across the city. Valid driving licence required.',
    tags: ['Full Time', 'On-site', 'Urgent'],
    tagColors: ['green', 'blue', 'orange'],
  },
  {
    id: 'laundry-operator',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"/><path d="M12 6v6l4 2"/>
      </svg>
    ),
    color: '#3b82f6',
    title: 'Laundry Operator',
    desc: 'Operate professional washing, drying, and pressing machines with care and precision.',
    tags: ['Full Time', 'On-site'],
    tagColors: ['green', 'blue'],
  },
  {
    id: 'garment-care',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    color: '#f97316',
    title: 'Garment Care Specialist',
    desc: 'Handle delicate garments, luxury fabrics and specialist cleaning programs.',
    tags: ['Full Time', 'On-site'],
    tagColors: ['green', 'blue'],
  },
  {
    id: 'customer-support',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    color: '#eab308',
    title: 'Customer Support',
    desc: 'Handle phone & chat enquiries, bookings, and customer follow-ups. Great communication skills required.',
    tags: ['Urgent', 'Remote / Office'],
    tagColors: ['orange', 'purple'],
  },
  {
    id: 'ironing-pressing',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3h2l.4 2M7 13h10l4-8H5.4"/><circle cx="9" cy="19" r="1"/><circle cx="20" cy="19" r="1"/>
        <path d="M3 13l1.5 5h14"/>
      </svg>
    ),
    color: '#8b5cf6',
    title: 'Ironing & Pressing Staff',
    desc: 'Steam press and finish garments to a professional standard. Training provided.',
    tags: ['Full Time', 'On-site'],
    tagColors: ['green', 'blue'],
  },
  {
    id: 'general-staff',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    color: '#06b6d4',
    title: 'General Staff / Open Application',
    desc: "Don't see your role? Apply anyway — we're always looking for motivated people to join our team.",
    tags: ['Open', 'Various'],
    tagColors: ['green', 'gray'],
  },
]

const benefits = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    title: 'Stable Income & On-Time Pay',
    desc: 'Competitive salary, always paid on time — every month, no delays.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Job Security & Stability',
    desc: 'We invest in long-term employees and promote from within.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: 'Flexible Scheduling',
    desc: 'We work with your availability to build a schedule that suits your lifestyle.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
    title: 'Training & Growth',
    desc: 'Full on-the-job training provided. We grow our people from within.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Supportive Team Culture',
    desc: 'A respectful, professional team where every person is valued and heard.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: 'Performance Incentives',
    desc: 'Bonuses and rewards for top performers — your hard work gets recognised.',
  },
]

const tagColorMap = {
  green: { bg: '#dcfce7', color: '#15803d' },
  blue: { bg: '#dbeafe', color: '#1d4ed8' },
  orange: { bg: '#ffedd5', color: '#c2410c' },
  purple: { bg: '#ede9fe', color: '#6d28d9' },
  gray: { bg: '#f3f4f6', color: '#374151' },
}

export default function JobsPage() {
  const [selected, setSelected] = useState(null)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const openForm = (pos) => {
    setSelected(pos)
    setFormData({ name: '', email: '', phone: '', message: '' })
    setErrors({})
    setSubmitted(false)
    setLoading(false)
    document.body.style.overflow = 'hidden'
  }

  const closeForm = () => {
    setSelected(null)
    setSubmitted(false)
    document.body.style.overflow = ''
  }

  const validate = () => {
    const e = {}
    if (!formData.name.trim()) e.name = 'Full name is required'
    if (!formData.phone.trim()) e.phone = 'Phone number is required'
    else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\s/g, ''))) e.phone = 'Enter a valid 10-digit Indian mobile number'
    if (!formData.email.trim()) e.email = 'Email address is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Enter a valid email address'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          position: selected.id,
          name: formData.name,
          phone: formData.phone.replace(/\s/g, ''),
          email: formData.email,
          message: formData.message,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Submission failed')
      setSubmitted(true)
    } catch (err) {
      setErrors({ form: err.message || 'Something went wrong. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />

      {/* ── Hero ── */}
      <section className="jobs-hero">
        <div className="jobs-hero-bg" />
        <div className="container jobs-hero-inner">
          <div className="jobs-hero-content">
            <span className="jobs-badge">
              <span className="jobs-badge-dot" />
              We're Hiring — Join the Hangers &amp; Basket Family
            </span>
            <h1 className="jobs-hero-title">
              Build Your Career<br />
              <span>with Hangers &amp; Basket.</span>
            </h1>
            <p className="jobs-hero-sub">
              Join our trusted laundry and home care team. We're growing fast and looking for driven, reliable people who take pride in their work.
            </p>
          </div>

          <div className="jobs-positions-card">
            <div className="jpc-header">
              <span className="jpc-dot" />
              Open Positions
            </div>
            {positions.map((p) => (
              <button key={p.id} className="jpc-row" onClick={() => openForm(p)}>
                <span className="jpc-dot-role" style={{ background: p.color }} />
                <span className="jpc-name">{p.title}</span>
                <span className={`jpc-badge ${p.tags.includes('Urgent') ? 'jpc-badge-hot' : 'jpc-badge-open'}`}>
                  {p.tags.includes('Urgent') ? 'Hot' : 'Open'}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Open Positions Grid ── */}
      <section className="jobs-section">
        <div className="container">
          <p className="jobs-section-tag">
            <span className="jobs-badge-dot" style={{ background: '#22c55e', display: 'inline-block', width: 8, height: 8, borderRadius: '50%', marginRight: 8 }} />
            Now Hiring
          </p>
          <h2 className="jobs-section-title">Open <span>Positions</span></h2>
          <div className="jobs-grid">
            {positions.map((p) => (
              <button key={p.id} className="job-card" onClick={() => openForm(p)}>
                <span className="job-card-icon" style={{ color: p.color, background: p.color + '18' }}>
                  {p.icon}
                </span>
                <h3 className="job-card-title">{p.title}</h3>
                <p className="job-card-desc">{p.desc}</p>
                <div className="job-card-tags">
                  {p.tags.map((tag, i) => {
                    const c = tagColorMap[p.tagColors[i]] || tagColorMap.gray
                    return (
                      <span key={tag} className="job-tag" style={{ background: c.bg, color: c.color }}>{tag}</span>
                    )
                  })}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Work With Us ── */}
      <section className="jobs-why">
        <div className="container">
          <h2 className="jobs-why-title">Why Work at <span>Hangers &amp; Basket?</span></h2>
          <p className="jobs-why-sub">We take care of our team the same way we take care of our customers.</p>
          <div className="jobs-benefits-grid">
            {benefits.map((b, i) => (
              <div key={i} className="benefit-card">
                <span className="benefit-icon">{b.icon}</span>
                <h3 className="benefit-title">{b.title}</h3>
                <p className="benefit-desc">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* ── Application Modal ── */}
      {selected && (
        <div className="job-modal-overlay" onClick={(e) => e.target === e.currentTarget && closeForm()}>
          <div className="job-modal">
            <button className="job-modal-close" onClick={closeForm} aria-label="Close">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>

            {submitted ? (
              <div className="job-modal-success">
                <span className="job-success-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                </span>
                <h3>Application Sent!</h3>
                <p>Thanks for your interest in the <strong>{selected.title}</strong> role. We'll review your application and get back to you soon.</p>
                <button className="job-submit-btn" onClick={closeForm}>Close</button>
              </div>
            ) : (
              <>
                <div className="job-modal-header">
                  <span className="job-modal-icon" style={{ color: selected.color, background: selected.color + '18' }}>
                    {selected.icon}
                  </span>
                  <div>
                    <h2 className="job-modal-title">Apply for {selected.title}</h2>
                    <p className="job-modal-sub">{selected.desc}</p>
                  </div>
                </div>

                <form className="job-form" onSubmit={handleSubmit} noValidate>
                  <div className="job-form-row">
                    <div className="job-form-group">
                      <label>Full Name <span className="job-req">*</span></label>
                      <input
                        type="text"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={errors.name ? 'error' : ''}
                      />
                      {errors.name && <span className="job-err">{errors.name}</span>}
                    </div>
                    <div className="job-form-group">
                      <label>Phone Number <span className="job-req">*</span></label>
                      <input
                        type="tel"
                        placeholder="9876543210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={errors.phone ? 'error' : ''}
                      />
                      {errors.phone && <span className="job-err">{errors.phone}</span>}
                    </div>
                  </div>

                  <div className="job-form-group">
                    <label>Email Address <span className="job-req">*</span></label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={errors.email ? 'error' : ''}
                    />
                    {errors.email && <span className="job-err">{errors.email}</span>}
                  </div>

                  <div className="job-form-group">
                    <label>Tell us about yourself <span className="job-optional">(optional)</span></label>
                    <textarea
                      rows={4}
                      placeholder="Briefly describe your experience and why you'd like to join our team..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  {errors.form && <p className="job-err" style={{ marginBottom: 8 }}>{errors.form}</p>}

                  <button type="submit" className="job-submit-btn" disabled={loading}>
                    {loading ? (
                      <><span className="job-btn-spinner" /> Submitting…</>
                    ) : (
                      <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Send Application</>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
