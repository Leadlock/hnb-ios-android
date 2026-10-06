const GA_ID = import.meta.env.VITE_GA_ID || ''

export function initGA() {
  if (!GA_ID) return

  // Remove the disable flag in case disableGA() was called earlier (race condition on load)
  window[`ga-disable-${GA_ID}`] = false

  if (window._gaLoaded) return
  window._gaLoaded = true

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = function () { window.dataLayer.push(arguments) }
  window.gtag('js', new Date())
  window.gtag('config', GA_ID, { anonymize_ip: true })
}

export function disableGA() {
  if (!GA_ID) return
  window[`ga-disable-${GA_ID}`] = true
}

export function trackEvent(eventName, params = {}) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params)
  }
}
