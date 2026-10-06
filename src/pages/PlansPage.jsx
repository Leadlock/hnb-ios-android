import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { prepayPacks, regularOffers, membershipPlans, membershipTnC } from '../data/data'
import { triggerHaptic } from '../utils/native'
import './PlansPage.css'

const WA_LINK = 'https://wa.me/917045110077?text=Hi'
const WA_REFERRAL = 'https://wa.me/917045110011?text=' + encodeURIComponent("Hi! I'd like to get my WhatsApp referral code for Hangers & Basket.")

const WA_ENQUIRY_NUM = '917045110011'
const waEnquiryLink = (message) =>
  `https://wa.me/${WA_ENQUIRY_NUM}?text=` + encodeURIComponent(message)

function EligibleToggle({ items }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="plp-eligible">
      <button className="plp-eligible-btn" onClick={() => setOpen(o => !o)}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
        </svg>
        <span>What's included</span>
        <svg className={`plp-eligible-chevron ${open ? 'open' : ''}`} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>
      <div className={`plp-eligible-body ${open ? 'open' : ''}`}>
        <div className="plp-eligible-tags">
          {items.map((item, i) => <span key={i} className="plp-eligible-tag">{item}</span>)}
        </div>
      </div>
    </div>
  )
}

function PackCard({ pack }) {
  return (
    <div className={`plp-pack-card${pack.isBestSeller ? ' plp-pack-card--featured' : ''}`}>
      {pack.isBestSeller && <div className="plp-ribbon">Best Seller</div>}
      <span className="plp-pack-badge">{pack.badge}</span>
      <h3 className="plp-pack-title">{pack.title}</h3>
      {pack.subtitle && <p className="plp-pack-sub">{pack.subtitle}</p>}
      {pack.description && <p className="plp-pack-desc">{pack.description}</p>}

      <div className="plp-pack-pricing">
        <span className="plp-pack-price">₹{pack.price.toLocaleString('en-IN')}</span>
        <span className="plp-pack-original">₹{pack.originalPrice.toLocaleString('en-IN')}</span>
        <span className="plp-save-badge">Save ₹{pack.savings}</span>
      </div>

      <ul className="plp-list">
        {pack.highlights.map((h, i) => (
          <li key={i}><span className="plp-check">✓</span>{h}</li>
        ))}
        <li><span className="plp-check">✓</span>Validity — {pack.validity}</li>
      </ul>

      {pack.eligibleItems && <EligibleToggle items={pack.eligibleItems} />}

      <a href={pack.waMessage ? waEnquiryLink(pack.waMessage) : WA_LINK} target="_blank" rel="noreferrer" className="plp-pack-cta">
        Get This Pack
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </a>
    </div>
  )
}

function OfferCard({ offer }) {
  return (
    <div className="plp-offer-card">
      <div className="plp-offer-top">
        <div className="plp-offer-icon-wrap" style={{ background: offer.iconBg }}>
          <img src={offer.icon} alt={offer.badge} className="plp-offer-icon" />
        </div>
        <span className="plp-offer-badge">{offer.badge}</span>
      </div>
      <h3 className="plp-offer-title">{offer.title}</h3>

      {offer.price && (
        <div className="plp-pack-pricing" style={{ marginBottom: 16 }}>
          <span className="plp-pack-price">₹{offer.price.toLocaleString('en-IN')}</span>
          <span className="plp-pack-original">₹{offer.originalPrice.toLocaleString('en-IN')}</span>
          <span className="plp-save-badge">Save ₹{offer.savings}</span>
        </div>
      )}

      <ul className="plp-list">
        {offer.highlights.map((h, i) => (
          <li key={i}><span className="plp-check">✓</span>{h}</li>
        ))}
      </ul>

      <a href={offer.waMessage ? waEnquiryLink(offer.waMessage) : WA_LINK} target="_blank" rel="noreferrer" className="plp-offer-cta">
        Enquire on WhatsApp →
      </a>
    </div>
  )
}

