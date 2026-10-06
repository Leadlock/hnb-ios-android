require('dotenv').config()
const bcrypt = require('bcryptjs')
const pool = require('./db')

async function main() {
  const email    = 'admin@hnb.co.in'
  const password = 'Han@Bas1127!'

  try {
    const hash = await bcrypt.hash(password, 12)
    await pool.execute(
      `INSERT INTO admin_users (email, password_hash)
       VALUES (?, ?)
       ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash)`,
      [email, hash]
    )
    console.log(`✓ Admin account saved for ${email}`)
    console.log('  You can now sign in at /data-dash')
  } catch (err) {
    console.error('✗ Error:', err.message)
  } finally {
    await pool.end()
    process.exit(0)
  }
}

main()
