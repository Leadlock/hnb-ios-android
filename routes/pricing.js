const express = require('express')
const pool = require('../db')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT id, service_type, category, item_name, price, unit FROM pricing_items WHERE is_active = 1 ORDER BY sort_order ASC'
    )

    const groupedRaw = {}
    for (const row of rows) {
      const svc = row.service_type
      const cat = row.category || ''
      if (!groupedRaw[svc]) groupedRaw[svc] = {}
      if (!groupedRaw[svc][cat]) groupedRaw[svc][cat] = []
      groupedRaw[svc][cat].push({
        id: row.id,
        label: row.item_name,
        price: row.price,
        unit: row.unit,
        priceDisplay: `INR ${row.price % 1 === 0 ? Math.round(row.price) : row.price} / ${row.unit}`,
      })
    }

    const [metaRows] = await pool.execute(
      'SELECT service_type, description, svg_icon, accent_color, sort_order FROM service_metadata ORDER BY sort_order ASC'
    )
    const meta = {}
    for (const r of metaRows) {
      meta[r.service_type] = { description: r.description, svg_icon: r.svg_icon, accent_color: r.accent_color, sort_order: r.sort_order }
    }

    // Order grouped data by service_metadata.sort_order
    const grouped = {}
    for (const r of metaRows) {
      if (groupedRaw[r.service_type]) grouped[r.service_type] = groupedRaw[r.service_type]
    }
    // Any service type not in metadata goes at the end
    for (const svc of Object.keys(groupedRaw)) {
      if (!grouped[svc]) grouped[svc] = groupedRaw[svc]
    }

    return res.json({ success: true, data: grouped, meta })
  } catch (err) {
    console.error('Pricing fetch error:', err)
    return res.status(500).json({ success: false, message: 'Server error' })
  }
})

module.exports = router
