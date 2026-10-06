import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './FranchisePage.css'

const statesAndCities = {
  'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool', 'Tirupati'],
  'Arunachal Pradesh': ['Itanagar', 'Naharlagun', 'Pasighat'],
  'Assam': ['Guwahati', 'Silchar', 'Dibrugarh', 'Jorhat'],
  'Bihar': ['Patna', 'Gaya', 'Muzaffarpur', 'Bhagalpur'],
  'Chhattisgarh': ['Raipur', 'Bhilai', 'Bilaspur', 'Durg'],
  'Goa': ['Panaji', 'Margao', 'Vasco da Gama'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Gandhinagar'],
  'Haryana': ['Gurugram', 'Faridabad', 'Chandigarh', 'Ambala', 'Hisar'],
  'Himachal Pradesh': ['Shimla', 'Dharamsala', 'Mandi'],
  'Jharkhand': ['Ranchi', 'Jamshedpur', 'Dhanbad'],
  'Karnataka': ['Bengaluru', 'Mysuru', 'Hubli', 'Mangaluru', 'Belagavi'],
  'Kerala': ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur'],
  'Madhya Pradesh': ['Bhopal', 'Indore', 'Jabalpur', 'Gwalior', 'Ujjain'],
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad', 'Thane'],
  'Manipur': ['Imphal', 'Thoubal'],
  'Meghalaya': ['Shillong', 'Tura'],
  'Mizoram': ['Aizawl', 'Lunglei'],
  'Nagaland': ['Kohima', 'Dimapur'],
  'Odisha': ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Berhampur'],
  'Punjab': ['Chandigarh', 'Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala'],
  'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Ajmer'],
  'Sikkim': ['Gangtok', 'Namchi'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem'],
  'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar'],
  'Tripura': ['Agartala', 'Udaipur'],
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Agra', 'Varanasi', 'Prayagraj', 'Noida', 'Ghaziabad'],
  'Uttarakhand': ['Dehradun', 'Haridwar', 'Roorkee', 'Rishikesh'],
  'West Bengal': ['Kolkata', 'Howrah', 'Durgapur', 'Asansol', 'Siliguri'],
  'Delhi (NCT)': ['New Delhi', 'Dwarka', 'Rohini', 'Saket', 'Lajpat Nagar'],
}

const investmentRanges = [
  '₹15L – ₹25L',
  '₹25L – ₹50L',
  '₹50L – ₹1Cr',
  '₹1Cr+',
]

const perks = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Trusted Brand',
    desc: '8+ years of customer trust and a brand people recognise.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
    title: 'Full Training & Support',
    desc: 'Complete operational training, SOPs, and ongoing support.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    title: 'Proven ROI',
    desc: 'Low investment, high demand — laundry never goes out of style.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: 'Technology Driven',
    desc: 'App-based booking, CRM tools, and real-time order tracking.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M8 12l2 2 4-4"/>
      </svg>
    ),
    title: 'Exclusive Territory',
    desc: "Protected local area so you're not competing with other franchisees.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Marketing Support',
    desc: 'Centralised marketing, social media campaigns, and lead generation.',
  },
]

const empty = { firstName: '', lastName: '', mobile: '', email: '', state: '', city: '', investment: '', timeline: '' }

