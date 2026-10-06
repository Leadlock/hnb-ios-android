import { Link } from 'react-router-dom'
import { services } from '../data/data'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './AllServicesPage.css'

import dryCleaningIcon from '../assets/icons/dry_cleaning.svg'
import washFoldIcon from '../assets/icons/wash_fold.svg'
import washIronIcon from '../assets/icons/wash_iron.svg'
import steamPressingIcon from '../assets/icons/steam_pressing.svg'
import shoeIcon from '../assets/icons/shoe_care.svg'
import bagIcon from '../assets/icons/bag_care.svg'
import carpetIcon from '../assets/icons/carpet_cleaning.svg'
import curtainIcon from '../assets/icons/curtain_cleaning.svg'
import mattressIcon from '../assets/icons/mattress_cleaning.svg'
import toyIcon from '../assets/icons/toy_cleaning.svg'
import strollerIcon from '../assets/icons/stroller_cleaning.svg'
import babyCarSeatIcon from '../assets/icons/baby_car_seat.svg'
import commercialLaundryIcon from '../assets/icons/commercial_laundry.svg'

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

const SERVICE_ORDER = [
  'dry-cleaning',
  'shoe-care',
  'curtain-cleaning',
  'bag-care',
  'carpet-cleaning',
  'mattress-cleaning',
  'toy-cleaning',
  'wash-iron',
  'wash-fold',
  'steam-pressing',
  'commercial-laundry',
]

const serviceMap = Object.fromEntries(services.map(s => [s.id, s]))
const orderedServices = SERVICE_ORDER.map(id => serviceMap[id]).filter(Boolean)

function ServiceCard({ service }) {
  return (
    <div className="as-card">
      <div className="as-card-img">
        <img src={service.image} alt={service.title} loading="lazy" />
        <div className="as-card-icon">
          <img src={iconMap[service.id]} alt={service.title} />
        </div>
        <span className="as-card-price-badge">{service.price}</span>
      </div>
      <div className="as-card-body">
        <h3 className="as-card-title">{service.title}</h3>
        <p className="as-card-desc">{service.description}</p>
        <div className="as-card-actions">
          <Link to={`/services/${service.id}`} className="as-btn-details">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            View Details
          </Link>
          <a href="https://wa.me/917045110077?text=Hi" target="_blank" rel="noreferrer" className="as-btn-wa">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.553 4.103 1.523 5.824L.057 23.882a.5.5 0 00.606.63l6.288-1.652A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.698-.504-5.248-1.385l-.376-.217-3.892 1.022 1.04-3.793-.232-.389A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
            Book on WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}

export default function AllServicesPage() {
  return (
    <>
      <Header />
      <main className="as-main">
        <div className="as-hero">
          <div className="container">
            <div className="section-tag as-hero-tag">● ALL SERVICES</div>
            <h1 className="as-hero-title">Everything We <span className="app-highlight">Clean.</span><br />All in One Place.</h1>
            <p className="as-hero-sub">From premium dry cleaning needs to everyday laundry services — free pickup & delivery on every order across Navi Mumbai.</p>
            <div className="as-hero-pills">
              <span className="as-hero-pill"><span style={{color:'#4ade80'}}>●</span> Free Pickup & Delivery</span>
              <span className="as-hero-pill"><span style={{color:'#60a5fa'}}>●</span> {SERVICE_ORDER.length}+ Services</span>
              <span className="as-hero-pill"><span style={{color:'#f472b6'}}>●</span> Same-Day Available</span>
              <span className="as-hero-pill"><span style={{color:'#facc15'}}>●</span> No Minimum Order</span>
            </div>
          </div>
        </div>

        <div className="as-body">
          <div className="container">

            <div className="as-grid">
              {orderedServices.map(s => <ServiceCard key={s.id} service={s} />)}
            </div>

            <div className="as-cta">
              <h2>Not Sure What You Need?</h2>
              <p>Message us on WhatsApp and we'll recommend the right service for you.</p>
              <div className="as-cta-btns">
                <a href="https://wa.me/917045110077?text=Hi" target="_blank" rel="noreferrer" className="as-cta-wa">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.553 4.103 1.523 5.824L.057 23.882a.5.5 0 00.606.63l6.288-1.652A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.698-.504-5.248-1.385l-.376-.217-3.892 1.022 1.04-3.793-.232-.389A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                  Chat on WhatsApp
                </a>
                <Link to="/pricing" className="as-cta-pricing">
                  View Pricing →
                </Link>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
