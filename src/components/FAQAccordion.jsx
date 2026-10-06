import { useRef, useState } from 'react'
import { faqs } from '../data/data'
import './FAQAccordion.css'

function FAQItem({ f, isOpen, onToggle }) {
  const bodyRef = useRef(null)
  return (
    <div className={`faq-item ${isOpen ? 'open' : ''}`}>
      <button className="faq-q" onClick={onToggle}>
        <span>{f.q}</span>
        <span className="faq-icon">{isOpen ? '−' : '+'}</span>
      </button>
      <div
        className="faq-a-wrap"
        style={{ maxHeight: isOpen ? bodyRef.current?.scrollHeight + 'px' : '0px' }}
      >
        <div className="faq-a" ref={bodyRef}>{f.a}</div>
      </div>
    </div>
  )
}

export default function FAQAccordion() {
  const [open, setOpen] = useState(0)
  return (
    <section className="faq-section" id="faq">
      <div className="container faq-inner">
        <div className="faq-left">
          <div className="section-tag">FAQ</div>
          <h2 className="section-title">Got <span className="gradient-text">Questions?</span></h2>
          <p style={{color:'var(--gray-600)',marginTop:12,lineHeight:1.7}}>
            Find answers to the most common questions about our services.
          </p>
        </div>
        <div className="faq-list">
          {faqs.map((f, i) => (
            <FAQItem key={i} f={f} isOpen={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          ))}
        </div>
      </div>
    </section>
  )
}