export default function FranchisePage() {
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const cities = form.state ? (statesAndCities[form.state] || []) : []

  const set = (k, v) => {
    setForm(f => ({ ...f, [k]: v, ...(k === 'state' ? { city: '' } : {}) }))
    setErrors(e => ({ ...e, [k]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.firstName.trim()) e.firstName = 'First name is required'
    if (!form.mobile.trim()) e.mobile = 'Mobile number is required'
    else if (!/^[6-9]\d{9}$/.test(form.mobile.replace(/\s/g, ''))) e.mobile = 'Enter a valid 10-digit mobile number'
    if (!form.email.trim()) e.email = 'Email address is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.state) e.state = 'Please select a state'
    if (!form.city) e.city = 'Please select a city'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    try {
      const res = await fetch('/api/franchise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          mobile: form.mobile,
          email: form.email,
          state: form.state,
          city: form.city,
          investmentRange: form.investment,
          timeline: form.timeline,
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
      <section className="fr-hero">
        <div className="fr-hero-bg" />
        <div className="container fr-hero-inner">
          <span className="fr-badge">
            <span className="fr-badge-dot" />
            Franchise Opportunity
          </span>
          <h1 className="fr-hero-title">
            Own a <span>Hangers &amp; Basket</span><br />Franchise
          </h1>
          <p className="fr-hero-sub">
            Join India's growing laundry revolution. Partner with a trusted brand and build a profitable business with full training and support from day one.
          </p>
        </div>
      </section>

      {/* ── Enquiry Form ── */}
      <section className="fr-form-section">
        <div className="container">
          <div className="fr-form-wrap">
            <div className="fr-form-header">
              <h2>Franchise <span>Enquiry Form</span></h2>
              <p>Fill in your details and our franchise team will get back to you within 24 hours.</p>
            </div>

            {submitted ? (
              <div className="fr-success">
                <span className="fr-success-icon">
                  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                </span>
                <h3>Enquiry Submitted!</h3>
                <p>Thank you for your interest. Our franchise team will reach out to you shortly at <strong>{form.email}</strong>.</p>
                <button className="fr-submit-btn" onClick={() => { setForm(empty); setSubmitted(false) }}>Submit Another Enquiry</button>
              </div>
            ) : (
              <form className="fr-form" onSubmit={handleSubmit} noValidate>
                <div className="fr-row">
                  <div className="fr-group">
                    <label>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      First Name <span className="fr-req">*</span>
                    </label>
                    <input type="text" placeholder="Eg: John" value={form.firstName} onChange={e => set('firstName', e.target.value)} className={errors.firstName ? 'error' : ''} />
                    {errors.firstName && <span className="fr-err">{errors.firstName}</span>}
                  </div>
                  <div className="fr-group">
                    <label>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      Last Name
                    </label>
                    <input type="text" placeholder="Eg: Doe" value={form.lastName} onChange={e => set('lastName', e.target.value)} />
                  </div>
                </div>

                <div className="fr-row">
                  <div className="fr-group">
                    <label>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
                      Mobile No. <span className="fr-req">*</span>
                    </label>
                    <input type="tel" placeholder="Eg: 9988776655" value={form.mobile} onChange={e => set('mobile', e.target.value)} className={errors.mobile ? 'error' : ''} maxLength={10} />
                    {errors.mobile && <span className="fr-err">{errors.mobile}</span>}
                  </div>
                  <div className="fr-group">
                    <label>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                      Email Address <span className="fr-req">*</span>
                    </label>
                    <input type="email" placeholder="Eg: john.doe@gmail.com" value={form.email} onChange={e => set('email', e.target.value)} className={errors.email ? 'error' : ''} />
                    {errors.email && <span className="fr-err">{errors.email}</span>}
                  </div>
                </div>

                <div className="fr-row">
                  <div className="fr-group">
                    <label>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3h18v4H3z"/><path d="M3 10h18v11H3z"/><line x1="3" y1="14" x2="21" y2="14"/></svg>
                      Select Interested State <span className="fr-req">*</span>
                    </label>
                    <div className="fr-select-wrap">
                      <select value={form.state} onChange={e => set('state', e.target.value)} className={errors.state ? 'error' : ''}>
                        <option value="">Select State</option>
                        {Object.keys(statesAndCities).sort().map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <svg className="fr-select-arrow" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>
                    </div>
                    {errors.state && <span className="fr-err">{errors.state}</span>}
                  </div>
                  <div className="fr-group">
                    <label>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      Select Interested City <span className="fr-req">*</span>
                    </label>
                    <div className="fr-select-wrap">
                      <select value={form.city} onChange={e => set('city', e.target.value)} className={errors.city ? 'error' : ''} disabled={!form.state}>
                        <option value="">{form.state ? 'Select City' : 'Select State first'}</option>
                        {cities.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <svg className="fr-select-arrow" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>
                    </div>
                    {errors.city && <span className="fr-err">{errors.city}</span>}
                  </div>
                </div>

                <div className="fr-group fr-group-half">
                  <label>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
                    Investment Range
                  </label>
                  <div className="fr-select-wrap">
                    <select value={form.investment} onChange={e => set('investment', e.target.value)}>
                      <option value="">Select Range</option>
                      {investmentRanges.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                    <svg className="fr-select-arrow" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>
                  </div>
                </div>

                <div className="fr-group">
                  <label className="fr-label-plain">How soon can you invest?</label>
                  <div className="fr-radios">
                    {['Within 15 Days', 'Within 30 Days', 'Within 60 Days'].map(opt => (
                      <label key={opt} className="fr-radio">
                        <input type="radio" name="timeline" value={opt} checked={form.timeline === opt} onChange={() => set('timeline', opt)} />
                        <span className="fr-radio-dot" />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>

                {Object.keys(errors).length > 0 && (
                  <p className="fr-form-error">
                    {errors.form || 'Please fill in all required fields correctly.'}
                  </p>
                )}

                <button type="submit" className="fr-submit-btn" disabled={loading}>
                  {loading
                    ? <><span className="fr-btn-spinner" /> Submitting…</>
                    : 'Submit Enquiry'
                  }
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
