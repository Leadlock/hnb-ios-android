require('dotenv').config()
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT) || 465,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

const FROM  = process.env.EMAIL_FROM || `"Hangers & Basket" <${process.env.SMTP_USER}>`
const ADMIN = process.env.SMTP_USER

// ── Base wrapper ───────────────────────────────────────────────────────────
const wrap = (body) => `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
<tr><td align="center">
<table width="100%" style="max-width:560px;">
  <tr><td style="background:linear-gradient(145deg,#050d20 0%,#0b1d4a 60%,#071830 100%);padding:24px 32px;border-radius:14px 14px 0 0;">
    <span style="font-size:22px;font-weight:800;color:#ffffff;letter-spacing:-0.03em;">Hangers &amp; Basket</span><br>
    <span style="font-size:11px;font-weight:500;color:#00C4CC;letter-spacing:0.08em;text-transform:uppercase;">Premium Care Service</span>
  </td></tr>
  <tr><td style="background:#ffffff;padding:36px 32px;border-left:1px solid #e2e8f0;border-right:1px solid #e2e8f0;">
    ${body}
  </td></tr>
  <tr><td style="background:linear-gradient(145deg,#050d20 0%,#0b1d4a 100%);padding:24px 32px;border-radius:0 0 14px 14px;text-align:center;">
    <p style="margin:0 0 10px;font-size:12px;color:rgba(255,255,255,0.5);">Need help? Contact us</p>
    <p style="margin:0 0 6px;">
      <a href="tel:+917045110011" style="font-size:13px;font-weight:600;color:#00C4CC;text-decoration:none;">📞 +91 7045110011</a>
    </p>
    <p style="margin:0 0 16px;">
      <a href="mailto:info@hnb.co.in" style="font-size:13px;font-weight:600;color:#00C4CC;text-decoration:none;">✉️ info@hnb.co.in</a>
    </p>
    <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.3);">© 2025 Hangers &amp; Basket. All rights reserved.</p>
  </td></tr>
</table>
</td></tr>
</table>
</body></html>`

const tr = (label, value) => value
  ? `<tr>
      <td style="font-size:13px;color:#64748b;padding:7px 0;width:40%;vertical-align:top;">${label}</td>
      <td style="font-size:13px;color:#0f172a;font-weight:600;padding:7px 0;">${value}</td>
    </tr>`
  : ''

// ── Franchise templates ────────────────────────────────────────────────────
function franchiseConfirmation({ firstName, lastName, email, mobile, city, state, investmentRange, timeline }) {
  const fullName = [firstName, lastName].filter(Boolean).join(' ')
  return wrap(`
    <h2 style="margin:0 0 8px;font-size:22px;font-weight:800;color:#0f172a;letter-spacing:-0.03em;">Enquiry Received!</h2>
    <p style="margin:0 0 28px;color:#64748b;font-size:14px;line-height:1.7;">
      Hi <strong style="color:#0f172a;">${firstName}</strong>, thank you for your interest in a Hangers &amp; Basket franchise.
      Our team will review your details and reach out within <strong style="color:#0f172a;">24 hours</strong>.
    </p>

    <div style="background:#f8fafc;border-radius:10px;padding:20px 24px;margin-bottom:28px;border:1px solid #e2e8f0;">
      <p style="margin:0 0 14px;font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:0.08em;text-transform:uppercase;">Your Enquiry Summary</p>
      <table width="100%" cellpadding="0" cellspacing="0">
        ${tr('Full Name', fullName)}
        ${tr('Mobile', mobile)}
        ${tr('Email', email)}
        ${tr('Location', `${city}, ${state}`)}
        ${tr('Investment Range', investmentRange || '—')}
        ${tr('Timeline', timeline || '—')}
      </table>
    </div>

    <p style="margin:0 0 28px;color:#64748b;font-size:13.5px;line-height:1.7;">
      Our franchise team will contact you at <strong style="color:#0f172a;">${email}</strong> or <strong style="color:#0f172a;">${mobile}</strong>. We look forward to partnering with you.
    </p>

    <div style="padding-top:24px;border-top:1px solid #f1f5f9;">
      <p style="margin:0;font-size:12.5px;color:#94a3b8;">If you have questions in the meantime, simply reply to this email and our team will be happy to help.</p>
    </div>
  `)
}