function MembershipCard({ plan }) {
  return (
    <div
      className={`plp-mem-card${plan.isBestValue ? ' plp-mem-card--featured' : ''}`}
      style={{ '--mem-color': plan.color, '--mem-dark': plan.accentDark }}
    >
      {plan.isBestValue && <div className="plp-mem-ribbon">Best Value</div>}

      <div className="plp-mem-header">
        <span className="plp-mem-tier">{plan.tier}</span>
        <span className="plp-mem-discount">{plan.discount}% OFF</span>
      </div>

      <div className="plp-mem-investment">
        <span className="plp-mem-price">₹{plan.investment.toLocaleString('en-IN')}</span>
        <span className="plp-mem-validity">valid {plan.validity}</span>
      </div>

      <div className="plp-mem-divider" />

      <p className="plp-mem-label">Effective Rates</p>
      <ul className="plp-mem-rates">
        {plan.rates.map((r, i) => (
          <li key={i}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            {r}
          </li>
        ))}
      </ul>

      {plan.perks.length > 0 && (
        <>
          <p className="plp-mem-label" style={{ marginTop: 16 }}>Perks</p>
          <ul className="plp-mem-perks">
            {plan.perks.map((p, i) => (
              <li key={i}>
                <span className="plp-mem-star">★</span>{p}
              </li>
            ))}
            {plan.expressUses && (
              <li>
                <span className="plp-mem-star">★</span>
                Get clothes back in 48 hrs — use up to <strong style={{ whiteSpace: 'nowrap' }}>{plan.expressUses} times</strong>
              </li>
            )}
          </ul>
        </>
      )}

      <a href={waEnquiryLink(`Hi, I am interested in your ${plan.tier} Membership Plan.`)} target="_blank" rel="noreferrer" className="plp-mem-cta">
        Get {plan.tier} →
      </a>
    </div>
  )
}

