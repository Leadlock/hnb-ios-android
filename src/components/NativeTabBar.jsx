import { useLocation, useNavigate } from 'react-router-dom'
import { isNativePlatform, triggerHaptic, openInAppBrowser } from '../utils/native'
import './NativeTabBar.css'

const WA_LINK = 'https://wa.me/917045110077?text=Hi'

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

export default function NativeTabBar() {
  const location = useLocation()
  const navigate = useNavigate()

  // STRICTLY Native App Only — completely hidden on standard Web
  if (!isNativePlatform()) return null

  const handleTabPress = async (path, isAction = false) => {
    await triggerHaptic('selection')
    if (isAction) {
      openInAppBrowser(WA_LINK)
    } else {
      navigate(path)
    }
  }

  const isTabActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
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
        className="tab-item tab-item--action"
        onClick={() => handleTabPress(null, true)}
      >
        <span className="tab-icon"><IconSupport active={false} /></span>
        <span className="tab-label">Support</span>
      </button>
    </nav>
  )
}
