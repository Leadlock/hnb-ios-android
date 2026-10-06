import { useState } from 'react'
import './CookieConsentBanner.css'

export default function CookiePreferenceCenter({ t, onSave, onBack, initialChoices, inline = false }) {
  const [choices, setChoices] = useState({
    functional: initialChoices?.functional ?? false,
    analytics: initialChoices?.analytics ?? false,
    marketing: initialChoices?.marketing ?? false,
  })

  const toggle = (key) => setChoices((prev) => ({ ...prev, [key]: !prev[key] }))

  const categories = [
    { key: 'strictly_necessary', locked: true },
    { key: 'functional',         locked: false },
    { key: 'analytics',          locked: false },
    { key: 'marketing',          locked: false },
  ]

  const content = (
    <>
      <h2 className="cc-modal__title" style={{ marginBottom: '18px' }}>{t.preferences.title}</h2>
      <ul className="cc-modal__list">
        {categories.map(({ key, locked }) => (
          <li key={key} className="cc-modal__item">
            <div className="cc-modal__item-text">
              <strong>{t.preferences[key].label}</strong>
              <span>{t.preferences[key].description}</span>
            </div>
            <label className={`cc-toggle ${locked ? 'cc-toggle--locked' : ''}`}>
              <input
                type="checkbox"
                checked={locked ? true : choices[key]}
                disabled={locked}
                onChange={() => !locked && toggle(key)}
              />
              <span className="cc-toggle__slider" />
            </label>
          </li>
        ))}
      </ul>
      <div className="cc-modal__actions">
        <button className="cc-btn cc-btn--outline" onClick={onBack}>← Back</button>
        <button className="cc-btn cc-btn--primary" onClick={() => onSave(choices)}>
          {t.preferences.save}
        </button>
      </div>
    </>
  )

  if (inline) return <div className="cc-modal__box cc-modal__box--inline">{content}</div>

  return (
    <div className="cc-modal" role="dialog" aria-modal="true" aria-label={t.preferences.title}>
      <div className="cc-modal__box">{content}</div>
    </div>
  )
}
