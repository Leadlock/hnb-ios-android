const express = require('express')
const { body, validationResult } = require('express-validator')
const pool = require('../db')
const { sendMail, franchiseConfirmation, franchiseAdminAlert } = require('../mailer')

const router = express.Router()

const rules = [
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().optional(),
  body('mobile')
    .trim()
    .notEmpty().withMessage('Mobile number is required')
    .matches(/^[6-9]\d{9}$/).withMessage('Enter a valid 10-digit Indian mobile number'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Enter a valid email address'),
  body('state').trim().notEmpty().withMessage('State is required'),
  body('city').trim().notEmpty().withMessage('City is required'),
  body('investmentRange').trim().optional(),
  body('timeline').trim().optional(),
]

router.post('/', rules, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() })
  }

  const { firstName, lastName, mobile, email, state, city, investmentRange, timeline } = req.body

  try {
    const [result] = await pool.execute(
      `INSERT INTO franchise_enquiries
        (first_name, last_name, mobile, email, state, city, investment_range, timeline)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [firstName, lastName || null, mobile, email, state, city, investmentRange || null, timeline || null]
    )

    const id = result.insertId
    const data = { firstName, lastName, mobile, email, state, city, investmentRange, timeline, id }

    pool.execute('SELECT email FROM admin_users').then(([admins]) => {
      const adminEmails = admins.map(a => a.email)
      Promise.allSettled([
        sendMail({
          to: email,
          subject: 'Your Franchise Enquiry — Hangers & Baskets',
          html: franchiseConfirmation(data),
        }),
        ...adminEmails.map(adminEmail => sendMail({
          to: adminEmail,
          subject: `New Franchise Enquiry — ${firstName}${lastName ? ' ' + lastName : ''}, ${city}`,
          html: franchiseAdminAlert(data),
        })),
      ])
    }).catch(err => console.error('[franchise] Admin email lookup failed:', err.message))

    return res.status(201).json({
      success: true,
      message: 'Franchise enquiry submitted successfully.',
      id,
    })
  } catch (err) {
    console.error('Franchise enquiry error:', err)
    return res.status(500).json({ success: false, message: 'Something went wrong. Please try again.' })
  }
})

module.exports = router
