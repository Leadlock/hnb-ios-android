const express = require('express')
const { body, validationResult } = require('express-validator')
const pool = require('../db')
const { sendMail, jobConfirmation, jobAdminAlert } = require('../mailer')

const router = express.Router()

const VALID_POSITIONS = [
  'delivery-driver',
  'laundry-operator',
  'garment-care',
  'customer-support',
  'ironing-pressing',
  'general-staff',
]

const rules = [
  body('position')
    .trim()
    .notEmpty().withMessage('Position is required')
    .isIn(VALID_POSITIONS).withMessage('Invalid position selected'),
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('phone')
    .trim()
    .notEmpty().withMessage('Phone number is required')
    .matches(/^[6-9]\d{9}$/).withMessage('Enter a valid 10-digit Indian mobile number'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email address is required')
    .isEmail().withMessage('Enter a valid email address'),
  body('message').trim().optional(),
]

router.post('/', rules, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() })
  }

  const { position, name, phone, email, message } = req.body

  try {
    const [result] = await pool.execute(
      `INSERT INTO job_applications
        (position, name, phone, email, message)
       VALUES (?, ?, ?, ?, ?)`,
      [position, name, phone, email, message || null]
    )

    const id = result.insertId
    const data = { position, name, phone, email, message, id }

    pool.execute('SELECT email FROM admin_users').then(([admins]) => {
      const adminEmails = admins.map(a => a.email)
      Promise.allSettled([
        sendMail({
          to: email,
          subject: 'Application Received — Hangers & Baskets',
          html: jobConfirmation(data),
        }),
        ...adminEmails.map(adminEmail => sendMail({
          to: adminEmail,
          subject: `New Job Application — ${name}`,
          html: jobAdminAlert(data),
        })),
      ])
    }).catch(err => console.error('[jobs] Admin email lookup failed:', err.message))

    return res.status(201).json({
      success: true,
      message: 'Application submitted successfully.',
      id,
    })
  } catch (err) {
    console.error('Job application error:', err)
    return res.status(500).json({ success: false, message: 'Something went wrong. Please try again.' })
  }
})

module.exports = router
