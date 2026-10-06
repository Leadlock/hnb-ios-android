import { useEffect, useState } from 'react'
import './ProcessTimeline.css'

const IconPhone = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2"/>
    <line x1="12" y1="18" x2="12" y2="18.01"/>
  </svg>
)
const IconTruck = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13" rx="1"/>
    <path d="M16 8h4l3 4v5h-7V8z"/>
    <circle cx="5.5" cy="18.5" r="2.5"/>
    <circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
)
const IconSparkle = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
  </svg>
)
const IconCheck = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L9 17l-5-5"/>
  </svg>
)

const steps = [
  {
    num: '01', title: 'Book', icon: <IconPhone />,
    heading: 'Book in Seconds',
    desc: 'Schedule via our app or website in under 60 seconds. Pick your services, time, and address — no calls needed.',
    tags: ['✓ Easy Scheduling', '✓ Instant Confirmation', '✓ Flexible Timing'],
    mockup: (
      <div className="hw-mock">
        <div className="hw-mock-row hw-mock-header">
          <span className="hw-mock-dot blue" />
          <strong>New Booking</strong>
          <span className="hw-mock-badge green">Confirmed</span>
        </div>
        <div className="hw-mock-row"><span>Service</span><span>Dry Cleaning ×4</span></div>
        <div className="hw-mock-row"><span>Pickup</span><span>Today, 6:00 PM</span></div>
        <div className="hw-mock-row"><span>Address</span><span>Kharghar, Navi Mumbai</span></div>
        <div className="hw-mock-footer">Booking confirmed — driver assigned ✓</div>
      </div>
    )
  },
  {
    num: '02', title: 'Collect', icon: <IconTruck />,
    heading: 'Doorstep Collection',
    desc: 'Our driver arrives at your door at the scheduled time, carefully collects your items and you get an automated receipt on your mobile.',
    tags: ['✓ On-Time Pickup', '✓ Itemised Receipt', '✓ Real-Time Tracking'],
    mockup: (
      <div className="hw-mock">
        <div className="hw-mock-row hw-mock-header">
          <span className="hw-mock-dot orange" />
          <strong>Driver En Route</strong>
          <span className="hw-mock-badge orange">3 mins away</span>
        </div>
        <div className="hw-mock-row"><span>Driver</span><span>Khaushal</span></div>
        <div className="hw-mock-row"><span>Items</span><span>5 garments tagged</span></div>
        <div className="hw-mock-row"><span>ETA</span><span>6:03 PM</span></div>
        <div className="hw-mock-footer">Track your driver detail in the app</div>
      </div>
    )
  },
  {
    num: '03', title: 'Clean', icon: <IconSparkle />,
    heading: 'Expert Cleaning',
    desc: 'Your items are professionally cleaned using the right products and methods for each fabric. Quality guaranteed.',
    tags: ['✓ Expert Hands', '✓ Premium Products', '✓ Quality Guarantee'],
    mockup: (
      <div className="hw-mock">
        <div className="hw-mock-row hw-mock-header">
          <span className="hw-mock-dot purple" />
          <strong>Order Status</strong>
          <span className="hw-mock-badge purple">In Progress</span>
        </div>
        <div className="hw-mock-row"><span>Suits ×3</span><span className="hw-mock-status cleaning">Cleaning</span></div>
        <div className="hw-mock-row"><span>Silk Shirts ×2</span><span className="hw-mock-status done">✓ Done</span></div>
        <div className="hw-mock-row"><span>Shoe ×1</span><span className="hw-mock-status done">✓ Done</span></div>
        <div className="hw-mock-footer">Track everything in the app</div>
      </div>
    )
  },
  {
    num: '04', title: 'Deliver', icon: <IconCheck />,
    heading: 'Back to Your Door',
    desc: 'Your freshly cleaned items are delivered back, neatly packed and ready to wear. Share your feedback and ratings on Google.',
    tags: ['✓ Neatly Packed', '✓ On-Time Delivery', '✓ Satisfaction Rated'],
    mockup: (
      <div className="hw-mock">
        <div className="hw-mock-row hw-mock-header">
          <span className="hw-mock-dot green" />
          <strong>Delivered!</strong>
          <span className="hw-mock-badge green">Complete</span>
        </div>
        <div className="hw-mock-row"><span>Items</span><span>6 returned ✓</span></div>
        <div className="hw-mock-row"><span>Quality</span><span>Verified & Packed</span></div>
        <div className="hw-mock-row"><span>Time</span><span>Within 24 hrs</span></div>
        <div className="hw-mock-footer">Rate your experience ⭐⭐⭐⭐⭐</div>
      </div>
    )
  },
]

const INTERVAL = 3500

export default function ProcessTimeline() {
  const [active, setActive] = useState(0)
  const [animKey, setAnimKey] = useState(0)

  const go = (i) => { setActive(i); setAnimKey(k => k + 1) }

  useEffect(() => {
    const t = setInterval(() => {
      setActive(i => (i + 1) % steps.length)
      setAnimKey(k => k + 1)
    }, INTERVAL)
    return () => clearInterval(t)
  }, [])

  const s = steps[active]

  return (
    <section className="hw-section" id="how-it-works">
      <div className="container">
        <div className="text-center section-head">
          <div className="section-tag">How It Works</div>
          <h2 className="hw-title">From Your Door.<br /><span className="gradient-text">Back Spotless.</span></h2>
          <p className="section-subtitle">4 simple steps — no hassle, no worries, just results.</p>
        </div>

        {/* Tab bar */}
        <div className="hw-tabs">
          {steps.map((st, i) => (
            <button key={i} className={`hw-tab${active === i ? ' active' : ''}`} onClick={() => go(i)}>
              <span className="hw-tab-num">STEP {st.num}</span>
              <span className="hw-tab-label">{st.title}</span>
              {active === i && <div className="hw-tab-bar" key={animKey} />}
            </button>
          ))}
        </div>

        {/* Content panel */}
        <div className="hw-panel" key={animKey}>
          <div className="hw-left">
            <div className="hw-icon-wrap">{s.icon}</div>
            <div className="hw-step-num">STEP {s.num}</div>
            <h3 className="hw-heading">{s.heading}</h3>
            <p className="hw-desc">{s.desc}</p>
            <div className="hw-tags">
              {s.tags.map((t, i) => <span key={i} className="hw-tag">{t}</span>)}
            </div>
          </div>
          <div className="hw-right">
            <div className="hw-num-bg">{parseInt(s.num)}</div>
            {s.mockup}
          </div>
        </div>
      </div>
    </section>
  )
}
