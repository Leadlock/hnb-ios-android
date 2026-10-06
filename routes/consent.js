const express = require('express')
const pool = require('../db')

const router = express.Router()

const CONSENT_VERSION = '1.0'
const VALID_ACTIONS = ['accepted_all', 'rejected_all', 'custom', 'withdrawn']

router.get('/version', (req, res) => {
  res.json({ version: CONSENT_VERSION })
})

router.post('/', async (req, res) => {
  const { action, language, consent_version, choices } = req.body || {}

  if (!VALID_ACTIONS.includes(action)) {
    return res.status(400).json({ success: false, message: 'Invalid action' })
  }

  const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket.remoteAddress

  try {
    await pool.execute(
      `INSERT INTO consent_logs (ip_address, language, consent_version, choices, action)
       VALUES (?, ?, ?, ?, ?)`,
      [
        ip || null,
        String(language || 'en').slice(0, 10),
        String(consent_version || CONSENT_VERSION).slice(0, 20),
        JSON.stringify(choices || {}),
        action,
      ]
    )
  } catch (err) {
    console.error('[consent] log failed:', err.message)
  }

  res.json({ success: true })
})

module.exports = router
