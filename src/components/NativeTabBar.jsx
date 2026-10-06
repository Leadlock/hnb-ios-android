import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { isNativePlatform, triggerHaptic, openInAppBrowser } from '../utils/native'
import './NativeTabBar.css'
import logoImg from '../assets/logo.png'

const WA_LINK = 'https://wa.me/917045110011?text=Hi%20Hangers%20%26%20Basket,%20I%20would%20like%20to%20enquire%20about%20your%20services.'
const CALL_LINK = 'tel:+917045110011'
const EMAIL_LINK = 'mailto:info@hnb.co.in'
const MAPS_LINK = 'https://maps.app.goo.gl/euEZidXUcxB2GBLa7'
const INSTAGRAM_LINK = 'https://www.instagram.com/hangers_and_basket?stkn=azNlbGRnMjV1Y2Nw'
const FACEBOOK_LINK = 'https://www.facebook.com/people/Hangers-Basket/61593879825651/'
const YOUTUBE_LINK = 'https://youtube.com/@hangers_and_basket?si=af9kYP5uhYA8HIjr'

const IconHome = ({ active }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={active ? '0' : '2'} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
)

const IconServices = ({ active }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={active ? '0' : '2'} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"/>
    <rect x="14" y="3" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/>
    <rect x="3" y="14" width="7" height="7"/>
  </svg>
)

const IconPricing = ({ active }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={active ? '0' : '2'} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/>
    <line x1="7" y1="7" x2="7.01" y2="7"/>
  </svg>
)

const IconOffers = ({ active }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={active ? '0' : '2'} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 12 20 22 4 22 4 12"/>
    <rect x="2" y="7" width="20" height="5"/>
    <line x1="12" y1="22" x2="12" y2="7"/>
    <path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z"/>
    <path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/>
  </svg>
)

const IconSupport = ({ active }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={active ? '0' : '2'} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
  </svg>
)

const IconWhatsApp = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.553 4.103 1.523 5.824L.057 23.882a.5.5 0 00.606.63l6.288-1.652A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.698-.504-5.248-1.385l-.376-.217-3.892 1.022 1.04-3.793-.232-.389A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
const IconPhone = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
const IconMail = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
const IconMapPin = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
const IconInstagram = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
const IconFacebook = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
const IconYoutube = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg>
const IconClose = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>

