import './WhyChooseUs.css'

const IconStar = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1F5FFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>
const IconTruck = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 4v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
const IconClock = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
const IconSearch = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
const IconSparkle = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>
const IconCheck = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e11d48" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
const IconLeaf = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8C8 10 5.9 16.17 3.82 19.34A1 1 0 004.63 21C8 20 12 19 15 16c1-1 2-2.5 2-4"/><path d="M17 8c0-4-3-6-6-6 0 4 2.5 7 6 8"/></svg>
const IconPhone = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1F5FFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18.01"/></svg>
const IconShield = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
const IconChat = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>

const items = [
  { icon: <IconTruck />,   color: '#f0fdf4', title: 'Free Doorstep Pickup & Delivery', sub: 'All across Navi Mumbai, no extra charge' },
  { icon: <IconClock />,   color: '#fff7ed', title: 'Next Day Delivery Available',     sub: 'Same-day express also available' },
  { icon: <IconSearch />,  color: '#f0fdf4', title: 'No Minimum Order',                sub: 'One item or a full wardrobe — we collect' },
  { icon: <IconSparkle />, color: '#fdf4ff', title: '11 Services Under One Roof',      sub: 'Dry clean, shoes, home care, Laundry & more' },
  { icon: <IconCheck />,   color: '#fff1f2', title: '7 Days Open',                     sub: 'We serve all year round' },
  { icon: <IconLeaf />,    color: '#f0fdf4', title: 'Eco-Friendly German Chemicals',   sub: 'Safe for your family and the planet' },
  { icon: <IconPhone />,   color: '#eff6ff', title: 'Smart App Tracking',              sub: 'Live updates from pickup to delivery' },
]

export default function WhyChooseUs() {
  const doubled = [...items, ...items]

  return (
    <section className="why-section">
      <div className="why-inner">

        {/* Left */}
        <div className="why-left">
          <div className="why-watermark">H&amp;B</div>
          <div className="section-tag why-tag">Why Choose Us</div>
          <h2 className="why-title">Why Choose<br /><span className="gradient-text">Hangers &amp; Basket?</span></h2>
          <p className="why-sub">We don't just clean — we care. Here's why loyal customers trust us every time.</p>
          <a
            href="https://wa.me/917045110011"
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary why-btn"
          >
            <IconChat /> Chat With Us
          </a>
        </div>

        {/* Right — infinite scroll */}
        <div className="why-scroll-wrap">
          <div className="why-scroll-track">
            {doubled.map((item, i) => (
              <div key={i} className="why-row">
                <div className="why-row-icon" style={{ background: item.color }}>
                  <span>{item.icon}</span>
                </div>
                <div>
                  <div className="why-row-title">{item.title}</div>
                  <div className="why-row-sub">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
