require('dotenv').config()
const pool = require('./db')

// Default metadata for each service type — sort_order controls display order on the pricing page
const SERVICE_META = [
  { sort_order:  1, service_type: 'Dry Cleaning',                            accent_color: '#1F5FFF', description: 'Professional dry cleaning for delicate fabrics, suits, sarees, and formal wear. Gentle solvent-based process that preserves colour and texture.' },
  { sort_order:  2, service_type: 'Shoe Cleaning',                           accent_color: '#10B981', description: 'Expert cleaning and restoration for all types of footwear — sneakers, leather shoes, heels, and more.' },
  { sort_order:  3, service_type: 'Curtain, Bedding Linens & Towel & Baths', accent_color: '#14B8A6', description: 'Thorough cleaning for curtains, bed sheets, pillow covers, towels, and all home linen. Fresh, hygienic, and neatly folded.' },
  { sort_order:  4, service_type: 'Bag Cleaning',                            accent_color: '#EC4899', description: 'Careful cleaning for handbags, backpacks, and luggage. Suitable for leather, fabric, and synthetic materials.' },
  { sort_order:  5, service_type: 'Carpet, Sofa & Chairs',                   accent_color: '#F59E0B', description: 'Deep cleaning for carpets, sofas, and upholstered chairs. Removes dust, stains, and allergens using professional equipment.' },
  { sort_order:  6, service_type: 'Toy & Baby Care',                         accent_color: '#F97316', description: 'Safe, thorough cleaning for soft toys, strollers, prams, and baby car seats using child-safe, non-toxic products.' },
  { sort_order:  7, service_type: 'Wash & Iron',                             accent_color: '#0EA5E9', description: 'Full wash and crisp ironing for everyday clothing. Machine washed, dried, and pressed to perfection.' },
  { sort_order:  8, service_type: 'Wash & Fold',                             accent_color: '#6366F1', description: 'Convenient wash and fold service for bulk laundry. Cleaned, dried, and neatly folded — ready to store.' },
  { sort_order:  9, service_type: 'Steam Press',                             accent_color: '#8B5CF6', description: 'High-pressure steam pressing to remove stubborn creases and restore a sharp, fresh look to your garments.' },
  { sort_order: 10, service_type: 'Commercial Laundry',                      accent_color: '#0F766E', description: 'End-to-end commercial laundry services for hotels, restaurants, spas, and businesses. Bulk handling with industrial-grade equipment.' },
]

async function seed() {
  console.log(`  Seeding service metadata for ${SERVICE_META.length} services...`)

  for (const meta of SERVICE_META) {
    await pool.execute(
      `INSERT INTO service_metadata (service_type, description, svg_icon, accent_color, sort_order)
       VALUES (?, ?, NULL, ?, ?)
       ON DUPLICATE KEY UPDATE
         description  = VALUES(description),
         accent_color = VALUES(accent_color),
         sort_order   = VALUES(sort_order)`,
      [meta.service_type, meta.description, meta.accent_color, meta.sort_order]
    )
    console.log(`  ✓ [${meta.sort_order}] ${meta.service_type}`)
  }

  console.log('\n  Done. Sort order and SVG icons can be adjusted via the admin dashboard.')
  await pool.end()
}

seed().catch(err => {
  console.error('✗ Seed failed:', err.message)
  process.exit(1)
})
