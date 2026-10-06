require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const pool = require('./db')

const franchiseRoutes = require('./routes/franchise')
const jobsRoutes = require('./routes/jobs')
const adminRoutes = require('./routes/admin')
const pricingRoutes = require('./routes/pricing')
const consentRoutes = require('./routes/consent')

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  optionsSuccessStatus: 200,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve React frontend
app.use(express.static(path.join(__dirname, 'dist')))

// Health check
app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1')
    res.json({ status: 'ok', db: 'connected' })
  } catch {
    res.status(500).json({ status: 'error', db: 'disconnected' })
  }
})

// Routes
app.use('/api/franchise', franchiseRoutes)
app.use('/api/jobs', jobsRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/pricing', pricingRoutes)
app.use('/api/consent', consentRoutes)

// SPA fallback — serve React for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ success: false, message: 'Internal server error.' })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