function ReferralSection() {
  const [openFaq, setOpenFaq] = useState(null)

  const faqs = [
    {
      q: 'How do I use my 5% wallet credit?',
      a: 'Your wallet credit is automatically calculated and stored under your account phone number. You can apply your balance toward any upcoming dry cleaning, laundry, or pressing services.'
    },
    {
      q: 'How does a new customer apply the 25% discount?',
      a: "When booking a service or dropping off clothes, the new customer simply presents your unique WhatsApp code. Our system will immediately verify it and apply 25% off their first order."
    },
    {
      q: 'Is there a limit on how many friends I can refer?',
      a: "No limit at all! You can share your code with as many friends, colleagues, and family members as you like. You will earn 5% cashback on every new client's initial service bill."
    }
  ]

  const WA_SVG = (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.553 4.103 1.523 5.824L.057 23.882a.5.5 0 00.606.63l6.288-1.652A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.698-.504-5.248-1.385l-.376-.217-3.892 1.022 1.04-3.793-.232-.389A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
    </svg>
  )

  return (
    <div className="ref-wrap">

      {/* Hero banner */}
      <div className="ref-hero">
        <span className="ref-hero-badge">REFERRAL PROGRAM</span>
        <h2 className="ref-hero-title">Share the Freshness.<br />Earn &amp; Save Together!</h2>
        <p className="ref-hero-sub">Give your friends 25% off their first service, and earn 5% cashback directly in your wallet every time they order with us.</p>
        <a href={WA_REFERRAL} target="_blank" rel="noreferrer" className="ref-hero-btn">
          {WA_SVG}
          Get My WhatsApp Referral Code
        </a>
      </div>

      {/* Benefit cards */}
      <div className="ref-cards">
        <div className="ref-card">
          <span className="ref-card-tag ref-card-tag--blue">FOR EXISTING CLIENTS</span>
          <div className="ref-card-pct ref-card-pct--blue">5% OFF</div>
          <h3 className="ref-card-title">Cashback in Your Wallet</h3>
          <p className="ref-card-desc">Earn 5% of the total sale value every time a friend uses your unique referral code.</p>
          <hr className="ref-card-divider" />
          <ul className="ref-card-list">
            <li><span className="ref-check ref-check--blue">✓</span>Instant credit sent directly to your account wallet</li>
            <li><span className="ref-check ref-check--blue">✓</span>Use your balance for any dry cleaning or laundry service</li>
            <li><span className="ref-check ref-check--blue">✓</span>No maximum limit — refer more friends to earn more</li>
          </ul>
        </div>
        <div className="ref-card">
          <span className="ref-card-tag ref-card-tag--green">FOR NEW CLIENTS</span>
          <div className="ref-card-pct ref-card-pct--green">25% OFF</div>
          <h3 className="ref-card-title">Your First Order Discount</h3>
          <p className="ref-card-desc">Upgrade from our standard 20% discount to 25% OFF when referred by an existing client.</p>
          <hr className="ref-card-divider" />
          <ul className="ref-card-list">
            <li><span className="ref-check ref-check--green">✓</span>Higher discount exclusive to referred customers</li>
            <li><span className="ref-check ref-check--green">✓</span>Valid on all services</li>
            <li><span className="ref-check ref-check--green">✓</span>Simply mention your friend's referral code at booking</li>
          </ul>
        </div>
      </div>

      {/* How it works */}
      <div className="ref-how">
        <h3 className="ref-how-title">How The Referral Works</h3>
        <p className="ref-how-sub">A simple 3-step process to help you earn wallet credits while sharing discounts with friends.</p>
        <div className="ref-steps">
          <div className="ref-step">
            <div className="ref-step-num">1</div>
            <h4 className="ref-step-title">Share Your Code</h4>
            <p className="ref-step-desc">Receive your personalized unique referral code sent directly to your WhatsApp. Share it with family, friends, or neighbors.</p>
          </div>
          <div className="ref-step-arrow">→</div>
          <div className="ref-step">
            <div className="ref-step-num">2</div>
            <h4 className="ref-step-title">Friend Gets 25% Off</h4>
            <p className="ref-step-desc">Your friend uses your unique code when placing their first order and saves 25% on their bill.</p>
          </div>
          <div className="ref-step-arrow">→</div>
          <div className="ref-step">
            <div className="ref-step-num">3</div>
            <h4 className="ref-step-title">You Get Paid 5%</h4>
            <p className="ref-step-desc">Once their service is completed, 5% of their total sale value is instantly credited to your wallet for future use.</p>
          </div>
        </div>
      </div>

      {/* Code request box */}
      <div className="ref-code-box">
        <div className="ref-code-text">
          <h3 className="ref-code-title">Haven't Received Your Code Yet?</h3>
          <p className="ref-code-desc">We automatically issue referral codes via WhatsApp to all registered clients. If you haven't received yours or need a reminder, get in touch with us right away!</p>
        </div>
        <a href={WA_REFERRAL} target="_blank" rel="noreferrer" className="ref-code-btn">
          {WA_SVG}
          Request Code on WhatsApp
        </a>
      </div>

      {/* FAQs */}
      <div className="ref-faq">
        <h3 className="ref-faq-title">Frequently Asked Questions</h3>
        <p className="ref-faq-sub">Everything you need to know about our referral discounts and wallet credits.</p>
        <div className="ref-faq-list">
          {faqs.map((item, i) => (
            <div key={i} className={`ref-faq-item ${openFaq === i ? 'open' : ''}`}>
              <button className="ref-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span>{item.q}</span>
                <svg className="ref-faq-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>
              <div className="ref-faq-a-wrap">
                <p className="ref-faq-a">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

const menuItems = [
  { id: 'prepay',     label: 'Prepaid Packs' },
  { id: 'offers',     label: 'Regular Offers' },
  { id: 'membership', label: 'Membership Plans' },
  { id: 'referral',   label: 'Refer & Earn' },
]

const sectionMeta = {
  prepay:     { tag: 'PREPAID PACKS',    title: 'Buy in Bulk,',    titleSpan: 'Pay Less',    sub: 'Lock in lower per-kg rates upfront with our single-use prepaid packs!' },
  offers:     { tag: 'REGULAR OFFERS',   title: 'Seasonal',        titleSpan: 'Deals',       sub: 'Special campaigns running throughout the year. Ask us on WhatsApp for current availability.' },
  membership: { tag: 'MEMBERSHIP PLANS', title: 'Join. Save.',     titleSpan: 'Repeat.',     sub: 'Load your account once, enjoy flat discounts on every order for the full validity period.' },
  referral:   { tag: 'REFERRAL PROGRAM', title: 'Share the Freshness.', titleSpan: 'Earn & Save Together!', sub: '' },
}

export default function PlansPage() {
  const [active, setActive] = useState('prepay')
  const meta = sectionMeta[active]

  return (
    <>
      <Header />
      <main className="plp-main">

        {/* Hero */}
        <section className="plp-hero">
          <div className="container plp-hero-inner">
            <div className="section-tag plp-hero-tag">● PACKS & MEMBERSHIPS</div>
            <h1 className="plp-hero-title">Save More, <span className="gradient-text">Care Better.</span></h1>
            <p className="plp-hero-sub">Prepaid packs that lower your rate with every wash. Exclusive Membership plans offering great rewards as you level up. Seasonal deals all year round.</p>
          </div>
        </section>

        {/* Sidebar + Content Layout */}
        <div className="plp-layout">
          {/* Sidebar */}
          <aside className="plp-sidebar">
            <p className="plp-sidebar-label">OFFERS MENU</p>
            <nav className="plp-sidebar-nav">
              {menuItems.map(item => (
                <button
                  key={item.id}
                  className={`plp-sidebar-item ${active === item.id ? 'active' : ''}`}
                  onClick={() => { triggerHaptic('selection'); setActive(item.id) }}
                >
                  <span className="plp-sidebar-dot" />
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <div className="plp-content">
            {active !== 'referral' && (
              <div className="plp-content-header">
                <span className="plp-launch-tag">✦ {meta.tag}</span>
                <h2 className="plp-content-title">{meta.title} <span className="gradient-text">{meta.titleSpan}</span></h2>
                <p className="plp-content-sub">{meta.sub}</p>
              </div>
            )}

            {active === 'prepay' && (
              <div className="plp-pack-grid">
                {prepayPacks.map(p => <PackCard key={p.id} pack={p} />)}
              </div>
            )}

            {active === 'offers' && (
              <div className="plp-offer-grid">
                {regularOffers.map(o => <OfferCard key={o.id} offer={o} />)}
              </div>
            )}

            {active === 'membership' && (
              <>
                <div className="plp-mem-grid">
                  {membershipPlans.map(p => <MembershipCard key={p.id} plan={p} />)}
                </div>
                <div className="plp-tnc">
                  <p className="plp-tnc-title">Membership Terms &amp; Conditions</p>
                  <ul className="plp-tnc-list">
                    {membershipTnC.map((t, i) => <li key={i}>{t}</li>)}
                  </ul>
                </div>
              </>
            )}

            {active === 'referral' && <ReferralSection />}
          </div>
        </div>

        {/* Bottom CTA */}
        <section className="plp-bottom-cta">
          <div className="container plp-bottom-inner">
            <h2 className="plp-bottom-title">Ready to Start Saving?</h2>
            <p className="plp-bottom-sub">Message us on WhatsApp to activate your pack or membership. We reply in under 60 seconds.</p>
            <div className="plp-bottom-btns">
              <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn btn-primary">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.553 4.103 1.523 5.824L.057 23.882a.5.5 0 00.606.63l6.288-1.652A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.698-.504-5.248-1.385l-.376-.217-3.892 1.022 1.04-3.793-.232-.389A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
                Chat on WhatsApp
              </a>
              <Link to="/pricing" className="plp-bottom-link">View Full Pricing →</Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
