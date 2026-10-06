import { Link } from 'react-router-dom'
import './ServiceCard.css'

import dryCleaningIcon from '../assets/icons/dry_cleaning.svg'
import washFoldIcon from '../assets/icons/wash_fold.svg'
import washIronIcon from '../assets/icons/wash_iron.svg'
import shoeIcon from '../assets/icons/shoe_care.svg'
import bagIcon from '../assets/icons/bag_care.svg'
import carpetIcon from '../assets/icons/carpet_cleaning.svg'
import curtainIcon from '../assets/icons/curtain_cleaning.svg'
import mattressIcon from '../assets/icons/mattress_cleaning.svg'
import toyIcon from '../assets/icons/toy_cleaning.svg'
import strollerIcon from '../assets/icons/stroller_cleaning.svg'
import babyCarSeatIcon from '../assets/icons/baby_car_seat.svg'
import commercialLaundryIcon from '../assets/icons/commercial_laundry.svg'

import steamPressingIcon from '../assets/icons/steam_pressing.svg'

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

export default function ServiceCard({ service }) {
  return (
    <Link to={`/services/${service.id}`} className="service-card" style={{ '--accent': service.accent, '--card-bg': service.color }}>
      <div className="sc-img-wrap">
        <img src={service.image} alt={service.title} loading="lazy" />
        <div className="sc-icon">
          <img src={iconMap[service.id]} alt={service.title} />
        </div>
      </div>
      <div className="sc-body">
        <h3 className="sc-title">{service.title}</h3>
        <p className="sc-desc">{service.description}</p>
        <div className="sc-footer">
          <span className="sc-price">From {service.price}</span>
          <span className="sc-cta">
            Book Now
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </span>
        </div>
      </div>
    </Link>
  )
}
