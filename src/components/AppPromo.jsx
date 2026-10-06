import { Capacitor } from '@capacitor/core'
import './AppPromo.css'
import shoePromoImg from '../assets/services/shoe_care.png'

const serviceTags = [
  'Dry Cleaning', 'Shoe Care', 'Curtain Cleaning', 'Bag Care',
  'Carpet Cleaning', 'Mattress Cleaning', 'Toy Cleaning',
  'Wash & Iron', 'Wash & Fold', 'Steam Press', 'Commercial Laundry',
]

const IconTruck = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1F5FFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13" rx="1"/>
    <path d="M16 8h4l3 4v5h-7V8z"/>
    <circle cx="5.5" cy="18.5" r="2.5"/>
    <circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
)
const IconClock = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
)
const IconSparkle = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
  </svg>
)
const IconBag = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 01-8 0"/>
  </svg>
)
const IconBolt = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#facc15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
)
const IconClockSm = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a5b8ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
)
const IconGift = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 12 20 22 4 22 4 12"/>
    <rect x="2" y="7" width="20" height="5" rx="1"/>
    <line x1="12" y1="22" x2="12" y2="7"/>
    <path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z"/>
    <path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/>
  </svg>
)

const highlights = [
  { icon: <IconBolt />, text: 'Same-day pickup' },
  { icon: <IconClockSm />, text: 'Real-time tracking' },
]

const phoneBenefits = [
  { icon: <IconTruck />, title: 'Free Pickup\nand Delivery' },
  { icon: <IconClock />, title: 'Same Day\nCollection' },
  { icon: <IconSparkle />, title: '11\nServices' },
  { icon: <IconBag />, title: 'Express service\navailable' },
]

export default function AppPromo() {
  // Don't show "download our app" inside the native app itself
  if (Capacitor.isNativePlatform()) return null

  return (
    <section className="app-section" id="download">
      <div className="container app-inner">

        {/* LEFT */}
        <div className="app-content">
          <div className="app-badge">
            <span className="app-badge-dot" /> NOW ON IOS &amp; ANDROID
          </div>

          <h2 className="app-headline">
            India's most complete<br />
            care app. <span className="app-highlight">11 services,</span><br />
            one tap away.
          </h2>

          <p className="app-desc">
            From premium drycleaning to everyday laundry — book, track and manage
            every order in seconds. Avail Free Pickup and Delivery service.
          </p>

          <div className="app-tags">
            {serviceTags.map((t, i) => (
              <span key={i} className="app-tag">{t}</span>
            ))}
          </div>

          <div className="app-highlights">
            {highlights.map((h, i) => (
              <span key={i} className="app-hl-item">
                <span>{h.icon}</span> {h.text}
              </span>
            ))}
          </div>

          <div className="app-promo-banner">
            <span className="promo-star"><IconGift /></span>
            <div>
              <div className="promo-title">Exclusive Sign-Up Offer</div>
              <div className="promo-sub">20% off your first order</div>
            </div>
          </div>

          <div className="store-buttons">
            <a href="#" className="store-btn store-btn-dark">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
              <div>
                <div className="store-sub">Download on the</div>
                <div className="store-name">App Store</div>
              </div>
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.hangersandbaskets.app&pcampaignid=web_share"
              target="_blank"
              rel="noopener noreferrer"
              className="store-btn store-btn-dark"
              aria-label="Get it on Google Play"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M3.18 23.76c.3.17.65.19.98.06l12.46-7.04-2.69-2.7-10.75 9.68zM.48 1.1C.18 1.42 0 1.9 0 2.53v18.94c0 .63.18 1.11.48 1.43l.08.07 10.61-10.6v-.25L.56 1.03l-.08.07zM20.1 10.52l-2.67-1.51-3 3 3 3 2.69-1.52c.77-.43.77-1.14-.02-1.97zM3.18.24L15.64 7.28l-2.69 2.69L2.2.29c.32-.13.67-.11.98-.05z"/></svg>
              <div>
                <div className="store-sub">Get it on</div>
                <div className="store-name">Google Play</div>
              </div>
            </a>
          </div>
        </div>

        {/* RIGHT — Phone mockup */}
        <div className="app-visual">
          <div className="phone-mockup">
            <div className="phone-screen">
              {/* Promo card */}
              <div className="phone-promo-card">
                <img
                  src={shoePromoImg}
                  alt="Shoe Care"
                  className="phone-promo-img"
                />
                <div className="phone-promo-text">
                  <div className="phone-promo-title">Premium Shoe Care Package</div>
                  <div className="phone-promo-sub">Deep clean &amp; restore your footwear</div>
                </div>
                <button className="phone-promo-btn">Book Now</button>
              </div>

              {/* Benefits grid */}
              <div className="phone-benefits-title">Our Essential Services &amp; Benefits</div>
              <div className="phone-benefits-grid">
                {phoneBenefits.map((b, i) => (
                  <div key={i} className="phone-benefit-cell">
                    <span className="phone-benefit-icon">{b.icon}</span>
                    <span className="phone-benefit-label">{b.title}</span>
                  </div>
                ))}
              </div>

              {/* Bottom nav */}
              <div className="phone-nav">
                {['home', 'pricing', 'order', 'invite', 'profile'].map((n, i) => (
                  <div key={i} className={`phone-nav-item ${i === 0 ? 'active' : ''}`}>{n}</div>
                ))}
              </div>
            </div>
          </div>
          <div className="phone-glow" />
        </div>

      </div>
    </section>
  )
}
