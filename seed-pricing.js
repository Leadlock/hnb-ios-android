require('dotenv').config()
const fs = require('fs')
const path = require('path')
const xlsx = require('xlsx')
const pool = require('./db')

const EXCEL_FILE = path.join(__dirname, 'FInal Rates for the Website.xlsx')

const SERVICE_HEADERS = new Set([
  'dry cleaning', 'wash & iron', 'wash & fold', 'steam press',
  'carpet, sofa & chairs', 'shoe cleaning', 'bag cleaning',
  'curtain, bedding linens & towel & baths', 'toy & baby care', 'soft toys cleaning',
])
const SUBSECTION_HEADERS = new Set(['curtain cleaning', 'bedding & linens', 'towel & bath'])

function parsePrice(raw) {
  const str = String(raw).trim()
  const numMatch = str.match(/[\d,]+(\.\d+)?/)
  const price = numMatch ? parseFloat(numMatch[0].replace(/,/g, '')) : 0
  let unit = 'piece'
  const lower = str.toLowerCase()
  if (lower.includes('kg'))           unit = 'kg'
  else if (lower.includes('sqft'))    unit = 'sqft'
  else if (lower.includes('pair'))    unit = 'pair'
  else if (lower.includes('job'))     unit = 'job'
  else if (lower.includes('2pc') || lower.includes('2 piece')) unit = '2pc'
  else if (lower.includes('3pc') || lower.includes('3 piece')) unit = '3pc'
  else if (lower.includes('piece'))   unit = 'piece'
  return { price, unit }
}

function parseExcel(buffer) {
  const wb = xlsx.read(buffer, { type: 'buffer' })
  const ws = wb.Sheets[wb.SheetNames[0]]
  const rows = xlsx.utils.sheet_to_json(ws, { header: 1 })
  if (!rows.length) return []

  const firstRow = rows[0].map(c => (c != null ? String(c).trim().toLowerCase() : ''))
  const isFlat = firstRow.includes('service type') || firstRow.includes('item name')

  if (isFlat) {
    const svcIdx   = firstRow.findIndex(h => h === 'service type')
    const catIdx   = firstRow.findIndex(h => h === 'category')
    const nameIdx  = firstRow.findIndex(h => h.includes('item'))
    const priceIdx = firstRow.findIndex(h => h.includes('price'))
    const unitIdx  = firstRow.findIndex(h => h === 'unit')

    const items = []
    let sortOrder = 0
    for (let i = 1; i < rows.length; i++) {
      const row      = rows[i]
      let svcType    = row[svcIdx]  != null ? String(row[svcIdx]).trim()  : ''
      const cat      = row[catIdx]  != null ? String(row[catIdx]).trim()  : ''
      const itemName = row[nameIdx] != null ? String(row[nameIdx]).trim() : ''
      const rawPrice = row[priceIdx]
      const unit     = row[unitIdx] != null ? String(row[unitIdx]).trim() : 'piece'
      if (!svcType || !itemName || rawPrice == null) continue
      const price = parseFloat(String(rawPrice).replace(/[^0-9.]/g, ''))
      if (isNaN(price) || price <= 0) continue
      // Normalize legacy service type names
      if (svcType.toLowerCase() === 'soft toys cleaning') svcType = 'Toy & Baby Care'
      items.push({ serviceType: svcType, category: cat, itemName, price, unit, sortOrder: sortOrder++ })
    }
    return items
  }

  // Legacy sparse format
  const items = []
  let serviceType = '', category = '', sortOrder = 0
  for (const row of rows) {
    const colA = row[0] != null ? String(row[0]).trim() : ''
    const colB = row[1] != null ? String(row[1]).trim() : ''
    const colD = row[3] != null ? String(row[3]).trim() : ''
    if (!colA && !colB) continue
    const colALower = colA.toLowerCase()
    if (colA && !row[1]) {
      if (SERVICE_HEADERS.has(colALower))         {
        serviceType = colALower === 'soft toys cleaning' ? 'Toy & Baby Care' : colA
        category = ''
      }
      else if (SUBSECTION_HEADERS.has(colALower)) { category = colA }
      else if (colA)                              { category = colA }
      continue
    }
    if (colB && colD && colD.trim() !== '') {
      const { price, unit } = parsePrice(colD)
      if (price > 0) items.push({ serviceType, category, itemName: colB, price, unit, sortOrder: sortOrder++ })
    }
  }
  return items
}


async function seed() {
  if (!fs.existsSync(EXCEL_FILE)) {
    console.error(`✗ Excel file not found: ${EXCEL_FILE}`)
    process.exit(1)
  }

  const buffer = fs.readFileSync(EXCEL_FILE)
  const items = parseExcel(buffer)

  if (items.length === 0) {
    console.error('✗ No valid rows found in Excel file. Check the format.')
    process.exit(1)
  }

  console.log(`  Found ${items.length} pricing items — seeding...`)

  const conn = await pool.getConnection()
  try {
    await conn.execute('DELETE FROM pricing_items')

    for (const item of items) {
      await conn.execute(
        'INSERT INTO pricing_items (service_type, category, item_name, price, unit, sort_order) VALUES (?, ?, ?, ?, ?, ?)',
        [item.serviceType, item.category, item.itemName, item.price, item.unit, item.sortOrder]
      )
    }

    console.log(`  ✓ Seeded ${items.length} pricing items successfully.`)
  } finally {
    conn.release()
    await pool.end()
  }
}

seed().catch(err => {
  console.error('✗ Seed failed:', err.message)
  process.exit(1)
})
