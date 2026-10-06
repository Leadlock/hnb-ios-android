import { useEffect, useRef, useState } from 'react'
import { services as allServices } from '../data/data'

const services = allServices.filter(s => s.id !== 'stroller-cleaning' && s.id !== 'baby-car-seat')
import ServiceCard from './ServiceCard'
import './ServicesSection.css'

const CARDS = 3
const INTERVAL = 3500
const TOTAL = Math.ceil(services.length / CARDS)

export default function ServicesSection() {
  const [idx, setIdx] = useState(0)
  const timer = useRef(null)

  const go = (n) => {
    clearInterval(timer.current)
    setIdx((n + TOTAL) % TOTAL)
    timer.current = setInterval(() => setIdx(i => (i + 1) % TOTAL), INTERVAL)
  }

  useEffect(() => {
    timer.current = setInterval(() => setIdx(i => (i + 1) % TOTAL), INTERVAL)
    return () => clearInterval(timer.current)
  }, [])

  return (
    <section className="services-section" id="services">
      <div className="container">
        <div className="text-center section-head">
          <div className="section-tag">Our Services</div>
          <h2 className="section-title">Everything Your Home Needs, <span className="gradient-text">Cleaned to Perfection</span></h2>
          <p className="section-subtitle">From everyday laundry to specialty deep cleaning — we handle it all with professional care and free doorstep pickup.</p>
        </div>
        <div className="sc-carousel">
          <div className="sc-track-wrap">
            <div className="sc-track" style={{ transform: `translateX(-${idx * 100}%)` }}>
              {Array.from({ length: TOTAL }).map((_, slide) => (
                <div className="sc-slide" key={slide}>
                  {services.slice(slide * CARDS, slide * CARDS + CARDS).map(s => (
                    <ServiceCard key={s.id} service={s} />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="sc-nav">
            <button className="sc-arrow" onClick={() => go(idx - 1)}>&#8249;</button>
            {Array.from({ length: TOTAL }).map((_, i) => (
              <span key={i} className={`sc-dot${i === idx ? ' active' : ''}`} onClick={() => go(i)} />
            ))}
            <button className="sc-arrow" onClick={() => go(idx + 1)}>&#8250;</button>
          </div>
        </div>
      </div>
    </section>
  )
}
