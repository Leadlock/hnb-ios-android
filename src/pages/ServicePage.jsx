import { useParams, Link } from 'react-router-dom'
import BeforeAfterCarousel from '../components/BeforeAfterCarousel'
import { useEffect, useState, useRef } from 'react'
import { services, testimonials, faqs } from '../data/data'

function SubCatItem({ cat }) {
  const [open, setOpen] = useState(false)

  // If label is empty/generic and it's a flat list, render items directly
  const isFlat = !cat.label || cat.label === 'Items'
  if (isFlat) {
    return (
      <div className="sp-subcat-item sp-subcat-flat">
        {cat.badge && <div className="sp-subcat-badge">{cat.badge}</div>}
        {cat.items.map((item, i) => (
          <div key={i} className="sp-subcat-price-row">
            <span className="sp-subcat-item-info">
              <span>{item.label}</span>
              {item.note && <span className="sp-subcat-item-note">{item.note}</span>}
            </span>
            <span className="sp-subcat-price">{item.price}</span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="sp-subcat-item">
      <button className="sp-subcat-row" onClick={() => setOpen(o => !o)}>
        <span className="sp-subcat-label">{cat.label}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          style={{ transition: 'transform 0.25s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}>
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>
      {open && (
        <div className="sp-subcat-body">
          {cat.badge && <div className="sp-subcat-badge">{cat.badge}</div>}
          {cat.items.map((item, i) => (
            <div key={i} className="sp-subcat-price-row">
              <span className="sp-subcat-item-info">
                <span>{item.label}</span>
                {item.note && <span className="sp-subcat-item-note">{item.note}</span>}
              </span>
              <span className="sp-subcat-price">{item.price}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
import PhotoQuoteCard from '../components/PhotoQuoteCard'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './ServicePage.css'

const STEP_ICONS = {
  booking: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2"/>
      <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="3"/>
    </svg>
  ),
  pickup: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="15" height="12"/>
      <path d="M16 7h4l3 4v5h-7V7z"/>
      <circle cx="5.5" cy="18.5" r="2.5"/>
      <circle cx="18.5" cy="18.5" r="2.5"/>
    </svg>
  ),
  delivery: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  inspect: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      <polyline points="11 8 11 11 13 11"/>
    </svg>
  ),
  spray: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 4h5v15a1 1 0 01-1 1H6a1 1 0 01-1-1V4z"/>
      <path d="M10 7h3l1-3h2v6h-2l-1-3h-3"/>
      <circle cx="18" cy="5" r="0.9" fill="currentColor" stroke="none"/>
      <circle cx="20" cy="9" r="0.9" fill="currentColor" stroke="none"/>
      <circle cx="21" cy="3" r="0.9" fill="currentColor" stroke="none"/>
    </svg>
  ),
  wash: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 2h10v5H7z"/>
      <path d="M7 7v13a2 2 0 002 2h6a2 2 0 002-2V7"/>
      <circle cx="11" cy="14" r="0.8" fill="currentColor" stroke="none"/>
      <circle cx="14" cy="12" r="0.8" fill="currentColor" stroke="none"/>
      <circle cx="13" cy="16" r="0.8" fill="currentColor" stroke="none"/>
    </svg>
  ),
  steam: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 15h18v4a1 1 0 01-1 1H4a1 1 0 01-1-1v-4z"/>
      <path d="M3 15l3-8h12l3 8"/>
      <path d="M8 7C8 5 9 4 9 3"/>
      <path d="M12 7C12 5 13 4 13 3"/>
      <path d="M16 7C16 5 17 4 17 3"/>
    </svg>
  ),
  dry: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C12 2 5 9 5 14a7 7 0 0014 0c0-5-7-12-7-12z"/>
      <path d="M9 17q1.5-1.5 3-1.5t3 1.5"/>
    </svg>
  ),
  pack: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
      <line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>
  ),
  tool: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
    </svg>
  ),
  condition: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
      <line x1="4" y1="22" x2="4" y2="15"/>
    </svg>
  ),
  sort: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="6" x2="20" y2="6"/>
      <line x1="4" y1="12" x2="14" y2="12"/>
      <line x1="4" y1="18" x2="9" y2="18"/>
    </svg>
  ),
  sanitize: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <polyline points="9 12 11 14 15 10"/>
    </svg>
  ),
  track: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
    </svg>
  ),
  generic: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="2.5"/>
    </svg>
  ),
}

