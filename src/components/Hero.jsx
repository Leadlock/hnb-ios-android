import { useState, useEffect } from 'react'
import './Hero.css'
import heroLaundry from '../assets/hero/hero_laundry.png'
import heroDryCleaning from '../assets/hero/hero_dry_cleaning.png'
import heroShoeBag from '../assets/hero/hero_shoe_bag.png'
import heroCarpet from '../assets/hero/hero_carpet.png'
import heroFabric from '../assets/hero/hero_fabric.png'

const slides = [
  {
    badge: "INDIA's 1st PREMIUM LAUNDRY SERVICES",
    headline: 'Fresh Clothes.',
    sub: 'Delivered Fast.',
    desc: 'Free pickup & delivery across Navi Mumbai. Same-day collection available — book in 60 seconds via our app.',
    image: heroLaundry,
  },
  {
    badge: 'DRY CLEANING',
    headline: 'Suits. Delicates.',
    sub: 'Expert Hands.',
    desc: 'Gentle solvent-based care for formal wear, silk, wool and delicate fabrics. Free pickup across India.',
    image: heroDryCleaning,
  },
  {
    badge: 'SHOE & BAG CARE',
    headline: 'Premium Care.',
    sub: 'Restored.',
    desc: 'Specialist cleaning and restoration for luxury shoes, sneakers and designer bags. Look brand new again.',
    image: heroShoeBag,
  },
  {
    badge: 'CARPET & RUG CLEANING',
    headline: 'Deep Clean.',
    sub: 'Every Fiber.',
    desc: 'Hot water extraction technology for carpets and rugs. Removes 99% of allergens, stains and deep-seated dirt.',
    image: heroCarpet,
  },
  {
    badge: 'HOME FABRIC SPECIALISTS',
    headline: 'Curtains. Bedding.',
    sub: 'Deeply Clean.',
    desc: 'Professional cleaning for curtains, bedding, blankets and strollers. Pick up, clean and return hassle-free.',
    image: heroFabric,
  },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimating(true)
      setTimeout(() => {
        setCurrent(prev => (prev + 1) % slides.length)
        setAnimating(false)
      }, 500)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const goTo = (i) => {
    if (i === current) return
    setAnimating(true)
    setTimeout(() => { setCurrent(i); setAnimating(false) }, 500)
  }

  const slide = slides[current]

  return (
    <section className="hero">
      {/* Background images */}
      {slides.map((s, i) => (
        <div
          key={i}
          className={`hero-bg ${i === current ? 'active' : ''}`}
          style={{ backgroundImage: `url(${s.image})` }}
        />
      ))}
      <div className="hero-overlay" />

      <div className="hero-badge-wrap">
        <div className="container">
          <div className={`hero-badge ${animating ? 'slide-out' : 'slide-in'}`}>
            <span className="badge-dot" />
            {slide.badge}
          </div>
        </div>
      </div>

      <div className="container hero-inner">
        <div className="hero-content">
          <h1 className={`hero-title ${animating ? 'slide-out' : 'slide-in'}`}>
            {slide.headline}<br />
            {slide.sub}
          </h1>

          <p className={`hero-desc ${animating ? 'slide-out' : 'slide-in'}`} style={{ animationDelay: '0.05s' }}>
            {slide.desc}
          </p>
        </div>
      </div>

      <div className="hero-bottom">
        <div className="container">
          <div className="hero-actions">
            <a href="https://wa.me/917045110077?text=Hi" target="_blank" rel="noreferrer" className="btn-hero-primary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.553 4.103 1.523 5.824L.057 23.882a.5.5 0 00.606.63l6.288-1.652A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.698-.504-5.248-1.385l-.376-.217-3.892 1.022 1.04-3.793-.232-.389A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
              Book Now
            </a>
            <a href="#services" className="btn-hero-secondary">
              → Explore Services
            </a>
          </div>
        </div>
      </div>

      <div className="hero-wave">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#F8FAFC"/>
        </svg>
      </div>
    </section>
  )
}
