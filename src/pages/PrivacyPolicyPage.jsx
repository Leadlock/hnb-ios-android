import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './TermsPage.css'

const sections = [
  {
    num: '01',
    title: 'Information We Collect',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
    items: [
      'Contact Details: Name, phone number, email address, and pickup/delivery address when you book a service, submit an enquiry, or apply for a job or franchise.',
      'Order Information: Service selections, garment details, pricing, and delivery preferences needed to fulfil your order.',
      'Communications: Messages you send us via WhatsApp, email, or our contact forms, including franchise and job application submissions.',
      'Technical Data: IP address, browser type, device information, and pages visited, collected automatically when you use our website.',
      'Cookie Consent Records: The choices you make in our cookie banner (which categories you accepted or rejected), along with the language and timestamp of that choice.',
    ],
  },
  {
    num: '02',
    title: 'Cookies We Use',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M8.5 8.5v.01M16 15.5v.01M12 12v.01M11 17v.01M7 14v.01"/>
      </svg>
    ),
    items: [
      'Strictly Necessary: Required for the website to function — for example, remembering your cookie preferences. These cannot be switched off.',
      'Functional: Remember your settings, such as your selected city or language, to give you a smoother experience.',
      'Analytics: Help us understand how visitors use our site (pages viewed, time spent) via Google Analytics, so we can improve our services. Only loaded if you opt in.',
      'Marketing: Used to measure the effectiveness of our promotions and offers. Only loaded if you opt in.',
      'You can review or change your choice at any time from the "Manage Cookie Preferences" link in our website footer.',
    ],
  },
  {
    num: '03',
    title: 'How We Use Your Information',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
    items: [
      'To schedule pickups and deliveries, process your order, and send billing and order-status updates via call, SMS, or WhatsApp.',
      'To respond to enquiries, job applications, and franchise applications you submit through our website.',
      'To improve our website and services using aggregated, anonymised analytics — only for visitors who have consented to the Analytics cookie category.',
      'To comply with applicable law, or when necessary to prevent fraud or protect the rights and safety of our customers and staff.',
    ],
  },
  {
    num: '04',
    title: 'How We Share Your Information',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
      </svg>
    ),
    items: [
      'We do not sell your personal information to third parties.',
      'Service providers such as Google Analytics may process limited, anonymised usage data on our behalf, strictly to help us understand site usage — and only once you have consented to the Analytics cookie category.',
      'We may disclose necessary personal information to law enforcement or statutory bodies if required by law or in furtherance of a lawful investigation.',
    ],
  },
  {
    num: '05',
    title: 'Your Rights & Choices',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    items: [
      'Cookie Preferences: You can accept, reject, or customise non-essential cookies at any time via the cookie banner or the "Manage Cookie Preferences" link in the footer.',
      'Access & Correction: You may request a copy of the personal information we hold about you, or ask us to correct it, by contacting us at info@hnb.co.in.',
      'Withdrawal of Consent: You can withdraw previously given consent for Analytics or Marketing cookies at any time, without affecting the lawfulness of processing carried out before withdrawal.',
      'Deletion: You may request deletion of your personal data, subject to any legal or operational retention requirements (such as billing records).',
    ],
  },
  {
    num: '06',
    title: 'Data Retention & Security',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><circle cx="12" cy="16" r="1"/>
      </svg>
    ),
    items: [
      'We retain order and billing information for as long as needed to provide our services and meet legal/accounting obligations.',
      'Cookie consent records are retained to demonstrate compliance with applicable data protection law.',
      'We use reasonable administrative and technical safeguards to protect your data, and do not sell your personal information to unauthorized third parties.',
    ],
  },
  {
    num: '07',
    title: 'Governing Law',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6l9-4 9 4v6c0 5.25-3.75 10.15-9 11.5C6.75 22.15 3 17.25 3 12V6z"/><polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
    items: [
      'This Privacy Policy is governed by the laws of India, including the Digital Personal Data Protection Act, 2023, where applicable.',
      'We may update this Privacy Policy from time to time; material changes will be reflected by an updated "Last updated" date, and may re-trigger the cookie consent banner.',
      'All disputes arising out of or in connection with this policy are subject to the exclusive jurisdiction of the courts in Navi Mumbai, Maharashtra, India.',
    ],
  },
]

