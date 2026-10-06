import React from 'react'
import './PhotoQuoteCard.css'

export const quoteConfigByService = {
  'stroller-cleaning': {
    tag: 'NOT SURE OF YOUR STROLLER?',
    title: 'Send Us a Photo',
    desc: "WhatsApp a photo of your stroller and we'll give you an instant, exact quote. No guessing, no surprises. Free pickup always included.",
    btnText: 'WhatsApp Us',
  },
  'dry-cleaning': {
    tag: 'NOT SURE OF YOUR GARMENT?',
    title: 'Send Us a Photo',
    desc: "WhatsApp a photo of your suit, gown, saree, or delicate fabric and we'll give you an instant, exact quote. No guessing, no surprises. Free pickup always included.",
    btnText: 'WhatsApp Us',
  },
  'wash-fold': {
    tag: 'NOT SURE OF YOUR LAUNDRY LOAD?',
    title: 'Send Us a Photo',
    desc: "WhatsApp a photo or list of your laundry items and we'll give you an instant quote & weight estimate. No guessing, no surprises. Free pickup always included.",
    btnText: 'WhatsApp Us',
  },
  'wash-iron': {
    tag: 'NOT SURE OF YOUR GARMENTS?',
    title: 'Send Us a Photo',
    desc: "WhatsApp a photo of your garments and we'll give you an instant quote & estimate. No guessing, no surprises. Free pickup always included.",
    btnText: 'WhatsApp Us',
  },
  'steam-pressing': {
    tag: 'NOT SURE OF YOUR GARMENTS?',
    title: 'Send Us a Photo',
    desc: "WhatsApp a photo of your clothes or suit and we'll give you an instant pressing quote. No guessing, no surprises. Free pickup always included.",
    btnText: 'WhatsApp Us',
  },
  'shoe-care': {
    tag: 'NOT SURE OF YOUR SHOES?',
    title: 'Send Us a Photo',
    desc: "WhatsApp a photo of your sneakers, leather shoes, or boots and we'll give you an instant, exact quote. No guessing, no surprises. Free pickup always included.",
    btnText: 'WhatsApp Us',
  },
  'bag-care': {
    tag: 'NOT SURE OF YOUR BAG?',
    title: 'Send Us a Photo',
    desc: "WhatsApp a photo of your handbag, purse, or luxury accessory and we'll give you an instant, exact quote. No guessing, no surprises. Free pickup always included.",
    btnText: 'WhatsApp Us',
  },
  'carpet-cleaning': {
    tag: 'NOT SURE OF YOUR CARPET OR SOFA?',
    title: 'Send Us a Photo',
    desc: "WhatsApp a photo of your carpet, rug, or sofa and we'll give you an instant, exact quote. No guessing, no surprises. Free pickup always included.",
    btnText: 'WhatsApp Us',
  },
  'curtain-cleaning': {
    tag: 'NOT SURE OF YOUR CURTAINS?',
    title: 'Send Us a Photo',
    desc: "WhatsApp a photo of your curtains or drapes and we'll give you an instant, exact quote. No guessing, no surprises. Free pickup always included.",
    btnText: 'WhatsApp Us',
  },
  'mattress-cleaning': {
    tag: 'NOT SURE OF YOUR MATTRESS OR BEDDING?',
    title: 'Send Us a Photo',
    desc: "WhatsApp a photo of your mattress, quilt, or home linens and we'll give you an instant, exact quote. No guessing, no surprises. Free pickup always included.",
    btnText: 'WhatsApp Us',
  },
  'toy-cleaning': {
    tag: 'NOT SURE OF YOUR TOYS OR BABY GEAR?',
    title: 'Send Us a Photo',
    desc: "WhatsApp a photo of your stuffed toys, plushies, or baby items and we'll give you an instant, exact quote. No guessing, no surprises. Free pickup always included.",
    btnText: 'WhatsApp Us',
  },
  'baby-car-seat': {
    tag: 'NOT SURE OF YOUR CAR SEAT?',
    title: 'Send Us a Photo',
    desc: "WhatsApp a photo of your baby car seat or booster seat and we'll give you an instant, exact quote. No guessing, no surprises. Free pickup always included.",
    btnText: 'WhatsApp Us',
  },
  'commercial-laundry': {
    tag: 'NOT SURE OF YOUR COMMERCIAL VOLUME?',
    title: 'Send Us a Message',
    desc: "WhatsApp a photo or requirements list of your commercial laundry items and we'll give you an instant, custom quote. No guessing, no surprises. Free pickup always included.",
    btnText: 'WhatsApp Us',
  },
}

export default function PhotoQuoteCard({ serviceId, serviceTitle, iconSrc }) {
  const config = quoteConfigByService[serviceId] || {
    tag: `NOT SURE OF YOUR ${serviceTitle ? serviceTitle.toUpperCase() : 'ITEM'}?`,
    title: 'Send Us a Photo',
    desc: `WhatsApp a photo of your ${serviceTitle || 'item'} and we'll give you an instant, exact quote. No guessing, no surprises. Free pickup always included.`,
    btnText: 'WhatsApp Us',
  }

  const waUrl = serviceId === 'commercial-laundry'
    ? 'https://wa.me/917045110011?text=' + encodeURIComponent('Hi, I wanted to know more about your Commercial Laundry offerings.')
    : 'https://wa.me/917045110077?text=Hi'

  return (
    <div className="photo-quote-card">
      <div className="photo-quote-orb photo-quote-orb-one" aria-hidden="true" />
      <div className="photo-quote-orb photo-quote-orb-two" aria-hidden="true" />
      <div className="photo-quote-left">
        <div className="photo-quote-tag"><span className="photo-quote-tag-dot" />{config.tag}</div>
        <div className="photo-quote-header">
          <div className="photo-quote-icon-box">
            {iconSrc ? (
              <img src={iconSrc} alt="" className="photo-quote-icon-img" />
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                <circle cx="12" cy="13" r="4"/>
              </svg>
            )}
          </div>
          <h3 className="photo-quote-title">{config.title}</h3>
        </div>
        <p className="photo-quote-desc">{config.desc}</p>
        <a
          href={waUrl}
          target="_blank"
          rel="noreferrer"
          className="photo-quote-btn"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.553 4.103 1.523 5.824L.057 23.882a.5.5 0 00.606.63l6.288-1.652A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.698-.504-5.248-1.385l-.376-.217-3.892 1.022 1.04-3.793-.232-.389A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
          </svg>
          {config.btnText}
        </a>
      </div>

      <div className="photo-quote-right">
        <div className="photo-quote-price-title">Free</div>
        <div className="photo-quote-price-sub">Quote · Instant on WhatsApp</div>
      </div>
    </div>
  )
}
