const xlsx = require('xlsx')
const path = require('path')

const SERVICES = [
  'Dry Cleaning',
  'Wash & Iron',
  'Wash & Fold',
  'Steam Press',
  'Carpet, Sofa & Chairs',
  'Shoe Cleaning',
  'Bag Cleaning',
  'Curtain, Bedding Linens & Towel & Baths',
  'Soft Toys Cleaning',
]

const UNITS = ['piece', 'kg', 'pair', 'sqft', 'job', '2pc', '3pc']

const rows = [
  ['Service Type', 'Category', 'Item Name', 'Price (INR)', 'Unit'],
  ...SERVICES.map(s => [s, '', 'Example Item', 0, 'piece']),
]

const ws = xlsx.utils.aoa_to_sheet(rows)

// Column widths
ws['!cols'] = [{ wch: 42 }, { wch: 28 }, { wch: 45 }, { wch: 14 }, { wch: 10 }]

// Note sheet with unit options
const noteRows = [
  ['Valid Unit Values'],
  ...UNITS.map(u => [u]),
]
const wsNotes = xlsx.utils.aoa_to_sheet(noteRows)

const wb = xlsx.utils.book_new()
xlsx.utils.book_append_sheet(wb, ws, 'Pricing')
xlsx.utils.book_append_sheet(wb, wsNotes, 'Units Reference')

const outPath = path.join(__dirname, 'pricing-template.xlsx')
xlsx.writeFile(wb, outPath)
console.log(`✓ Template generated: ${outPath}`)