function getStepIcon(title) {
  const t = title.toLowerCase()
  if (t.includes('book')) return STEP_ICONS.booking
  if (t.includes('deliver')) return STEP_ICONS.delivery
  if (t.includes('pickup') || t.includes('pick up') || t.includes('bulk')) return STEP_ICONS.pickup
  if (t.includes('uv')) return STEP_ICONS.sanitize
  if (t.includes('track')) return STEP_ICONS.track
  if (t.includes('steam') || t.includes('iron') || t.includes('press') || t.includes('wrinkle') || t.includes('seam')) return STEP_ICONS.steam
  if (t.includes('dry') || t.includes('cool')) return STEP_ICONS.dry
  if (t.includes('inspect') || t.includes('assess') || t.includes('analy') || t.includes('check')) return STEP_ICONS.inspect
  if (t.includes('hypo') || t.includes('mite') || t.includes('spray') || t.includes('treat') || t.includes('dust') || t.includes('deodor') || t.includes('extract') || t.includes('vacuum')) return STEP_ICONS.spray
  if (t.includes('wash') || t.includes('bath') || t.includes('clean') || t.includes('shampoo') || t.includes('sanit')) return STEP_ICONS.wash
  if (t.includes('condition') || t.includes('polish') || t.includes('soften') || t.includes('sole') || t.includes('upper')) return STEP_ICONS.condition
  if (t.includes('sort') || t.includes('color') || t.includes('colour') || t.includes('fold') || t.includes('temp')) return STEP_ICONS.sort
  if (t.includes('pack') || t.includes('shape') || t.includes('preserv') || t.includes('new')) return STEP_ICONS.pack
  if (t.includes('remov') || t.includes('refit') || t.includes('prep') || t.includes('assembl') || t.includes('tool')) return STEP_ICONS.tool
  return STEP_ICONS.generic
}

import dryCleaningIcon from '../assets/icons/dry_cleaning.svg'
import washFoldIcon from '../assets/icons/wash_fold.svg'
import washIronIcon from '../assets/icons/wash_iron.svg'
import shoeIcon from '../assets/icons/shoe_care.svg'
import bagIcon from '../assets/icons/bag_care.svg'
import carpetIcon from '../assets/icons/carpet_cleaning.svg'
import curtainIcon from '../assets/icons/curtain_cleaning.svg'
import mattressIcon from '../assets/icons/mattress_cleaning.svg'
import toyIcon from '../assets/icons/toy_cleaning.svg'
import strollerIcon from '../assets/icons/stroller_cleaning.svg'
import babyCarSeatIcon from '../assets/icons/baby_car_seat.svg'
import commercialLaundryIcon from '../assets/icons/commercial_laundry.svg'

import steamPressingIcon from '../assets/icons/steam_pressing.svg'
import shoecareVideo from '../assets/Shoecare.mp4'

const iconMap = {
  'dry-cleaning': dryCleaningIcon,
  'wash-fold': washFoldIcon,
  'wash-iron': washIronIcon,
  'steam-pressing': steamPressingIcon,
  'shoe-care': shoeIcon,
  'bag-care': bagIcon,
  'carpet-cleaning': carpetIcon,
  'curtain-cleaning': curtainIcon,
  'mattress-cleaning': mattressIcon,
  'toy-cleaning': toyIcon,
  'stroller-cleaning': strollerIcon,
  'baby-car-seat': babyCarSeatIcon,
  'commercial-laundry': commercialLaundryIcon,
}

