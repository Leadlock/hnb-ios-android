import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './TermsPage.css'

const sections = [
  {
    num: '01',
    title: 'Service Terms & Conditions',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
    items: [
      'We handle all garments, linen, and fabrics with the utmost care, employing reasonable efforts to achieve high-quality washing, drying, and dry-cleaning standards.',
      'We reserve the right to decline cleaning any garment if, after due assessment, we conclude that it is beyond our capacity to treat safely or if the item requires specialized care we cannot provide.',
      'This is a "No Claim" and "Wear & Tear" policy service; garments are accepted at the customer\'s risk and are expected to withstand standard cleaning procedures.',
      'We are not responsible for special care or delicate items that require attention beyond standard industry practices.',
    ],
  },
  {
    num: '02',
    title: 'Detailed Garment Damage Policy',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
    items: [
      'Pre-existing Conditions: Garments with pre-existing stains, marks, or material defects are processed entirely at the customer\'s risk.',
      'Stain Removal: While we put our best efforts into treating stubborn stains and marks, we do not guarantee 100% stain removal. Difficult stains are processed at the customer\'s risk, and no deduction in processing charges will be entertained if stains persist.',
      'Inherent Defects & Aging: We shall not be held responsible for damages—such as cuts, holes, scratches, or stretches—that become apparent during the wash process due to defective manufacturing, adulteration, deterioration, wear & tear, or prior environmental exposure.',
      'Color & Fabric Risks: We are not responsible for color fastness, color bleeding, color running, fabric shrinkage, or discoloration arising from the inherent weakness of the materials.',
      'Embellishments: We bear no responsibility for damage to broken embellishments, tampered embroidery, ornaments, jewellery fittings, or delicate decorative elements during the normal course of processing.',
      'Claim Window: Customers must examine their articles for damage at the time of delivery. Any dissatisfaction or quality-related issues must be reported within 24 to 48 hours of delivery. Complaints received after this period will not be entertained.',
    ],
  },
  {
    num: '03',
    title: 'Payment & Billing',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
        <line x1="1" y1="10" x2="23" y2="10"/>
      </svg>
    ),
    items: [
      'We accept payments via cash, cards, e-wallets, net banking, and other convenient electronic methods.',
      'You may receive an estimated bill amount at the time of handing over the garments, but the exact bill will be confirmed via message or invoice once the articles are booked at the store.',
      'Tariffs for designer wear, high-end fabric clothes, or complex pieces will be decided on a case-to-case basis after expert examination at our facility.',
      'Express or urgent delivery services will invite an additional charge (typically 50% to 100% extra over the regular tariff, communicated at the time of booking).',
      'There may be additional charges for the removal and installation of certain items, such as curtains and similar household furnishings.',
      'Two or more discounts or promotional offers cannot be combined in a single bill.',
      'Payments made for services rendered are final, and no discounts will be applied once the bill is generated or garments are processed.',
    ],
  },
  {
    num: '04',
    title: 'Delivery & Transit',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/>
        <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
    items: [
      'The original bill, receipt, or challan copy must be presented at the time of delivery. If lost, articles will only be handed over after properly verifying the owner\'s credentials.',
      'Without the original receipt, we shall not be held responsible for any loss or misplacement of articles.',
      'We strive for punctual pick-up and drop facilities; however, delays due to unforeseen circumstances or force majeure events may occur. In such cases, no compensation, refund, or reduction in charges shall apply.',
      'Uncollected Items: We do not accept liability for any items not collected within 15 days from the scheduled delivery date.',
      'Articles left beyond 15 days will incur a surcharge of 25% of the total bill for the subsequent 15 days. After 30 days from the delivery date, Hangers & Basket will not be liable for any loss or damage to the uncollected items.',
    ],
  },
  {
    num: '05',
    title: 'Limitation of Liability',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    items: [
      'Maximum Compensation: In the rare event of loss or damage to an article during processing (excluding the specific damage exceptions listed in Section 2), our maximum liability and compensation shall be strictly limited to 6 times the value of the processing charges specified for that specific item, or INR 3000, whichever is lower.',
      'To initiate any reimbursement claim, the customer must present the original Hangers & Basket bill.',
      'Personal Valuables: Customers must thoroughly check pockets before handover. We are not responsible for any loss or damage to valuables (cash, jewellery, etc.) inadvertently left in the garments.',
      'Force Majeure: We accept no liability for the loss or damage of articles arising from events beyond our control, including fire, burglary, natural disasters, riots, epidemics, or strikes.',
    ],
  },
  {
    num: '06',
    title: 'Disclaimer',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
    items: [
      'Your use of our website, applications, and services is entirely at your own risk.',
      'Services are provided on an "as is" and "as available" basis without any express or implied warranties of perfection.',
      'Hangers & Basket excludes liability for any inaccuracies or errors on our platforms to the fullest extent permitted by law.',
    ],
  },
  {
    num: '07',
    title: 'Intellectual Property, Copyright & Trademark',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M14.83 14.83a4 4 0 1 1 0-5.66"/>
      </svg>
    ),
    items: [
      'Hangers & Basket is the exclusive owner and authorized user of all intellectual property related to our brand, including but not limited to trademarks, logos, brand names, website designs, and custom graphics.',
      'This website and its contents are the property of Hangers & Basket and are strictly subject to copyright laws.',
      'The use, reproduction, modification, distribution, or misuse of any of Hangers & Basket\'s intellectual property or website content is strictly prohibited without prior written permission.',
    ],
  },
  {
    num: '08',
    title: 'Privacy Policy',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
    items: [
      'To provide our services efficiently, we require customers to register and submit personal information, including name, address, and mobile phone number.',
      'By using our services, you consent to Hangers & Basket sending you messages regarding order updates, billing, and normal business operations.',
      'We may disclose necessary personal information to law enforcement or statutory bodies if required by law or in furtherance of an investigation.',
      'We are committed to maintaining the security of your data and do not sell your personal information to unauthorized third parties.',
    ],
  },
  {
    num: '09',
    title: 'Governing Law & Jurisdiction',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6l9-4 9 4v6c0 5.25-3.75 10.15-9 11.5C6.75 22.15 3 17.25 3 12V6z"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
    items: [
      'Hangers & Basket reserves the right to modify, update, or change these Terms & Conditions at any point in time without prior notice.',
      'These terms shall be exclusively governed by and construed in accordance with the laws of India.',
      'All disputes, conflicts, claims, or controversies arising out of or broadly in connection with our services are subject to the exclusive jurisdiction of the courts in Navi Mumbai, Maharashtra, India.',
    ],
  },
]

export default function TermsPage() {
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
              <h1 className="terms-title">Terms &amp; Conditions</h1>
              <p className="terms-sub">Last updated: June 2025</p>
              <p className="terms-intro">
                Welcome to Hangers &amp; Basket. By entrusting your garments and articles to our
                premium dry cleaning and care services, you agree to the following comprehensive
                terms and conditions.
              </p>

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
            <p>Questions about these terms? <a href="https://wa.me/917045110011" target="_blank" rel="noreferrer">Contact us on WhatsApp</a> or email <a href="mailto:info@hnb.co.in">info@hnb.co.in</a></p>
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}