function franchiseAdminAlert({ firstName, lastName, email, mobile, city, state, investmentRange, timeline, id }) {
  const fullName = [firstName, lastName].filter(Boolean).join(' ')
  return wrap(`
    <div style="display:inline-block;background:#dcfce7;color:#15803d;font-size:11px;font-weight:700;padding:4px 12px;border-radius:20px;letter-spacing:0.06em;margin-bottom:20px;">NEW FRANCHISE ENQUIRY</div>
    <h2 style="margin:0 0 6px;font-size:20px;font-weight:800;color:#0f172a;letter-spacing:-0.02em;">${fullName}</h2>
    <p style="margin:0 0 28px;color:#64748b;font-size:13.5px;">${city}, ${state}&nbsp;&nbsp;·&nbsp;&nbsp;Ref #${id}</p>

    <div style="background:#f8fafc;border-radius:10px;padding:20px 24px;border:1px solid #e2e8f0;margin-bottom:24px;">
      <p style="margin:0 0 14px;font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:0.08em;text-transform:uppercase;">Enquiry Details</p>
      <table width="100%" cellpadding="0" cellspacing="0">
        ${tr('Full Name', fullName)}
        ${tr('Mobile', mobile)}
        ${tr('Email', email)}
        ${tr('State', state)}
        ${tr('City', city)}
        ${tr('Investment Range', investmentRange || '—')}
        ${tr('Timeline', timeline || '—')}
      </table>
    </div>

    <a href="mailto:${email}" style="display:inline-block;background:#0f172a;color:#ffffff;font-size:13px;font-weight:600;padding:12px 24px;border-radius:8px;text-decoration:none;letter-spacing:0.01em;">Reply to ${firstName} →</a>
  `)
}

// ── Jobs templates ─────────────────────────────────────────────────────────
const POSITION_LABELS = {
  'delivery-driver':  'Delivery Driver',
  'laundry-operator': 'Laundry Operator',
  'garment-care':     'Garment Care Specialist',
  'customer-support': 'Customer Support',
  'ironing-pressing': 'Ironing & Pressing Staff',
  'general-staff':    'General Staff / Open Application',
}

function jobConfirmation({ name, email, phone, position, message }) {
  const posLabel = POSITION_LABELS[position] || position
  return wrap(`
    <h2 style="margin:0 0 8px;font-size:22px;font-weight:800;color:#0f172a;letter-spacing:-0.03em;">Application Received!</h2>
    <p style="margin:0 0 28px;color:#64748b;font-size:14px;line-height:1.7;">
      Hi <strong style="color:#0f172a;">${name}</strong>, we've received your application for
      <strong style="color:#0f172a;">${posLabel}</strong>. Our team will review it and get back to you soon.
    </p>

    <div style="background:#f8fafc;border-radius:10px;padding:20px 24px;margin-bottom:28px;border:1px solid #e2e8f0;">
      <p style="margin:0 0 14px;font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:0.08em;text-transform:uppercase;">Application Summary</p>
      <table width="100%" cellpadding="0" cellspacing="0">
        ${tr('Position', posLabel)}
        ${tr('Name', name)}
        ${tr('Phone', phone)}
        ${tr('Email', email)}
        ${message ? tr('Your Note', message.length > 120 ? message.slice(0, 120) + '…' : message) : ''}
      </table>
    </div>

    <p style="margin:0 0 28px;color:#64748b;font-size:13.5px;line-height:1.7;">
      We typically respond within <strong style="color:#0f172a;">2–3 business days</strong>. We'll reach out at
      <strong style="color:#0f172a;">${email}</strong> or <strong style="color:#0f172a;">${phone}</strong>.
    </p>

    <div style="padding-top:24px;border-top:1px solid #f1f5f9;">
      <p style="margin:0;font-size:12.5px;color:#94a3b8;">If you have any questions, simply reply to this email.</p>
    </div>
  `)
}

