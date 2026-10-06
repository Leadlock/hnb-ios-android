import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { isNativePlatform } from '../utils/native'
import './ServicesTicker.css'

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

const tickerItems = [
  { id: 'dry-cleaning',      title: 'Dry Cleaning',              icon: dryCleaningIcon },
  { id: 'shoe-care',         title: 'Shoe Cleaning',             icon: shoeIcon },
  { id: 'curtain-cleaning',  title: 'Curtain Cleaning',          icon: curtainIcon },
  { id: 'bag-care',          title: 'Leather & Bags Care',       icon: bagIcon },
  { id: 'carpet-cleaning',   title: 'Carpet & Sofa Care',        icon: carpetIcon },
  { id: 'mattress-cleaning', title: 'Bedding & Home Linens Care', icon: mattressIcon },
  { id: 'toy-cleaning',      title: 'Toy & Baby Care',           icon: toyIcon },
  { id: 'wash-iron',         title: 'Wash & Iron',               icon: washIronIcon },
  { id: 'wash-fold',         title: 'Wash & Fold',               icon: washFoldIcon },
  { id: 'steam-pressing',    title: 'Steam Pressing',            icon: steamPressingIcon },
  { id: 'commercial-laundry', title: 'Commercial Laundry',       icon: commercialLaundryIcon },
]

export default function ServicesTicker() {
  if (isNativePlatform()) return null
  const trackRef = useRef(null)

  // Duplicate items for seamless infinite scroll
  const items = [...tickerItems, ...tickerItems]

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let frame
    let pos = 0
    const speed = 0.6

    const tick = () => {
      pos -= speed
      const half = track.scrollWidth / 2
      // Wrap by exactly `half` instead of snapping to 0 — snapping loses
      // whatever the loop overshot by, which shows up as a visible jump/
      // flicker every cycle since `speed` rarely divides `half` evenly.
      if (Math.abs(pos) >= half) pos += half
      track.style.transform = `translateX(${pos}px)`
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  // Mobile Safari can miscalculate a `position: fixed` element's placement
  // after an orientation change (especially if the page was scrolled), so it
  // renders mid-page instead of pinned to the viewport bottom. A 0px scroll
  // nudge forces it to recompute without any visible movement.
  useEffect(() => {
    const nudge = () => {
      window.scrollTo(window.scrollX, window.scrollY + 1)
      window.scrollTo(window.scrollX, window.scrollY - 1)
    }
    window.addEventListener('orientationchange', nudge)
    return () => window.removeEventListener('orientationchange', nudge)
  }, [])

  return (
    <div className="ticker-bar">
      <div className="ticker-track" ref={trackRef}>
        {items.map((s, i) => (
          <Link key={i} to={`/services/${s.id}`} className="ticker-item">
            <img src={s.icon} alt={s.title} className="ticker-icon" />
            <span className="ticker-label">{s.title}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
