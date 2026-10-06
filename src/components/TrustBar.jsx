import './TrustBar.css'

const items = [
  { icon: '⭐', value: '4.9/5', label: 'App Rating', sub: '10K+ reviews' },
  { icon: '👥', value: '50,000+', label: 'Customers Served', sub: 'Across India' },
  { icon: '🚚', value: 'Free', label: 'Pickup & Delivery', sub: 'On all orders' },
  { icon: '⚡', value: '24 Hours', label: 'Fast Turnaround', sub: 'Express available' },
]

export default function TrustBar() {
  return (
    <section className="trust-bar">
      <div className="container trust-grid">
        {items.map((item, i) => (
          <div key={i} className="trust-cell">
            <span className="trust-cell-icon">{item.icon}</span>
            <div>
              <div className="trust-cell-value">{item.value}</div>
              <div className="trust-cell-label">{item.label}</div>
              <div className="trust-cell-sub">{item.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
