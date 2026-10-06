import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Capacitor } from '@capacitor/core'
import { StatusBar, Style } from '@capacitor/status-bar'
import './Header.css'
import logoImg from '../assets/logo.png'

import dryCleaningIcon from '../assets/icons/dry_cleaning.svg'
import washIronIcon from '../assets/icons/wash_iron.svg'
import washFoldIcon from '../assets/icons/wash_fold.svg'
import shoeIcon from '../assets/icons/shoe_care.svg'
import bagIcon from '../assets/icons/bag_care.svg'
import curtainIcon from '../assets/icons/curtain_cleaning.svg'
import carpetIcon from '../assets/icons/carpet_cleaning.svg'
import mattressIcon from '../assets/icons/mattress_cleaning.svg'
import toyIcon from '../assets/icons/toy_cleaning.svg'

import steamPressingIcon from '../assets/icons/steam_pressing.svg'
import freeDeliveryIcon from '../assets/icons/free_delivery.svg'
import commercialLaundryIcon from '../assets/icons/commercial_laundry.svg'
import jobsIcon from '../assets/icons/jobs.svg'
import franchiseIcon from '../assets/icons/franchise_enquiry.svg'

const dropdownServices = [
  { icon: dryCleaningIcon,       label: 'Dry Cleaning',              id: 'dry-cleaning',       isSvg: true },
  { icon: shoeIcon,              label: 'Shoe Cleaning',             id: 'shoe-care',          isSvg: true },
  { icon: curtainIcon,           label: 'Curtain Cleaning',          id: 'curtain-cleaning',   isSvg: true },
  { icon: bagIcon,               label: 'Leather & Bags Care',       id: 'bag-care',           isSvg: true },
  { icon: carpetIcon,            label: 'Carpet & Sofa Care',        id: 'carpet-cleaning',    isSvg: true },
  { icon: mattressIcon,          label: 'Bedding & Home Linens Care',id: 'mattress-cleaning',  isSvg: true },
  { icon: toyIcon,               label: 'Toy & Baby Care',           id: 'toy-cleaning',       isSvg: true },
  { icon: washIronIcon,          label: 'Wash & Iron',               id: 'wash-iron',          isSvg: true },
  { icon: washFoldIcon,          label: 'Wash & Fold',               id: 'wash-fold',          isSvg: true },
  { icon: steamPressingIcon,     label: 'Steam Pressing',            id: 'steam-pressing',     isSvg: true },
  { icon: commercialLaundryIcon, label: 'Commercial Laundry',        id: 'commercial-laundry', isSvg: true },
]

