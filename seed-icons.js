require('dotenv').config()
const fs   = require('fs')
const path = require('path')
const pool = require('./db')

// Map service_type (DB value) → SVG filename in src/assets/icons/
const SERVICE_ICONS = {
  'Dry Cleaning':                              'dry_cleaning.svg',
  'Wash & Iron':                               'wash_iron.svg',
  'Wash & Fold':                               'wash_fold.svg',
  'Steam Press':                               'steam_pressing.svg',
  'Carpet, Sofa & Chairs':                     'carpet_cleaning.svg',
  'Shoe Cleaning':                             'shoe_care.svg',
  'Bag Cleaning':                              'bag_care.svg',
  'Curtain, Bedding Linens & Towel & Baths':   'curtain_cleaning.svg',
  'Toy & Baby Care':                           'toy_cleaning.svg',
  'Commercial Laundry':                        'commercial_laundry.svg',
}

const ICONS_DIR = path.join(__dirname, 'src', 'assets', 'icons')

async function seed() {
  console.log('  Seeding SVG icons into service_metadata...\n')

  for (const [serviceType, filename] of Object.entries(SERVICE_ICONS)) {
    const filePath = path.join(ICONS_DIR, filename)

    if (!fs.existsSync(filePath)) {
      console.warn(`  ⚠ SVG not found, skipping: ${filename}`)
      continue
    }

    const svgContent = fs.readFileSync(filePath, 'utf8').trim()

    await pool.execute(
      `INSERT INTO service_metadata (service_type, svg_icon)
       VALUES (?, ?)
       ON DUPLICATE KEY UPDATE svg_icon = VALUES(svg_icon)`,
      [serviceType, svgContent]
    )

    console.log(`  ✓ ${serviceType}`)
  }

  console.log('\n  Done. SVG icons seeded successfully.')
  await pool.end()
}

seed().catch(err => {
  console.error('✗ Failed:', err.message)
  process.exit(1)
})
