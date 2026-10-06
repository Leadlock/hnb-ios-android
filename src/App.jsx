import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import HomePage from './pages/HomePage'
import ServicePage from './pages/ServicePage'
import PricingPage from './pages/PricingPage'
import PlansPage from './pages/PlansPage'
import TermsPage from './pages/TermsPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import AllServicesPage from './pages/AllServicesPage'
import JobsPage from './pages/JobsPage'
import FranchisePage from './pages/FranchisePage'
import DataDash from './pages/DataDash'
import ServicesTicker from './components/ServicesTicker'
import NativeTabBar from './components/NativeTabBar'
import CookieConsentBanner from './components/CookieConsentBanner'
import { useAnalytics } from './hooks/useAnalytics'
import { isNativePlatform, initNativeListeners } from './utils/native'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const isDash = pathname === '/data-dash'
  const isNative = isNativePlatform()
  useAnalytics()

  useEffect(() => {
    initNativeListeners(navigate)
  }, [navigate])

  return (
    <>
      <ScrollToTop />
      <CookieConsentBanner />
      <div style={isDash ? {} : { paddingBottom: isNative ? 'calc(68px + env(safe-area-inset-bottom, 0px))' : 48 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services/:serviceId" element={<ServicePage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/plans" element={<PlansPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/services" element={<AllServicesPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/franchise" element={<FranchisePage />} />
          <Route path="/data-dash" element={<DataDash />} />
        </Routes>
      </div>
      {!isDash && (
        <>
          <ServicesTicker />
          <NativeTabBar />
        </>
      )}
    </>
  )
}