export default function NativeTabBar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [sheetOpen, setSheetOpen] = useState(false)

  // STRICTLY Native App Only — completely hidden on standard Web
  if (!isNativePlatform()) return null

  const handleTabPress = async (path, isSupport = false) => {
    await triggerHaptic('medium')
    if (isSupport) {
      setSheetOpen(prev => !prev)
    } else {
      setSheetOpen(false)
      navigate(path)
    }
  }

  const handleExternalLink = async (url) => {
    await triggerHaptic('medium')
    openInAppBrowser(url)
  }

  const handleInternalNav = async (path) => {
    await triggerHaptic('medium')
    setSheetOpen(false)
    navigate(path)
  }

  // Close sheet on route change
  useEffect(() => {
    setSheetOpen(false)
  }, [location.pathname])

  const isTabActive = (path) => {
    if (sheetOpen) return false
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <>
      {/* Native Bottom Sheet Drawer for Support & Social Links */}
      {sheetOpen && (
        <div 
          className="native-sheet-backdrop" 
          onClick={() => { triggerHaptic('light'); setSheetOpen(false); }}
        />
      )}

      <div className={`native-sheet-container ${sheetOpen ? 'open' : ''}`}>
        <div className="native-sheet-handle-area" onClick={() => setSheetOpen(false)}>
          <div className="native-sheet-handle" />
        </div>
        
        <div className="native-sheet-header">
          <div className="native-sheet-brand">
            <img src={logoImg} alt="Hangers & Basket" className="native-sheet-logo" />
            <div>
              <h3 className="native-sheet-title">Connect &amp; Support</h3>
              <p className="native-sheet-subtitle">Daily 10:00 AM – 8:00 PM • Navi Mumbai</p>
            </div>
          </div>
          <button 
            type="button" 
            className="native-sheet-close"
            onClick={() => { triggerHaptic('light'); setSheetOpen(false); }}
            aria-label="Close"
          >
            <IconClose />
          </button>
        </div>

        {/* Instant Direct Contact */}
        <div className="native-sheet-section">
          <div className="native-sheet-grid">
            <button 
              type="button" 
              className="sheet-btn sheet-btn--whatsapp"
              onClick={() => handleExternalLink(WA_LINK)}
            >
              <div className="sheet-btn-icon"><IconWhatsApp /></div>
              <div className="sheet-btn-info">
                <strong>WhatsApp Us</strong>
                <span>Instant live chat</span>
              </div>
            </button>

            <button 
              type="button" 
              className="sheet-btn sheet-btn--phone"
              onClick={() => handleExternalLink(CALL_LINK)}
            >
              <div className="sheet-btn-icon"><IconPhone /></div>
              <div className="sheet-btn-info">
                <strong>Call Care</strong>
                <span>+91 7045110011</span>
              </div>
            </button>

            <button 
              type="button" 
              className="sheet-btn sheet-btn--mail"
              onClick={() => handleExternalLink(EMAIL_LINK)}
            >
              <div className="sheet-btn-icon"><IconMail /></div>
              <div className="sheet-btn-info">
                <strong>Email Support</strong>
                <span>info@hnb.co.in</span>
              </div>
            </button>

            <button 
              type="button" 
              className="sheet-btn sheet-btn--maps"
              onClick={() => handleExternalLink(MAPS_LINK)}
            >
              <div className="sheet-btn-icon"><IconMapPin /></div>
              <div className="sheet-btn-info">
                <strong>Store Location</strong>
                <span>Kharghar Store</span>
              </div>
            </button>
          </div>
        </div>

        {/* Social Media Community Channels */}
        <div className="native-sheet-section">
          <h4 className="native-sheet-heading">Follow Our Community</h4>
          <div className="native-social-row">
            <button 
              type="button" 
              className="social-pill social-pill--instagram"
              onClick={() => handleExternalLink(INSTAGRAM_LINK)}
            >
              <IconInstagram />
              <span>Instagram</span>
            </button>

            <button 
              type="button" 
              className="social-pill social-pill--facebook"
              onClick={() => handleExternalLink(FACEBOOK_LINK)}
            >
              <IconFacebook />
              <span>Facebook</span>
            </button>

            <button 
              type="button" 
              className="social-pill social-pill--youtube"
              onClick={() => handleExternalLink(YOUTUBE_LINK)}
            >
              <IconYoutube />
              <span>YouTube</span>
            </button>
          </div>
        </div>

        {/* Legal & App Links */}
        <div className="native-sheet-footer">
          <div className="native-sheet-links">
            <button type="button" onClick={() => handleInternalNav('/privacy-policy')}>Privacy Policy</button>
            <span>•</span>
            <button type="button" onClick={() => handleInternalNav('/terms')}>Terms</button>
            <span>•</span>
            <button type="button" onClick={() => handleInternalNav('/franchise')}>Franchise</button>
            <span>•</span>
            <button type="button" onClick={() => handleInternalNav('/jobs')}>Jobs</button>
          </div>
          <p className="native-sheet-copy">© {new Date().getFullYear()} Hangers &amp; Basket. All rights reserved.</p>
        </div>
      </div>

      {/* Persistent Frosted Bottom Navigation Bar */}
      <nav className="native-tab-bar" aria-label="App Navigation">
        <button
          type="button"
          className={`tab-item ${isTabActive('/') ? 'active' : ''}`}
          onClick={() => handleTabPress('/')}
        >
          <span className="tab-icon"><IconHome active={isTabActive('/')} /></span>
          <span className="tab-label">Home</span>
        </button>

        <button
          type="button"
          className={`tab-item ${isTabActive('/services') ? 'active' : ''}`}
          onClick={() => handleTabPress('/services')}
        >
          <span className="tab-icon"><IconServices active={isTabActive('/services')} /></span>
          <span className="tab-label">Services</span>
        </button>

        <button
          type="button"
          className={`tab-item ${isTabActive('/pricing') ? 'active' : ''}`}
          onClick={() => handleTabPress('/pricing')}
        >
          <span className="tab-icon"><IconPricing active={isTabActive('/pricing')} /></span>
          <span className="tab-label">Pricing</span>
        </button>

        <button
          type="button"
          className={`tab-item ${isTabActive('/plans') ? 'active' : ''}`}
          onClick={() => handleTabPress('/plans')}
        >
          <span className="tab-icon"><IconOffers active={isTabActive('/plans')} /></span>
          <span className="tab-label">Offers</span>
        </button>

        <button
          type="button"
          className={`tab-item ${sheetOpen ? 'active' : ''}`}
          onClick={() => handleTabPress(null, true)}
        >
          <span className="tab-icon"><IconSupport active={sheetOpen} /></span>
          <span className="tab-label">Support</span>
        </button>
      </nav>
    </>
  )
}
