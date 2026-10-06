import { useState, useEffect } from 'react'

const CONSENT_KEY = 'cookie_consent'

const defaultChoices = {
  strictly_necessary: true,
  functional: false,
  analytics: false,
  marketing: false,
}

export function useCookieConsent() {
  const [consent, setConsent] = useState(null)
  const [language, setLanguage] = useState('en')
  const [serverVersion, setServerVersion] = useState(null)
  const [forceOpen, setForceOpen] = useState(false)

  useEffect(() => {
    const handler = () => setForceOpen(true)
    window.addEventListener('open-cookie-banner', handler)
    return () => window.removeEventListener('open-cookie-banner', handler)
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem(CONSENT_KEY)
    if (saved) {
      try { setConsent(JSON.parse(saved)) } catch { /* ignore */ }
    }
  }, [])

  useEffect(() => {
    fetch('/api/consent/version')
      .then((res) => res.json())
      .then((data) => setServerVersion(data.version))
      .catch(() => setServerVersion('1.0'))
  }, [])

  async function _log(action, choices, version) {
    try {
      await fetch('/api/consent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language, consent_version: version, choices, action }),
      })
    } catch { /* non-blocking */ }
  }

  function _save(action, choices) {
    const version = serverVersion || '1.0'
    const record = { action, choices, version, timestamp: Date.now() }
    localStorage.setItem(CONSENT_KEY, JSON.stringify(record))
    setConsent(record)
    setForceOpen(false)
    _log(action, choices, version)
  }

  const acceptAll  = () => _save('accepted_all', { strictly_necessary: true, functional: true, analytics: true, marketing: true })
  const rejectAll  = () => _save('rejected_all', defaultChoices)
  const saveCustom = (choices) => _save('custom', { ...defaultChoices, ...choices, strictly_necessary: true })
  const withdraw   = () => _save('withdrawn', defaultChoices)

  const needsBanner = forceOpen || (serverVersion !== null && (
    consent === null || consent.version !== serverVersion
  ))

  return {
    consent, needsBanner, language, setLanguage,
    acceptAll, rejectAll, saveCustom, withdraw,
    openBanner: () => window.dispatchEvent(new Event('open-cookie-banner')),
  }
}
