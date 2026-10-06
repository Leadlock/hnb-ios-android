import { useState, useEffect, useRef } from 'react'
import './BeforeAfterCarousel.css'

const INTERVAL = 3000

export default function BeforeAfterCarousel({ images }) {
  const [active, setActive] = useState(0)
  const timerRef = useRef(null)

  const restart = (idx) => {
    setActive(idx)
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setActive(i => (i + 1) % images.length)
    }, INTERVAL)
  }

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActive(i => (i + 1) % images.length)
    }, INTERVAL)
    return () => clearInterval(timerRef.current)
  }, [images.length])

  return (
    <div className="bac-wrap">
      <div className="bac-frame">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Before & After ${i + 1}`}
            className={`bac-slide ${i === active ? 'active' : ''}`}
          />
        ))}
      </div>
      <div className="bac-dots">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`bac-dot ${i === active ? 'active' : ''}`}
            onClick={() => restart(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
