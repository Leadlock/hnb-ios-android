import { locations } from '../data/data'
import './CoverageGrid.css'

export default function CoverageGrid() {
  return (
    <section className="coverage-section" id="locations">
      <div className="container">
        <div className="text-center section-head">
          <div className="section-tag">Coverage</div>
          <h2 className="section-title">Serving <span className="gradient-text">25+ Locations</span> Across India</h2>
          <p className="section-subtitle">We're expanding rapidly. If you don't see your area, contact us — we might already be on our way!</p>
        </div>
        <div className="locations-grid">
          {locations.map((loc, i) => (
            <div key={i} className="location-chip">
              <span className="loc-pin">📍</span> {loc}
            </div>
          ))}
        </div>
        <div className="text-center" style={{marginTop:32}}>
          <a href="https://wa.me/971500000000" target="_blank" rel="noreferrer" className="btn btn-secondary">
            Ask About Your Area →
          </a>
        </div>
      </div>
    </section>
  )
}