export default function PrivacyPolicyPage() {
  const [openSections, setOpenSections] = useState(new Set())

  const toggleSection = (num) => setOpenSections(prev => {
    const next = new Set(prev)
    next.has(num) ? next.delete(num) : next.add(num)
    return next
  })
  const allExpanded = openSections.size === sections.length
  const expandAll = () => setOpenSections(new Set(sections.map(s => s.num)))
  const collapseAll = () => setOpenSections(new Set())

  return (
    <>
      <Header />
      <main className="terms-main">

        {/* Hero */}
        <div className="terms-hero">
          <div className="terms-hero-bg" />
          <div className="container terms-hero-inner">
            <div className="terms-hero-left">
              <span className="terms-tag">LEGAL</span>
              <h1 className="terms-title">Privacy Policy</h1>
              <p className="terms-sub">Last updated: August 2026</p>
              <p className="terms-intro">
                Hangers &amp; Basket respects your privacy. This policy explains what information we
                collect, how we use cookies, and the choices you have — including how to manage
                your cookie preferences at any time.
              </p>
              <button
                type="button"
                className="btn btn-secondary"
                style={{ marginTop: 8 }}
                onClick={() => window.dispatchEvent(new Event('open-cookie-banner'))}
              >
                Manage Cookie Preferences
              </button>
            </div>
            <div className="terms-hero-right">
              <div className="terms-toc">
                <p className="terms-toc-title">Table of Contents</p>
                {sections.map((s) => (
                  <a
                    key={s.num}
                    href={`#sec-${s.num}`}
                    className="terms-toc-link"
                    onClick={() => setOpenSections(prev => { const n = new Set(prev); n.add(s.num); return n })}
                  >
                    <span className="terms-toc-num">{s.num}</span>
                    <span>{s.title}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="terms-body">
          <div className="terms-expand-bar">
            <button className="terms-expand-btn" onClick={allExpanded ? collapseAll : expandAll}>
              {allExpanded ? 'Collapse All' : 'Expand All'}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {allExpanded ? <path d="M18 15l-6-6-6 6"/> : <path d="M6 9l6 6 6-6"/>}
              </svg>
            </button>
          </div>

          <div className="terms-sections">
            {sections.map((sec) => (
              <div key={sec.num} id={`sec-${sec.num}`} className={`terms-section ${openSections.has(sec.num) ? 'active' : ''}`}>
                <button className="terms-section-header" onClick={() => toggleSection(sec.num)}>
                  <div className="terms-section-header-left">
                    <span className="terms-icon-wrap">{sec.icon}</span>
                    <div>
                      <span className="terms-num-label">Section {sec.num}</span>
                      <h2 className="terms-section-title">{sec.title}</h2>
                    </div>
                  </div>
                  <span className={`terms-chevron ${openSections.has(sec.num) ? 'open' : ''}`}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                  </span>
                </button>
                <div className={`terms-section-body ${openSections.has(sec.num) ? 'open' : ''}`}>
                  <ul className="terms-list">
                    {sec.items.map((item, i) => {
                      const [head, ...rest] = item.split(':')
                      const hasHead = rest.length > 0 && head.length < 40
                      return (
                        <li key={i} className="terms-item">
                          <span className="terms-bullet-dot" />
                          <span>
                            {hasHead ? <><strong>{head}:</strong>{rest.join(':')}</> : item}
                          </span>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <div className="terms-footer-note">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1F5FFF" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <p>Questions about this policy? <a href="https://wa.me/917045110011" target="_blank" rel="noreferrer">Contact us on WhatsApp</a> or email <a href="mailto:info@hnb.co.in">info@hnb.co.in</a></p>
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}
