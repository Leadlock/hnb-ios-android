import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './SocialsPage.css'
import logoImg from '../assets/logo.png'

const SOCIALS = [
  {
    name: 'Instagram',
    handle: '@hangers_and_basket',
    description: 'Before & after transformations, tips, and offers.',
    url: 'https://www.instagram.com/hangers_and_basket?stkn=azNlbGRnMjV1Y2Nw',
    color: '#E1306C',
    bg: 'linear-gradient(135deg, #f9ce34, #ee2a7b, #6228d7)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    name: 'Facebook',
    handle: 'Hangers & Basket',
    description: 'Updates, promotions, and customer stories.',
    url: 'https://www.facebook.com/people/Hangers-Basket/61593879825651/',
    color: '#1877F2',
    bg: '#1877F2',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
      </svg>
    ),
  },
  {
    name: 'YouTube',
    handle: '@hangers_and_basket',
    description: 'Service videos, tutorials, and care guides.',
    url: 'https://youtube.com/@hangers_and_basket?si=af9kYP5uhYA8HIjr',
    color: '#FF0000',
    bg: '#FF0000',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    handle: '+91 7045110077',
    description: 'Chat with us for bookings, queries, and support.',
    url: 'https://wa.me/917045110077',
    color: '#25D366',
    bg: '#25D366',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.553 4.103 1.523 5.824L.057 23.882a.5.5 0 00.606.63l6.288-1.652A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.698-.504-5.248-1.385l-.376-.217-3.892 1.022 1.04-3.793-.232-.389A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
      </svg>
    ),
  },
  {
    name: 'Google Reviews',
    handle: 'Rate us on Google',
    description: 'Loved our service? Leave us a review and let others know.',
    url: 'https://share.google/yobMNbWMS3cI6gjOt',
    color: '#4285F4',
    bg: '#fff',
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28">
        <path fill="#4285F4" d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.48a5.54 5.54 0 01-2.4 3.63v3h3.88c2.27-2.09 3.56-5.17 3.56-8.82z"/>
        <path fill="#34A853" d="M12 24c3.24 0 5.95-1.07 7.96-2.91l-3.88-3c-1.08.72-2.45 1.15-4.08 1.15-3.13 0-5.78-2.11-6.73-4.96H1.26v3.09A12 12 0 0012 24z"/>
        <path fill="#FBBC05" d="M5.27 14.28A7.2 7.2 0 014.9 12c0-.79.14-1.56.37-2.28V6.63H1.26A12 12 0 000 12c0 1.94.46 3.77 1.26 5.37l4.01-3.09z"/>
        <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.44-3.44C17.94 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.26 6.63l4.01 3.09C6.22 6.87 8.87 4.75 12 4.75z"/>
      </svg>
    ),
  },
  {
    name: 'Play Store',
    handle: 'Hangers & Baskets App',
    description: 'Download our app to book services and track orders.',
    url: 'https://play.google.com/store/apps/details?id=com.hangersandbaskets.app&pcampaignid=web_share',
    color: '#00C4CC',
    bg: '#fff',
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28">
        <path fill="#00D7FE" d="M3.6 1.8c-.36.37-.57.94-.57 1.68v17c0 .74.21 1.31.57 1.68l.1.09L13.5 12.3v-.2L3.7 1.71l-.1.09z"/>
        <path fill="#00F076" d="M16.8 15.6l-3.3-3.3v-.2l3.3-3.3.08.04 3.9 2.22c1.12.63 1.12 1.67 0 2.3l-3.9 2.22-.08.02z"/>
        <path fill="#FF3A44" d="M16.88 15.56L13.5 12.2 3.6 22.1c.37.4.98.44 1.67.06l11.61-6.6"/>
        <path fill="#FFCF00" d="M16.88 8.44L5.27 1.84C4.58 1.46 3.97 1.5 3.6 1.9l9.9 9.9 3.38-3.36z"/>
      </svg>
    ),
  },
  {
    name: 'App Store',
    handle: 'Hangers & Baskets App',
    description: 'Available soon for iOS.',
    url: null,
    comingSoon: true,
    color: '#111',
    bg: '#fff',
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="#111">
        <path d="M16.365 1.43c0 1.14-.46 2.1-1.26 2.85-.9.84-2.04 1.32-3.09 1.23-.12-1.14.42-2.28 1.2-3 .84-.9 2.1-1.29 3.15-1.08zM20.1 17.52c-.33.78-.72 1.5-1.17 2.16-.63.93-1.14 1.56-1.53 1.89-.6.57-1.26.87-1.95.87-.51 0-1.14-.15-1.86-.45-.72-.3-1.38-.45-1.98-.45-.63 0-1.29.15-2.01.45-.72.3-1.29.45-1.74.45-.66 0-1.32-.3-1.98-.9-.42-.36-.96-1.02-1.62-1.98-.72-1.05-1.32-2.25-1.8-3.63-.51-1.47-.78-2.88-.78-4.26 0-1.56.33-2.91 1.02-4.02.51-.9 1.2-1.62 2.04-2.16A5.4 5.4 0 017.5 4.55c.63 0 1.44.18 2.46.54.99.36 1.65.54 1.95.54.24 0 .96-.21 2.1-.63 1.08-.39 1.98-.54 2.73-.48 2.01.15 3.51.99 4.5 2.46-1.8 1.08-2.7 2.61-2.7 4.56 0 1.53.57 2.82 1.68 3.84.51.48 1.08.84 1.68 1.08-.15.42-.3.78-.42 1.08z"/>
      </svg>
    ),
  },
]

export default function SocialsPage() {
  useEffect(() => { document.title = 'Follow Us – Hangers & Basket' }, [])
  return (
    <div className="socials-page">
      <div className="socials-hero">
        <Link to="/" className="socials-hero-logo" aria-label="Go to homepage">
          <img src={logoImg} alt="Hangers & Basket" />
        </Link>
        <h1>Find Us Online</h1>
        <p>Follow, watch, and chat with us across all our platforms.</p>
      </div>
      <div className="socials-stack">
        {SOCIALS.map(s => {
          const RowTag = s.comingSoon ? 'div' : 'a'
          return (
            <RowTag
              key={s.name}
              {...(!s.comingSoon && { href: s.url, target: '_blank', rel: 'noopener noreferrer' })}
              className={`social-row${s.comingSoon ? ' social-row-disabled' : ''}`}
            >
              <div className="social-row-icon" style={{ background: s.bg }}>
                {s.icon}
              </div>
              <div className="social-row-body">
                <span className="social-row-name">{s.name}</span>
                <span className="social-row-handle">{s.handle}</span>
                <span className="social-row-desc">{s.description}</span>
              </div>
              {s.comingSoon ? (
                <span className="social-row-badge">Coming Soon</span>
              ) : (
                <svg className="social-row-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              )}
            </RowTag>
          )
        })}
      </div>
      <div className="socials-contact">
        <a
          href="tel:+917045110011"
          className="socials-contact-icon"
          aria-label="Call +91 70451 10011"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
          </svg>
        </a>
        <a
          href="mailto:info@hnb.co.in"
          className="socials-contact-icon"
          aria-label="Email info@hnb.co.in"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="3"/>
            <path d="M2 7l10 6 10-6"/>
          </svg>
        </a>
      </div>
    </div>
  )
}