// Process-step icons live in public/process-icons/<folder>/<step-number>.svg
const PROCESS_ICON_FOLDER = {
  'dry-cleaning': 'dry-cleaning',
  'shoe-care': 'shoe-cleaning',
  'curtain-cleaning': 'curtain-cleaning',
  'bag-care': 'leather-bags',
  'carpet-cleaning': 'carpet-sofa',
  'mattress-cleaning': 'bedding',
  'toy-cleaning': 'toy-care',
  'stroller-cleaning': 'toy-care',
  'baby-car-seat': 'toy-care',
  'wash-iron': 'wash-iron',
  'wash-fold': 'wash-fold',
  'steam-pressing': 'steam-pressing',
  'commercial-laundry': 'commercial-laundry',
}

import indHospitality from '../assets/services/ind_hospitality.png'
import indSalon from '../assets/services/ind_salon.png'
import indClinic from '../assets/services/ind_clinic.png'
import indLabs from '../assets/services/ind_labs.png'
import indGym from '../assets/services/ind_gym.png'
import indRestaurant from '../assets/services/ind_restaurant.png'

import shoeSneaker from '../assets/shoe-types/sneaker.png'
import shoeLeather from '../assets/shoe-types/leather-shoe.png'
import shoeLuxury from '../assets/shoe-types/luxury-designer.jpg'
import shoeBoots from '../assets/shoe-types/boots-heels.png'
import shoeSuede from '../assets/shoe-types/suede-nubuck.png'
import shoeSports from '../assets/shoe-types/sports-athletic.png'

import bagHandbags from '../assets/bag-types/handbags.png'
import bagLeather from '../assets/bag-types/leather-bags.png'
import bagLuxury from '../assets/bag-types/luxury-designer.png'
import bagBackpacks from '../assets/bag-types/backpacks-totes.png'
import bagClutches from '../assets/bag-types/clutches-evening.png'
import bagTravel from '../assets/bag-types/travel-luggage.png'

const shoeTypes = [
  {
    title: 'Sneakers',
    desc: 'Nike, Adidas, Jordan, New Balance, Yeezy all cleaned to factory fresh.',
    img: shoeSneaker,
    features: ['Sole brightening', 'Midsole cleaning', 'Lace whitening'],
    icon: shoeIcon,
    iconBg: '#FEF3C7',
    iconColor: '#D97706',
  },
  {
    title: 'Leather Shoes',
    desc: 'Oxford, brogues, loafers deep cleaned, conditioned and polished.',
    img: shoeLeather,
    features: ['Deep conditioning', 'Colour restoration', 'Waterproofing'],
    icon: shoeIcon,
    iconBg: '#EFF6FF',
    iconColor: '#2563EB',
  },
  {
    title: 'Luxury & Designer',
    desc: 'Gucci, LV, Balenciaga, Louboutin handled by certified luxury specialists.',
    img: shoeLuxury,
    features: ['Specialist assessment', 'Gentle hand cleaning', 'Premium protection'],
    icon: shoeIcon,
    iconBg: '#FEF9C3',
    iconColor: '#B45309',
  },
  {
    title: 'Boots & Heels',
    desc: 'Ankle boots, Chelsea, heels full cleaning and heel restoration.',
    img: shoeBoots,
    features: ['Inside deodorizing', 'Heel restoration', 'Suede care'],
    icon: shoeIcon,
    iconBg: '#F0FDF4',
    iconColor: '#16A34A',
  },
  {
    title: 'Suede & Nubuck',
    desc: 'Ultra-delicate specialist treatment for suede and nubuck materials.',
    img: shoeSuede,
    features: ['Specialist cleaner', 'Nap restoration', 'Stain removal'],
    icon: shoeIcon,
    iconBg: '#EFF6FF',
    iconColor: '#7C3AED',
  },
  {
    title: 'Sports & Athletic',
    desc: 'Running shoes, cleats, football boots thorough inside and out.',
    img: shoeSports,
    features: ['Deodorizing treatment', 'Sole scrubbing', 'Mesh cleaning'],
    icon: shoeIcon,
    iconBg: '#FEF3C7',
    iconColor: '#EA580C',
  },
]

