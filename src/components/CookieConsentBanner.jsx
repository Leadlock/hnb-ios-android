import { useState, useEffect } from 'react'
import { useCookieConsent } from '../hooks/useCookieConsent'
import CookiePreferenceCenter from './CookiePreferenceCenter'
import './CookieConsentBanner.css'

export default function CookieConsentBanner() {
  const { needsBanner, consent, language, setLanguage, acceptAll, rejectAll, saveCustom } = useCookieConsent()
  const [t, setT] = useState(null)
  const [showPrefs, setShowPrefs] = useState(false)

  useEffect(() => {
    import(`../locales/${language}.json`)
      .catch(() => import('../locales/en.json'))
      .then((mod) => setT(mod.default))
  }, [language])

  if (!needsBanner || !t) return null

  if (showPrefs) {
    return <CookiePreferenceCenter t={t} onSave={saveCustom} onBack={() => setShowPrefs(false)} initialChoices={consent?.choices} />
  }

  return (
    <div className="cc-modal" role="dialog" aria-modal="true" aria-label={t.banner.title}>
      <div className="cc-modal__box">
        <div className="cc-modal__header">
          <h2 className="cc-modal__title">{t.banner.title}</h2>
          <select
            className="cc-banner__lang"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            aria-label="Language"
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
            <option value="bn">বাংলা</option>
            <option value="ta">தமிழ்</option>
            <option value="te">తెలుగు</option>
            <option value="mr">मराठी</option>
            <option value="gu">ગુજરાતી</option>
            <option value="kn">ಕನ್ನಡ</option>
            <option value="ml">മലയാളം</option>
            <option value="pa">ਪੰਜਾਬੀ</option>
            <option value="or">ଓଡ଼ିଆ</option>
            <option value="ur">اردو</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
            <option value="es">Español</option>
            <option value="pt">Português</option>
            <option value="it">Italiano</option>
            <option value="nl">Nederlands</option>
            <option value="pl">Polski</option>
            <option value="sv">Svenska</option>
            <option value="ro">Română</option>
            <option value="el">Ελληνικά</option>
            <option value="da">Dansk</option>
          </select>
        </div>
        <p className="cc-modal__desc">{t.banner.description}</p>
        <a className="cc-modal__privacy" href="/privacy-policy" target="_blank" rel="noopener noreferrer">
          {t.banner.privacy_link}
        </a>
        <div className="cc-modal__actions">
          <button className="cc-btn cc-btn--secondary" onClick={() => setShowPrefs(true)}>
            {t.banner.manage}
          </button>
          <button className="cc-btn cc-btn--outline" onClick={rejectAll}>
            {t.banner.reject_all}
          </button>
          <button className="cc-btn cc-btn--primary" onClick={acceptAll}>
            {t.banner.accept_all}
          </button>
        </div>
      </div>
    </div>
  )
}