function jobAdminAlert({ name, email, phone, position, message, id }) {
  const posLabel = POSITION_LABELS[position] || position
  return wrap(`
    <div style="display:inline-block;background:#dbeafe;color:#1d4ed8;font-size:11px;font-weight:700;padding:4px 12px;border-radius:20px;letter-spacing:0.06em;margin-bottom:20px;">NEW JOB APPLICATION</div>
    <h2 style="margin:0 0 6px;font-size:20px;font-weight:800;color:#0f172a;letter-spacing:-0.02em;">${name}</h2>
    <p style="margin:0 0 28px;color:#64748b;font-size:13.5px;">${posLabel}&nbsp;&nbsp;·&nbsp;&nbsp;Ref #${id}</p>

    <div style="background:#f8fafc;border-radius:10px;padding:20px 24px;border:1px solid #e2e8f0;margin-bottom:24px;">
      <p style="margin:0 0 14px;font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:0.08em;text-transform:uppercase;">Application Details</p>
      <table width="100%" cellpadding="0" cellspacing="0">
        ${tr('Position', posLabel)}
        ${tr('Name', name)}
        ${tr('Phone', phone)}
        ${tr('Email', email)}
        ${message ? `<tr>
          <td style="font-size:13px;color:#64748b;padding:7px 0;width:40%;vertical-align:top;">Message</td>
          <td style="font-size:13px;color:#0f172a;font-weight:500;padding:7px 0;line-height:1.6;">${message.replace(/\n/g, '<br>')}</td>
        </tr>` : ''}
      </table>
    </div>

    <a href="mailto:${email}" style="display:inline-block;background:#0f172a;color:#ffffff;font-size:13px;font-weight:600;padding:12px 24px;border-radius:8px;text-decoration:none;letter-spacing:0.01em;">Reply to ${name} →</a>
  `)
}

// ── Admin templates ────────────────────────────────────────────────────────
function adminPasswordReset({ resetUrl }) {
  return wrap(`
    <h2 style="margin:0 0 8px;font-size:22px;font-weight:800;color:#0f172a;letter-spacing:-0.03em;">Reset Your Password</h2>
    <p style="margin:0 0 28px;color:#64748b;font-size:14px;line-height:1.7;">
      We received a request to reset the password for your Hangers &amp; Basket admin account.
      Click the button below to choose a new password. This link expires in <strong style="color:#0f172a;">1 hour</strong>.
    </p>

    <table cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
      <tr><td style="border-radius:8px;background:#0f172a;">
        <a href="${resetUrl}" style="display:inline-block;padding:14px 28px;font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;letter-spacing:0.01em;">Reset Password →</a>
      </td></tr>
    </table>

    <p style="margin:0 0 28px;color:#94a3b8;font-size:12.5px;line-height:1.6;">
      If the button doesn't work, copy and paste this link into your browser:<br>
      <a href="${resetUrl}" style="color:#00C4CC;word-break:break-all;">${resetUrl}</a>
    </p>

    <div style="padding-top:24px;border-top:1px solid #f1f5f9;">
      <p style="margin:0;font-size:12.5px;color:#94a3b8;">Didn't request this? You can safely ignore this email — your password will not be changed.</p>
    </div>
  `)
}

// ── Send helper ────────────────────────────────────────────────────────────
const sendMail = async ({ to, subject, html }) => {
  try {
    await transporter.sendMail({ from: FROM, to, subject, html })
  } catch (err) {
    console.error(`[mailer] Failed to send to ${to}:`, err.message)
  }
}

module.exports = {
  sendMail,
  ADMIN,
  franchiseConfirmation,
  franchiseAdminAlert,
  jobConfirmation,
  jobAdminAlert,
  adminPasswordReset,
}