export default function Header() {
  const [scrolled, setScrolled]           = useState(false)
  const [menuOpen, setMenuOpen]           = useState(false)
  const [dropOpen, setDropOpen]           = useState(false)
  const [dropClosing, setDropClosing]     = useState(false)
  const [aboutOpen, setAboutOpen]         = useState(false)
  const [aboutClosing, setAboutClosing]   = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [mobileAboutOpen, setMobileAboutOpen]       = useState(false)
  const closeTimer                  = useRef(null)
  const aboutTimer                  = useRef(null)
  const dropRef                     = useRef(null)
  const aboutRef                    = useRef(null)
  const location                    = useLocation()
  const navigate                    = useNavigate()

  const handleFAQClick = (e) => {
    e.preventDefault()
    setMenuOpen(false)
    if (location.pathname === '/') {
      document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/')
      setTimeout(() => {
        document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })
      }, 150)
    }
  }

  const openDrop  = () => { clearTimeout(closeTimer.current); setDropClosing(false); setDropOpen(true) }
  const closeDrop = () => {
    setDropClosing(true)
    closeTimer.current = setTimeout(() => { setDropOpen(false); setDropClosing(false) }, 160)
  }
  const openAbout  = () => { clearTimeout(aboutTimer.current); setAboutClosing(false); setAboutOpen(true) }
  const closeAbout = () => {
    setAboutClosing(true)
    aboutTimer.current = setTimeout(() => { setAboutOpen(false); setAboutClosing(false) }, 160)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Header flips from a dark hero overlay to a white bar on scroll — keep the
  // native status bar's icon color in sync so it stays readable either way.
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return
    StatusBar.setStyle({ style: scrolled ? Style.Dark : Style.Light }).catch(() => {})
  }, [scrolled])

  useEffect(() => { setMenuOpen(false); setDropOpen(false); setDropClosing(false); setAboutOpen(false); setAboutClosing(false); setMobileServicesOpen(false); setMobileAboutOpen(false) }, [location])

  useEffect(() => {
    const onClick = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) closeDrop()
      if (aboutRef.current && !aboutRef.current.contains(e.target)) closeAbout()
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-inner">

        <Link to="/" className="logo">
          <img src={logoImg} alt="Hangers & Basket" className="logo-img" />
          <span>Hangers &amp; <strong>Basket</strong></span>
        </Link>

        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
          <a href="/" className="nav-link" onClick={() => setMenuOpen(false)}>Home</a>

          {/* Services with dropdown */}
          <div className="nav-drop-wrap" ref={dropRef}
            onMouseEnter={openDrop}
            onMouseLeave={closeDrop}
          >
            <button
              className={`nav-link nav-drop-btn ${dropOpen || mobileServicesOpen ? 'active' : ''}`}
              onClick={() => setMobileServicesOpen(o => !o)}
            >
              Services
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"
                style={{ marginLeft: 4, transition: 'transform 0.2s', transform: (dropOpen || mobileServicesOpen) ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                <path d="M7 10l5 5 5-5z"/>
              </svg>
            </button>

            {/* Desktop floating dropdown */}
            {dropOpen && (
              <div className={`nav-dropdown${dropClosing ? ' closing' : ''}`}>
                <div className="nd-grid">
                  {dropdownServices.map((s, i) => (
                    <Link key={i} to={`/services/${s.id}`} className="nd-item" onClick={() => setDropOpen(false)}>
                      <span className="nd-icon">
                        {s.isSvg ? <img src={s.icon} alt={s.label} className="nd-svg" /> : s.icon}
                      </span>
                      <span className="nd-label">{s.label}</span>
                    </Link>
                  ))}
                </div>
                <div className="nd-footer">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <img src={freeDeliveryIcon} alt="Free Delivery" style={{ width: 18, height: 18 }} />
                    <span>Free pickup &amp; delivery — every order, always</span>
                  </div>
                  <Link to="/services" className="nd-all" onClick={() => setDropOpen(false)}>All Services →</Link>
                </div>
              </div>
            )}

            {/* Mobile inline expand */}
            {mobileServicesOpen && (
              <div className="nav-mobile-expand">
                {dropdownServices.map((s, i) => (
                  <Link
                    key={i}
                    to={`/services/${s.id}`}
                    className="nav-mobile-link"
                    onClick={() => { setMobileServicesOpen(false); setMenuOpen(false) }}
                  >
                    <span className="nav-mobile-icon">
                      {s.isSvg ? <img src={s.icon} alt={s.label} className="nav-mobile-svg" /> : s.icon}
                    </span>
                    <span className="nav-mobile-text">{s.label}</span>
                  </Link>
                ))}
                <Link
                  to="/services"
                  className="nav-mobile-link nav-mobile-link--all"
                  onClick={() => { setMobileServicesOpen(false); setMenuOpen(false) }}
                >
                  <span className="nav-mobile-text">View All Services →</span>
                </Link>
              </div>
            )}
          </div>

          <Link to="/pricing" className="nav-link" onClick={() => setMenuOpen(false)}>Pricing</Link>
          <Link to="/plans" className="nav-link" onClick={() => setMenuOpen(false)}>Promos &amp; Offers</Link>
          <a href="/#faq" className="nav-link" onClick={handleFAQClick}>FAQs</a>

          {/* About Us dropdown */}
          <div className="nav-drop-wrap" ref={aboutRef} onMouseEnter={openAbout} onMouseLeave={closeAbout}>
            <button className={`nav-link nav-drop-btn ${aboutOpen || mobileAboutOpen ? 'active' : ''}`}
              onClick={() => setMobileAboutOpen(o => !o)}>
              More
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"
                style={{ marginLeft: 4, transition: 'transform 0.2s', transform: (aboutOpen || mobileAboutOpen) ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                <path d="M7 10l5 5 5-5z"/>
              </svg>
            </button>

            {/* Desktop floating dropdown */}
            {aboutOpen && (
              <div className={`nav-dropdown nav-dropdown-sm${aboutClosing ? ' closing' : ''}`}>
                <Link to="/terms" className="nd-item" onClick={() => setAboutOpen(false)}>
                  <span className="nd-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                  </span>
                  <span>
                    <span className="nd-label">Terms &amp; Conditions</span>
                    <span className="nd-price">Legal &amp; policies</span>
                  </span>
                </Link>
                <Link to="/jobs" className="nd-item" onClick={() => setAboutOpen(false)}>
                  <span className="nd-icon"><img src={jobsIcon} alt="Jobs" className="nd-svg" /></span>
                  <span>
                    <span className="nd-label">Jobs</span>
                    <span className="nd-price">Join our team</span>
                  </span>
                </Link>
                <Link to="/franchise" className="nd-item" onClick={() => setAboutOpen(false)}>
                  <span className="nd-icon"><img src={franchiseIcon} alt="Franchise Enquiry" className="nd-svg" /></span>
                  <span>
                    <span className="nd-label">Franchise Enquiry</span>
                    <span className="nd-price">Own a franchise</span>
                  </span>
                </Link>
              </div>
            )}

            {/* Mobile inline expand */}
            {mobileAboutOpen && (
              <div className="nav-mobile-expand">
                <Link to="/terms" className="nav-mobile-link" onClick={() => { setMobileAboutOpen(false); setMenuOpen(false) }}>
                  <span className="nav-mobile-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                  </span>
                  <span className="nav-mobile-text">Terms &amp; Conditions</span>
                </Link>
                <Link to="/jobs" className="nav-mobile-link" onClick={() => { setMobileAboutOpen(false); setMenuOpen(false) }}>
                  <span className="nav-mobile-icon"><img src={jobsIcon} alt="Jobs" className="nav-mobile-svg" /></span>
                  <span className="nav-mobile-text">Jobs</span>
                </Link>
                <Link to="/franchise" className="nav-mobile-link" onClick={() => { setMobileAboutOpen(false); setMenuOpen(false) }}>
                  <span className="nav-mobile-icon"><img src={franchiseIcon} alt="Franchise Enquiry" className="nav-mobile-svg" /></span>
                  <span className="nav-mobile-text">Franchise Enquiry</span>
                </Link>
              </div>
            )}
          </div>
        </nav>

        <div className="header-actions">
          <a href="tel:+917045110011" className="btn-call">
            <span className="btn-call-dot" />
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.21 2.2z"/></svg>
            <span className="btn-call-num">+91 7045110011</span>
          </a>
          <a href="https://wa.me/917045110077?text=Hi" target="_blank" rel="noreferrer" className="btn-wa">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.553 4.103 1.523 5.824L.057 23.882a.5.5 0 00.606.63l6.288-1.652A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.698-.504-5.248-1.385l-.376-.217-3.892 1.022 1.04-3.793-.232-.389A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
            <span className="btn-wa-text">Book Now</span>
          </a>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span></span><span></span><span></span>
          </button>
        </div>

      </div>
    </header>
  )
}