const bagTypes = [
  {
    title: 'Handbags',
    desc: 'Structured totes, satchels and everyday bags restored to carry-worthy condition.',
    img: bagHandbags,
    features: ['Interior deep clean', 'Handle conditioning', 'Hardware polishing'],
    icon: bagIcon,
    iconBg: '#FEF3C7',
    iconColor: '#D97706',
  },
  {
    title: 'Leather Bags',
    desc: 'Full-grain, top-grain and bonded leather deep cleaned, conditioned and rejuvenated.',
    img: bagLeather,
    features: ['Deep conditioning', 'Colour restoration', 'Scratch minimising'],
    icon: bagIcon,
    iconBg: '#EFF6FF',
    iconColor: '#2563EB',
  },
  {
    title: 'Luxury & Designer',
    desc: 'Chanel, Louis Vuitton, Gucci, Prada, Hermès handled by certified luxury specialists.',
    img: bagLuxury,
    features: ['Specialist assessment', 'Gentle hand cleaning', 'Brand-specific care'],
    icon: bagIcon,
    iconBg: '#FEF9C3',
    iconColor: '#B45309',
  },
  {
    title: 'Backpacks & Totes',
    desc: 'Laptop bags, school backpacks, gym totes fully cleaned inside and out.',
    img: bagBackpacks,
    features: ['Full interior clean', 'Zipper treatment', 'Strap deodorizing'],
    icon: bagIcon,
    iconBg: '#F0FDF4',
    iconColor: '#16A34A',
  },
  {
    title: 'Clutches & Evening Bags',
    desc: 'Delicate satin, beaded and embellished evening bags specialist ultra-gentle care.',
    img: bagClutches,
    features: ['Ultra-gentle treatment', 'Embellishment care', 'Lining refresh'],
    icon: bagIcon,
    iconBg: '#EFF6FF',
    iconColor: '#7C3AED',
  },
  {
    title: 'Travel & Luggage',
    desc: 'Duffel bags, trolley bags, weekenders thorough inside and out deep clean.',
    img: bagTravel,
    features: ['Interior sanitizing', 'Wheel & frame clean', 'Fabric deodorizing'],
    icon: bagIcon,
    iconBg: '#FEF3C7',
    iconColor: '#EA580C',
  },
]

