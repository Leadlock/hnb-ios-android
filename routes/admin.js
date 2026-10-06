const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const multer = require('multer')
const xlsx = require('xlsx')
const pool = require('../db')
const auth = require('../middleware/auth')
const { sendMail, adminPasswordReset } = require('../mailer')

const router = express.Router()
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } })

// POST /api/admin/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' })
  }
  try {
    const [rows] = await pool.execute('SELECT * FROM admin_users WHERE email = ?', [email.trim().toLowerCase()])
    if (!rows.length) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' })
    }
    const admin = rows[0]
    const match = await bcrypt.compare(password, admin.password_hash)
    if (!match) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' })
    }
    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '8h' }
    )
    return res.json({ success: true, token })
  } catch (err) {
    console.error('Admin login error:', err)
    return res.status(500).json({ success: false, message: 'Server error' })
  }
})

// POST /api/admin/forgot-password
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body
  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' })
  }

  const genericResponse = { success: true, message: 'If that email exists, a reset link has been sent.' }

  try {
    const [rows] = await pool.execute('SELECT id, email FROM admin_users WHERE email = ?', [email.trim().toLowerCase()])
    if (!rows.length) {
      return res.json(genericResponse)
    }
    const admin = rows[0]

    const rawToken = crypto.randomBytes(32).toString('hex')
    const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex')
    const expires = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

    await pool.execute(
      'UPDATE admin_users SET reset_token = ?, reset_token_expires = ? WHERE id = ?',
      [hashedToken, expires, admin.id]
    )

    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/data-dash?reset=${rawToken}`
    await sendMail({
      to: admin.email,
      subject: 'Reset Your Password — Hangers & Basket Admin',
      html: adminPasswordReset({ resetUrl }),
    })

    return res.json(genericResponse)
  } catch (err) {
    console.error('Forgot password error:', err)
    return res.json(genericResponse)
  }
})

// POST /api/admin/reset-password
router.post('/reset-password', async (req, res) => {
  const { token, password } = req.body
  if (!token || !password) {
    return res.status(400).json({ success: false, message: 'Token and new password are required' })
  }
  if (password.length < 8) {
    return res.status(400).json({ success: false, message: 'Password must be at least 8 characters' })
  }

  try {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex')
    const [rows] = await pool.execute(
      'SELECT id FROM admin_users WHERE reset_token = ? AND reset_token_expires > NOW()',
      [hashedToken]
    )
    if (!rows.length) {
      return res.status(400).json({ success: false, message: 'This reset link is invalid or has expired.' })
    }
    const admin = rows[0]

    const password_hash = await bcrypt.hash(password, 10)
    await pool.execute(
      'UPDATE admin_users SET password_hash = ?, reset_token = NULL, reset_token_expires = NULL WHERE id = ?',
      [password_hash, admin.id]
    )

    return res.json({ success: true, message: 'Password updated successfully.' })
  } catch (err) {
    console.error('Reset password error:', err)
    return res.status(500).json({ success: false, message: 'Server error' })
  }
})

// GET /api/admin/stats
router.get('/stats', auth, async (req, res) => {
  try {
    const [[{ total_franchise }]] = await pool.execute('SELECT COUNT(*) AS total_franchise FROM franchise_enquiries')
    const [[{ total_jobs }]] = await pool.execute('SELECT COUNT(*) AS total_jobs FROM job_applications')
    const [[{ today_franchise }]] = await pool.execute(
      'SELECT COUNT(*) AS today_franchise FROM franchise_enquiries WHERE DATE(created_at) = CURDATE()'
    )
    const [[{ today_jobs }]] = await pool.execute(
      'SELECT COUNT(*) AS today_jobs FROM job_applications WHERE DATE(created_at) = CURDATE()'
    )
    const [[{ month_franchise }]] = await pool.execute(
      'SELECT COUNT(*) AS month_franchise FROM franchise_enquiries WHERE MONTH(created_at) = MONTH(CURDATE()) AND YEAR(created_at) = YEAR(CURDATE())'
    )
    const [[{ month_jobs }]] = await pool.execute(
      'SELECT COUNT(*) AS month_jobs FROM job_applications WHERE MONTH(created_at) = MONTH(CURDATE()) AND YEAR(created_at) = YEAR(CURDATE())'
    )
    const [[{ unread_franchise }]] = await pool.execute('SELECT COUNT(*) AS unread_franchise FROM franchise_enquiries WHERE is_read = 0')
    const [[{ unread_jobs }]] = await pool.execute('SELECT COUNT(*) AS unread_jobs FROM job_applications WHERE is_read = 0')

    return res.json({
      success: true,
      stats: {
        totalFranchise:  total_franchise,
        totalJobs:       total_jobs,
        todayFranchise:  today_franchise,
        todayJobs:       today_jobs,
        monthFranchise:  month_franchise,
        monthJobs:       month_jobs,
        unreadFranchise: unread_franchise,
        unreadJobs:      unread_jobs,
      },
    })
  } catch (err) {
    console.error('Stats error:', err)
    return res.status(500).json({ success: false, message: 'Server error' })
  }
})

// GET /api/admin/franchise
router.get('/franchise', auth, async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM franchise_enquiries ORDER BY created_at DESC'
    )
    return res.json({ success: true, data: rows })
  } catch (err) {
    console.error('Franchise fetch error:', err)
    return res.status(500).json({ success: false, message: 'Server error' })
  }
})

// GET /api/admin/jobs
router.get('/jobs', auth, async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM job_applications ORDER BY created_at DESC'
    )
    return res.json({ success: true, data: rows })
  } catch (err) {
    console.error('Jobs fetch error:', err)
    return res.status(500).json({ success: false, message: 'Server error' })
  }
})

// PATCH /api/admin/franchise/bulk-read  (must be before /:id/read)
router.patch('/franchise/bulk-read', auth, async (req, res) => {
  const { ids } = req.body
  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ success: false, message: 'No IDs provided' })
  }
  try {
    const placeholders = ids.map(() => '?').join(',')
    await pool.execute(`UPDATE franchise_enquiries SET is_read = 1 WHERE id IN (${placeholders})`, ids)
    return res.json({ success: true })
  } catch (err) {
    console.error('Bulk mark franchise read error:', err)
    return res.status(500).json({ success: false, message: 'Server error' })
  }
})

// PATCH /api/admin/jobs/bulk-read  (must be before /:id/read)
router.patch('/jobs/bulk-read', auth, async (req, res) => {
  const { ids } = req.body
  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ success: false, message: 'No IDs provided' })
  }
  try {
    const placeholders = ids.map(() => '?').join(',')
    await pool.execute(`UPDATE job_applications SET is_read = 1 WHERE id IN (${placeholders})`, ids)
    return res.json({ success: true })
  } catch (err) {
    console.error('Bulk mark jobs read error:', err)
    return res.status(500).json({ success: false, message: 'Server error' })
  }
})

// PATCH /api/admin/franchise/:id/read
router.patch('/franchise/:id/read', auth, async (req, res) => {
  const { id } = req.params
  try {
    await pool.execute('UPDATE franchise_enquiries SET is_read = 1 WHERE id = ?', [id])
    return res.json({ success: true })
  } catch (err) {
    console.error('Mark franchise read error:', err)
    return res.status(500).json({ success: false, message: 'Server error' })
  }
})

// PATCH /api/admin/jobs/:id/read
router.patch('/jobs/:id/read', auth, async (req, res) => {
  const { id } = req.params
  try {
    await pool.execute('UPDATE job_applications SET is_read = 1 WHERE id = ?', [id])
    return res.json({ success: true })
  } catch (err) {
    console.error('Mark job read error:', err)
    return res.status(500).json({ success: false, message: 'Server error' })
  }
})

// DELETE /api/admin/pricing/:id
router.delete('/pricing/:id', auth, async (req, res) => {
  const { id } = req.params
  try {
    await pool.execute('DELETE FROM pricing_items WHERE id = ?', [id])
    return res.json({ success: true })
  } catch (err) {
    console.error('Pricing delete error:', err)
    return res.status(500).json({ success: false, message: 'Server error' })
  }
})

// DELETE /api/admin/franchise/:id
router.delete('/franchise/:id', auth, async (req, res) => {
  const { id } = req.params
  try {
    await pool.execute('DELETE FROM franchise_enquiries WHERE id = ?', [id])
    return res.json({ success: true })
  } catch (err) {
    console.error('Delete franchise error:', err)
    return res.status(500).json({ success: false, message: 'Server error' })
  }
})

// DELETE /api/admin/jobs/:id
router.delete('/jobs/:id', auth, async (req, res) => {
  const { id } = req.params
  try {
    await pool.execute('DELETE FROM job_applications WHERE id = ?', [id])
    return res.json({ success: true })
  } catch (err) {
    console.error('Delete job error:', err)
    return res.status(500).json({ success: false, message: 'Server error' })
  }
})

// ── Pricing routes ──────────────────────────────────────────────────────────

// GET /api/admin/pricing
router.get('/pricing', auth, async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM pricing_items WHERE is_active = 1 ORDER BY sort_order ASC'
    )
    return res.json({ success: true, data: rows })
  } catch (err) {
    console.error('Admin pricing fetch error:', err)
    return res.status(500).json({ success: false, message: 'Server error' })
  }
})

// GET /api/admin/pricing/export — download as xlsx
router.get('/pricing/export', auth, async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT service_type, category, item_name, price, unit FROM pricing_items WHERE is_active = 1 ORDER BY sort_order ASC'
    )
    const data = [
      ['Service Type', 'Category', 'Item Name', 'Price (INR)', 'Unit'],
      ...rows.map(r => [r.service_type, r.category || '', r.item_name, r.price, r.unit]),
    ]
    const ws = xlsx.utils.aoa_to_sheet(data)
    ws['!cols'] = [{ wch: 38 }, { wch: 28 }, { wch: 45 }, { wch: 14 }, { wch: 10 }]
    const wb = xlsx.utils.book_new()
    xlsx.utils.book_append_sheet(wb, ws, 'Pricing')
    const buf = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' })
    res.setHeader('Content-Disposition', 'attachment; filename="HB-Pricing.xlsx"')
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    return res.send(buf)
  } catch (err) {
    console.error('Pricing export error:', err)
    return res.status(500).json({ success: false, message: 'Server error' })
  }
})

// POST /api/admin/pricing — add a new item
router.post('/pricing', auth, async (req, res) => {
  const { service_type, category, item_name, price, unit } = req.body
  if (!service_type || !item_name || price == null) {
    return res.status(400).json({ success: false, message: 'service_type, item_name and price are required' })
  }
  try {
    const [[{ maxOrder }]] = await pool.execute('SELECT MAX(sort_order) AS maxOrder FROM pricing_items')
    const sortOrder = (maxOrder ?? 0) + 1
    const [result] = await pool.execute(
      'INSERT INTO pricing_items (service_type, category, item_name, price, unit, sort_order) VALUES (?, ?, ?, ?, ?, ?)',
      [service_type, category || '', item_name, price, unit || 'piece', sortOrder]
    )
    return res.json({
      success: true,
      item: { id: result.insertId, service_type, category: category || '', item_name, price, unit: unit || 'piece', sort_order: sortOrder },
    })
  } catch (err) {
    console.error('Pricing add error:', err)
    return res.status(500).json({ success: false, message: 'Server error' })
  }
})

// PATCH /api/admin/pricing/:id
router.patch('/pricing/:id', auth, async (req, res) => {
  const { id } = req.params
  const { price, unit, item_name } = req.body
  if (price === undefined && !unit && !item_name) {
    return res.status(400).json({ success: false, message: 'Nothing to update' })
  }
  try {
    const fields = []
    const values = []
    if (price !== undefined) { fields.push('price = ?'); values.push(price) }
    if (unit)      { fields.push('unit = ?');      values.push(unit) }
    if (item_name) { fields.push('item_name = ?'); values.push(item_name) }
    values.push(id)
    await pool.execute(`UPDATE pricing_items SET ${fields.join(', ')} WHERE id = ?`, values)
    return res.json({ success: true })
  } catch (err) {
    console.error('Pricing update error:', err)
    return res.status(500).json({ success: false, message: 'Server error' })
  }
})

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

const SERVICE_HEADERS = new Set([
  'dry cleaning', 'wash & iron', 'wash & fold', 'steam press',
  'carpet, sofa & chairs', 'shoe cleaning', 'bag cleaning',
  'curtain, bedding linens & towel & baths', 'soft toys cleaning',
])
const SUBSECTION_HEADERS = new Set(['curtain cleaning', 'bedding & linens', 'towel & bath'])

function parseExcel(buffer) {
  const wb = xlsx.read(buffer, { type: 'buffer' })
  const ws = wb.Sheets[wb.SheetNames[0]]
  const rows = xlsx.utils.sheet_to_json(ws, { header: 1 })
  if (!rows.length) return []

  // Detect flat template format: first row contains "Service Type" header
  const firstRow = rows[0].map(c => (c != null ? String(c).trim().toLowerCase() : ''))
  const isFlat = firstRow.includes('service type') || firstRow.includes('item name')

  if (isFlat) {
    // Flat format: Service Type | Category | Item Name | Price (INR) | Unit
    const svcIdx   = firstRow.findIndex(h => h === 'service type')
    const catIdx   = firstRow.findIndex(h => h === 'category')
    const nameIdx  = firstRow.findIndex(h => h.includes('item'))
    const priceIdx = firstRow.findIndex(h => h.includes('price'))
    const unitIdx  = firstRow.findIndex(h => h === 'unit')

    const items = []
    let sortOrder = 0
    for (let i = 1; i < rows.length; i++) {
      const row      = rows[i]
      const svcType  = row[svcIdx]  != null ? String(row[svcIdx]).trim()  : ''
      const cat      = row[catIdx]  != null ? String(row[catIdx]).trim()  : ''
      const itemName = row[nameIdx] != null ? String(row[nameIdx]).trim() : ''
      const rawPrice = row[priceIdx]
      const unit     = row[unitIdx] != null ? String(row[unitIdx]).trim() : 'piece'
      if (!svcType || !itemName || rawPrice == null) continue
      const price = parseFloat(String(rawPrice).replace(/[^0-9.]/g, ''))
      if (isNaN(price) || price <= 0) continue
      items.push({ serviceType: svcType, category: cat, itemName, price, unit, sortOrder: sortOrder++ })
    }
    return items
  }

  // Legacy sparse format (original Excel layout)
  const items = []
  let serviceType = '', category = '', sortOrder = 0
  for (const row of rows) {
    const colA = row[0] != null ? String(row[0]).trim() : ''
    const colB = row[1] != null ? String(row[1]).trim() : ''
    const colD = row[3] != null ? String(row[3]).trim() : ''
    if (!colA && !colB) continue
    const colALower = colA.toLowerCase()
    if (colA && !row[1]) {
      if (SERVICE_HEADERS.has(colALower))         { serviceType = colA; category = '' }
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

// ── Service Metadata routes ──────────────────────────────────────────────────

// GET /api/admin/service-meta
router.get('/service-meta', auth, async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT service_type, description, svg_icon, accent_color, sort_order FROM service_metadata ORDER BY sort_order ASC, service_type ASC'
    )
    const meta = {}
    for (const r of rows) meta[r.service_type] = { description: r.description, svg_icon: r.svg_icon, accent_color: r.accent_color, sort_order: r.sort_order }
    return res.json({ success: true, data: meta })
  } catch (err) {
    console.error('Service meta fetch error:', err)
    return res.status(500).json({ success: false, message: 'Server error' })
  }
})

// PATCH /api/admin/service-meta/reorder  — must be before /:type
router.patch('/service-meta/reorder', auth, async (req, res) => {
  const { order } = req.body
  if (!Array.isArray(order) || order.length === 0) {
    return res.status(400).json({ success: false, message: 'order array required' })
  }
  try {
    const conn = await pool.getConnection()
    try {
      for (let i = 0; i < order.length; i++) {
        await conn.execute(
          `INSERT INTO service_metadata (service_type, sort_order)
           VALUES (?, ?)
           ON DUPLICATE KEY UPDATE sort_order = VALUES(sort_order)`,
          [order[i], i + 1]
        )
      }
    } finally {
      conn.release()
    }
    return res.json({ success: true })
  } catch (err) {
    console.error('Service meta reorder error:', err)
    return res.status(500).json({ success: false, message: 'Server error' })
  }
})

// PATCH /api/admin/service-meta/:type
router.patch('/service-meta/:type', auth, async (req, res) => {
  const serviceType = decodeURIComponent(req.params.type)
  const { description, svg_icon, accent_color } = req.body
  try {
    await pool.execute(
      `INSERT INTO service_metadata (service_type, description, svg_icon, accent_color)
       VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         description  = VALUES(description),
         svg_icon     = VALUES(svg_icon),
         accent_color = VALUES(accent_color)`,
      [serviceType, description ?? null, svg_icon ?? null, accent_color || '#1F5FFF']
    )
    return res.json({ success: true })
  } catch (err) {
    console.error('Service meta update error:', err)
    return res.status(500).json({ success: false, message: 'Server error' })
  }
})

// POST /api/admin/pricing/upload
router.post('/pricing/upload', auth, upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' })
  try {
    const items = parseExcel(req.file.buffer)
    if (items.length === 0) return res.status(400).json({ success: false, message: 'No valid rows found in file' })
    const conn = await pool.getConnection()
    try {
      await conn.execute('DELETE FROM pricing_items')
      for (const item of items) {
        await conn.execute(
          'INSERT INTO pricing_items (service_type, category, item_name, price, unit, sort_order) VALUES (?, ?, ?, ?, ?, ?)',
          [item.serviceType, item.category, item.itemName, item.price, item.unit, item.sortOrder]
        )
      }
    } finally {
      conn.release()
    }
    return res.json({ success: true, count: items.length })
  } catch (err) {
    console.error('Pricing upload error:', err)
    return res.status(500).json({ success: false, message: 'Server error' })
  }
})

module.exports = router
