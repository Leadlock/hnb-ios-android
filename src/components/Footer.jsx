import { Capacitor } from '@capacitor/core'
import { Link } from 'react-router-dom'
import { services } from '../data/data'
import './Footer.css'
import logoImg from '../assets/logo.png'

const IconFacebook  = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
const IconInstagram = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
const IconWhatsApp  = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.553 4.103 1.523 5.824L.057 23.882a.5.5 0 00.606.63l6.288-1.652A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.698-.504-5.248-1.385l-.376-.217-3.892 1.022 1.04-3.793-.232-.389A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
const IconYoutube   = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg>
const IconPin       = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
const IconPhone2    = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
const IconMail      = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
const IconClock2    = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>

function FooterSlim() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer footer-slim">
      <div className="container footer-slim-inner">
        <Link to="/" className="footer-logo">
          <img src={logoImg} alt="Hangers & Basket" className="logo-img" />
          <span>Hangers &amp; <strong>Basket</strong></span>
        </Link>
        <div className="footer-contact">
          <div className="contact-item"><IconPin /> <a href="https://maps.app.goo.gl/euEZidXUcxB2GBLa7" target="_blank" rel="noreferrer">Kharghar, Navi Mumbai</a></div>
          <div className="contact-item"><IconPhone2 /> <a href="tel:+917045110011">+91 7045110011</a></div>
          <div className="contact-item"><IconMail /> <a href="mailto:info@hnb.co.in">info@hnb.co.in</a></div>
          <div className="contact-item"><IconClock2 /> <span>Daily 10:00 AM – 8:00 PM</span></div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© {year} Hangers &amp; Basket. All rights reserved.</p>
          <div className="footer-legal">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <a href="#" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event('open-cookie-banner')) }}>Cookie Preferences</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  // Completely removed on native iOS/Android apps for a clean native look
  if (Capacitor.isNativePlatform()) return null

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <img src={logoImg} alt="Hangers & Basket" className="logo-img" />
            <span>Hangers &amp; <strong>Basket</strong></span>
          </Link>
          <p className="footer-tagline">Premium dry cleaning, home care & laundry services delivered to your door across Navi Mumbai.</p>
          <div className="social-icons">
            <a href="https://www.facebook.com/people/Hangers-Basket/61593879825651/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-icon"><IconFacebook /></a>
            <a href="https://www.instagram.com/hangers_and_basket?stkn=azNlbGRnMjV1Y2Nw" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-icon"><IconInstagram /></a>
            <a href="https://youtube.com/@hangers_and_basket?si=af9kYP5uhYA8HIjr" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="social-icon"><IconYoutube /></a>
            <a href="https://wa.me/917045110011" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="social-icon"><IconWhatsApp /></a>
          </div>
        </div>
        <div className="footer-col">
          <h4>Services</h4>
          <ul>
            {['dry-cleaning','shoe-care','bag-care','wash-iron','wash-fold','steam-pressing'].map(id => {
              const s = services.find(s => s.id === id)
              return s ? <li key={s.id}><Link to={`/services/${s.id}`}>{s.title}</Link></li> : null
            })}
          </ul>
        </div>
        <div className="footer-col">
          <h4>More Services</h4>
          <ul>
            {['carpet-cleaning','curtain-cleaning','mattress-cleaning','toy-cleaning','commercial-laundry'].map(id => {
              const s = services.find(s => s.id === id)
              return s ? <li key={s.id}><Link to={`/services/${s.id}`}>{s.title}</Link></li> : null
            })}
          </ul>
        </div>
        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li><Link to="/pricing">Pricing</Link></li>
            <li><Link to="/plans">Promos &amp; Offers</Link></li>
            <li><Link to="/terms">Terms &amp; Conditions</Link></li>
            <li><Link to="/jobs">Jobs</Link></li>
            <li><Link to="/franchise">Franchise Enquiry</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Contact Us</h4>
          <div className="footer-contact">
            <div className="contact-item"><IconPin /> <a href="https://maps.app.goo.gl/euEZidXUcxB2GBLa7" target="_blank" rel="noreferrer">Kharghar, Navi Mumbai</a></div>
            <div className="contact-item"><IconPhone2 /> <a href="tel:+917045110011">+91 7045110011</a></div>
            <div className="contact-item"><IconMail /> <a href="mailto:info@hnb.co.in">info@hnb.co.in</a></div>
            <div className="contact-item"><IconClock2 /> <span>Daily 10:00 AM – 8:00 PM</span></div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© {year} Hangers &amp; Basket. All rights reserved.</p>
          <div className="footer-legal">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <a href="#" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event('open-cookie-banner')) }}>Cookie Preferences</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