function ItemTypesSection({ title, subtitle, items, accent }) {
  return (
    <section className="sp-section sp-item-types-sec">
      <div className="container">
        <div className="text-center section-head">
          <div className="section-tag">We Care For</div>
          <h2 className="section-title" style={{ marginTop: 8 }}>{title}</h2>
          <p className="section-subtitle">{subtitle}</p>
        </div>
        <div className="sp-types-grid">
          {items.map((item, i) => (
            <div key={i} className={`sp-type-card${item.featured ? ' sp-type-card--featured' : ''}`} style={item.featured ? { '--card-accent': accent } : {}}>
              <div className="sp-type-img-wrap">
                <img src={item.img} alt={item.title} className="sp-type-img" />
              </div>
              <div className="sp-type-body">
                <h3 className="sp-type-title">{item.title}</h3>
                <p className="sp-type-desc">{item.desc}</p>
                <ul className="sp-type-features">
                  {item.features.map((f, j) => (
                    <li key={j}>{f}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const industries = [
  {
    title: 'Hospitality & Housekeeping',
    desc: 'We dry-iron and steam linens for crisp, fresh guest experience.',
    img: indHospitality,
  },
  {
    title: 'Salons & Spa',
    desc: 'We thoroughly clean and disinfect towels, robes, and capes for a safe, fresh client experience.',
    img: indSalon,
  },
  {
    title: 'Clinics & Medical Centres',
    desc: 'We professionally clean and disinfect medical linens and scrubs for a sterile, safe environment.',
    img: indClinic,
  },
  {
    title: 'Labs',
    desc: 'We clean and disinfect lab coats, uniforms, and towels to meet standards and ensure hygiene.',
    img: indLabs,
  },
  {
    title: 'Gyms & Fitness Studios',
    desc: 'We sanitise and deodorise towels and linens for a fresh, safe workout.',
    img: indGym,
  },
  {
    title: 'Restaurants & Catering',
    desc: 'We remove stains and sanitise linens to keep them pristine and ready.',
    img: indRestaurant,
  },
]

function IndustriesSection() {
  const [active, setActive] = useState(0)
  const [cardW, setCardW] = useState(0)
  const timer = useRef(null)
  const trackRef = useRef(null)
  const n = industries.length

  const startTimer = (currentActive) => {
    clearInterval(timer.current)
    timer.current = setInterval(() => setActive(i => (i + 1) % n), 3000)
  }

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        const first = trackRef.current.querySelector('.ind-card')
        if (first) setCardW(first.getBoundingClientRect().width)
      }
    }
    // Delay to ensure cards are rendered
    const raf = requestAnimationFrame(() => { measure() })
    window.addEventListener('resize', measure)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', measure) }
  }, [])

  const go = (next) => {
    const idx = (next + n) % n
    setActive(idx)
    startTimer(idx)
  }

  useEffect(() => {
    startTimer(0)
    return () => clearInterval(timer.current)
  }, [])

  const doubled = [...industries, ...industries]
  const step = cardW + 14

  return (
    <section className="sp-section sp-industries-sec">
      <div className="container">
        <div className="text-center section-head">
          <h2 className="section-title">Laundry Care <span style={{color:'#0ea5e9'}}>Across</span> Industries</h2>
        </div>
        <div className="ind-viewport">
          <div
            ref={trackRef}
            className="ind-track"
            style={{ transform: `translateX(${-active * step}px)` }}
          >
            {doubled.map((ind, i) => {
              const isCenter = i === active + 2
              return (
                <div key={i} className={`ind-card${isCenter ? ' ind-card--center' : ''}`}>
                  <img src={ind.img} alt={ind.title} className="ind-img" />
                  <div className="ind-overlay" />
                  <div className="ind-body">
                    <h3 className="ind-title">{ind.title}</h3>
                    <p className="ind-desc">{ind.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="ind-dots">
          {industries.map((_, i) => (
            <span key={i} className={`ind-dot${i === active ? ' active' : ''}`} onClick={() => go(i)} />
          ))}
        </div>
      </div>
    </section>
  )
}

// Map service page slug → { key: DB service_type, cat?: string | string[] to whitelist subcategories }
const SLUG_TO_SERVICE_KEY = {
  'dry-cleaning':      { key: 'Dry Cleaning' },
  'wash-fold':         { key: 'Wash & Fold' },
  'wash-iron':         { key: 'Wash & Iron' },
  'steam-pressing':    { key: 'Steam Press' },
  'shoe-care':         { key: 'Shoe Cleaning' },
  'bag-care':          { key: 'Bag Cleaning' },
  'carpet-cleaning':   { key: 'Carpet, Sofa & Chairs' },
  'curtain-cleaning':  { key: 'Curtain, Bedding Linens & Towel & Baths', cat: 'Curtain Cleaning' },
  'mattress-cleaning': { key: 'Curtain, Bedding Linens & Towel & Baths', cat: ['Bedding & Linens', 'Towel & Bath'] },
  'toy-cleaning':      { key: 'Toy & Baby Care', cat: 'Toy & Baby Care' },
  'commercial-laundry': { key: 'Commercial Laundry' },
}

function apiToServicePricing(serviceData, filterCat) {
  const allowed = filterCat ? (Array.isArray(filterCat) ? filterCat : [filterCat]) : null
  return Object.entries(serviceData)
    .filter(([catLabel]) => !allowed || allowed.includes(catLabel))
    .map(([catLabel, items]) => ({
      label: catLabel || null,
      items: items.map(item => ({ label: item.label, price: item.priceDisplay })),
    }))
}

const RELATED_ORDER = [
  'dry-cleaning', 'shoe-care', 'curtain-cleaning', 'bag-care',
  'carpet-cleaning', 'mattress-cleaning', 'toy-cleaning',
  'wash-iron', 'wash-fold', 'steam-pressing', 'commercial-laundry',
]

export default function ServicePage() {
  const { serviceId } = useParams()
  const service = services.find(s => s.id === serviceId)
  const [liveCategories, setLiveCategories] = useState(null)

  useEffect(() => { window.scrollTo(0, 0) }, [serviceId])

  useEffect(() => {
    const entry = SLUG_TO_SERVICE_KEY[serviceId]
    if (!entry) return
    fetch('/api/pricing')
      .then(r => r.json())
      .then(d => {
        if (d.success && d.data[entry.key]) {
          setLiveCategories(apiToServicePricing(d.data[entry.key], entry.cat))
        }
      })
      .catch(() => {})
  }, [serviceId])

  if (!service) return (
    <>
      <Header />
      <div style={{textAlign:'center',padding:'160px 24px'}}>
        <h2>Service not found</h2>
        <Link to="/" className="btn btn-primary" style={{marginTop:20,display:'inline-flex'}}>← Back Home</Link>
      </div>
      <Footer />
    </>
  )

  const svcMap = Object.fromEntries(services.map(s => [s.id, s]))
  const orderedServices = RELATED_ORDER.map(id => svcMap[id]).filter(Boolean)
  const currentIdx = orderedServices.findIndex(s => s.id === service.id)
  const pool = orderedServices.filter(s => s.id !== service.id)
  // Build related: 2 before + 2 after, wrapping around, capped to available
  const before = []
  const after = []
  if (currentIdx !== -1) {
    for (let i = 1; i <= 2; i++) {
      const idx = (currentIdx - i + orderedServices.length) % orderedServices.length
      if (orderedServices[idx].id !== service.id) before.unshift(orderedServices[idx])
    }
    for (let i = 1; i <= 2; i++) {
      const idx = (currentIdx + i) % orderedServices.length
      if (orderedServices[idx].id !== service.id) after.push(orderedServices[idx])
    }
  }
  const combined = [...before, ...after]
  // If we got duplicates due to small list, dedupe
  const seen = new Set()
  const related = combined.filter(s => { if (seen.has(s.id)) return false; seen.add(s.id); return true }).slice(0, 4)

  const bookingWaHref = service.id === 'commercial-laundry'
    ? 'https://wa.me/917045110011?text=' + encodeURIComponent('Hi, I wanted to know more about your Commercial Laundry offerings.')
    : 'https://wa.me/917045110077?text=Hi'

  return (
    <>
      <Header />
      <main className="sp-main">

        {/* Hero Banner */}
        <section className="sp-hero" style={{'--accent': service.accent}}>
          <div className="sp-hero-bg" style={{backgroundImage:`url(${service.image})`}}></div>
          <div className="sp-hero-overlay"></div>
          <div className="container sp-hero-inner">
            <div className="sp-hero-left">
              <div className="sp-breadcrumb">
                <Link to="/">Home</Link> / <Link to="/#services">Services</Link> / <span>{service.title}</span>
              </div>
              <div className="sp-hero-icon">
                <img src={iconMap[service.id]} alt={service.title} />
              </div>
              <h1 className="sp-hero-title">{service.title}</h1>
              <p className="sp-hero-sub">{service.longDesc}</p>
              <div className="sp-hero-actions">
                <a href={bookingWaHref} target="_blank" rel="noreferrer" className="btn btn-primary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.553 4.103 1.523 5.824L.057 23.882a.5.5 0 00.606.63l6.288-1.652A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.698-.504-5.248-1.385l-.376-.217-3.892 1.022 1.04-3.793-.232-.389A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                  Book Now — Free Pickup
                </a>
                <a href="tel:+97180012345" className="btn btn-outline-white">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.21 2.2z"/></svg>
                  Call Us
                </a>
              </div>
            </div>
            {service.id === 'shoe-care' && (
              <div className="sp-hero-right">
                <div className="sp-video-frame">
                  <div className="sp-video-inner">
                    <video
                      src={shoecareVideo}
                      className="sp-video-poster"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Details & Benefits */}
        <section className="sp-section">
          <div className="container sp-two-col">
            <div>
              <div className="section-tag">What's Included</div>
              <h2 className="section-title" style={{marginTop:8}}>Service <span className="gradient-text">Benefits</span></h2>
              <ul className="benefit-list">
                {service.benefits.map((b, i) => (
                  <li key={i} className="benefit-item">
                    <span className="benefit-check">✓</span> {b}
                  </li>
                ))}
              </ul>
            </div>
            {service.carouselImages?.length
              ? <BeforeAfterCarousel images={service.carouselImages} />
              : (
                <div className="before-after-grid">
                  <div className="ba-card">
                    <div className="ba-label before">Before</div>
                    <img src={service.beforeImg || service.heroImage} alt="Before cleaning" />
                  </div>
                  <div className="ba-card">
                    <div className="ba-label after">After</div>
                    <img src={service.afterImg || service.image} alt="After cleaning" />
                  </div>
                </div>
              )
            }
          </div>
        </section>

        {/* Shoe Types */}
        {service.id === 'shoe-care' && (
          <ItemTypesSection
            title={<>Any Shoe, Any Brand, <span className="gradient-text">Any Condition</span></>}
            subtitle="From everyday trainers to rare collectibles, handled with precision."
            items={shoeTypes}
            accent={service.accent}
          />
        )}

        {/* Bag Types */}
        {service.id === 'bag-care' && (
          <ItemTypesSection
            title={<>Any Bag, Any Brand, <span className="gradient-text">Any Condition</span></>}
            subtitle="From daily carry to rare collectibles every bag handled with the precision it deserves."
            items={bagTypes}
            accent={service.accent}
          />
        )}

        {/* Industries — commercial laundry only */}
        {service.id === 'commercial-laundry' && <IndustriesSection />}

        {/* Pricing */}
        <section className="sp-section sp-pricing-sec">
          <div className="container">
            <div className="text-center section-head">
              {service.id !== 'commercial-laundry' && (
                <>
                  <div className="section-tag">Pricing</div>
                  <h2 className="section-title">Simple, <span className="gradient-text">Transparent Pricing</span></h2>
                </>
              )}
              {service.id === 'commercial-laundry' && null}
              {service.id === 'dry-cleaning' && (
                <p className="section-subtitle">Our skilled professionals will expertly clean and care for your delicate fabrics, formal wear, and special garments. Enjoy the convenience of doorstep dry cleaning and laundry service that ensures exceptional results every time.</p>
              )}
              {service.id === 'carpet-cleaning' && (
                <p className="section-subtitle">Give your carpets and Sofa a fresh lease of life with our professional Carpet and Sofa Care service. Our team uses most advanced equipment and effective cleaning methods to remove dirt, stains, and Odors from your carpets, Sofa & More.</p>
              )}
              {service.id === 'toy-cleaning' && (
                <p className="section-subtitle">Is your child's favourite toy & Accessories as clean as you think? Gentle, hygienic deep cleaning for stuffed animals, plushies, soft toys, Stroller, Car Seats & more.</p>
              )}
              {service.id === 'mattress-cleaning' && (
                <p className="section-subtitle">We effectively remove dust, stains, and allergies from fabric without compromising its quality thanks to our chemical-free detergents and the most advanced cleaning techniques.</p>
              )}
              {service.id === 'curtain-cleaning' && (
                <p className="section-subtitle">We effectively remove dust, stains, and allergies from fabric without compromising its quality thanks to our chemical-free detergents and the most advanced cleaning techniques.</p>
              )}
              {service.id === 'bag-care' && (
                <p className="section-subtitle">From everyday handbags to limited-edition luxury pieces we clean, restore and condition them to look brand new.</p>
              )}
              {service.id === 'shoe-care' && (
                <p className="section-subtitle">Revive and refresh your favourite footwear and accessories with our doorstep Shoe Cleaning service. Our specialized techniques will have your shoes looking as good as new.</p>
              )}
              {service.id === 'steam-pressing' && (
                <p className="section-subtitle">Say goodbye to wrinkles and hello to perfectly pressed clothes. Get your garments looking their best in no time with our professional Steam Press Service.</p>
              )}
              {(service.id === 'wash-iron' || service.id === 'wash-fold') && (
                <p className="section-subtitle">Enjoy the convenience and affordability of our WASH by Kilo service, right at your doorstep. We accept your clothes based on their weight, allowing you to pay per kilo. Our precise scales ensure accurate measurements and fair pricing, giving you control over your laundry costs.</p>
              )}
              {service.id !== 'commercial-laundry' && service.id !== 'dry-cleaning' && service.id !== 'wash-iron' && service.id !== 'wash-fold' && service.id !== 'steam-pressing' && service.id !== 'shoe-care' && service.id !== 'bag-care' && service.id !== 'curtain-cleaning' && service.id !== 'carpet-cleaning' && service.id !== 'mattress-cleaning' && service.id !== 'toy-cleaning' && (
                <p className="section-subtitle">No hidden fees. Free pickup & delivery included on all orders above INR 499.</p>
              )}
            </div>
            <div className="sp-subcat-list">
              {service.id !== 'commercial-laundry' && (liveCategories?.length ? liveCategories : service.pricingCategories).map((cat, i) => (
                <SubCatItem key={i} cat={cat} />
              ))}
            </div>
            <PhotoQuoteCard
              serviceId={service.id}
              serviceTitle={service.title}
              iconSrc={iconMap[service.id]}
            />
          </div>
        </section>

        {/* Process */}
        <section className="sp-section sp-process-sec">
          <div className="container">
            <div className="text-center section-head">
              <div className="section-tag">Our Process</div>
              <h2 className="section-title">How We <span className="gradient-text">Handle Your Items</span></h2>
            </div>
            <div className="sp-process-grid">
              {service.process.map((step, i) => (
                <div key={i} className="sp-step">
                  <div className="sp-step-icon">
                    <img src={`/process-icons/${PROCESS_ICON_FOLDER[service.id]}/${i + 1}.svg`} alt="" aria-hidden="true" />
                  </div>
                  <div className="sp-step-body">
                    <p className="sp-step-title">{step.title}</p>
                    <p className="sp-step-desc">{step.desc}</p>
                  </div>
                  <span className="sp-step-num">{i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* FAQs */}
        <section className="sp-section">
          <div className="container" style={{maxWidth:800}}>
            <div className="text-center section-head">
              <div className="section-tag">FAQ</div>
              <h2 className="section-title">Common <span className="gradient-text">Questions</span></h2>
            </div>
            <div className="sp-faq-list">
              {faqs.slice(0, 5).map((f, i) => (
                <details key={i} className="sp-faq-item">
                  <summary className="sp-faq-q">{f.q}</summary>
                  <p className="sp-faq-a">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Related Services */}
        <section className="sp-section sp-related-sec">
          <div className="container">
            <div className="text-center section-head">
              <div className="section-tag">Explore More</div>
              <h2 className="section-title">Related <span className="gradient-text">Services</span></h2>
            </div>
            <div className="sp-related-grid">
              {related.map(s => (
                <Link key={s.id} to={`/services/${s.id}`} className="sp-related-card">
                  <img src={s.image} alt={s.title} />
                  <div className="sp-related-body">
                    <span className="sp-related-icon">
                      <img src={iconMap[s.id]} alt={s.title} />
                    </span>
                    <h4>{s.title}</h4>
                    <p>{s.description}</p>
                    <span className="sp-related-price">From {s.price}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Booking CTA */}
        <section className="sp-booking-cta" style={{background:`linear-gradient(135deg, #0A1628, ${service.accent})`}}>
          <div className="container text-center">
            <h2 style={{color:'white',fontSize:'clamp(24px,4vw,40px)',fontWeight:800,marginBottom:12}}>
              Ready to Book {service.title}?
            </h2>
            <p style={{color:'rgba(255,255,255,0.75)',fontSize:17,marginBottom:32,maxWidth:500,margin:'0 auto 32px'}}>
              Free pickup & delivery. Professional results guaranteed.
            </p>
            <div style={{display:'flex',gap:16,justifyContent:'center',flexWrap:'wrap'}}>
              <a href={bookingWaHref} target="_blank" rel="noreferrer" className="btn btn-primary" style={{fontSize:16,padding:'16px 36px'}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.553 4.103 1.523 5.824L.057 23.882a.5.5 0 00.606.63l6.288-1.652A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.698-.504-5.248-1.385l-.376-.217-3.892 1.022 1.04-3.793-.232-.389A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                Book Now — Free Pickup
              </a>
              <Link to="/services" className="btn btn-outline-white">← All Services</Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
