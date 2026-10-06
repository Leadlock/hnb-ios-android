require('dotenv').config()
const fs = require('fs')
const path = require('path')
const mysql = require('mysql2/promise')

async function runMigration() {
  console.log('--- Starting Database Migration ---')
  const schemaFile = path.join(__dirname, 'schema.sql')
  if (!fs.existsSync(schemaFile)) {
    console.error(`Schema file not found at ${schemaFile}`)
    process.exit(1)
  }

  const sql = fs.readFileSync(schemaFile, 'utf8')

  // Connect without database first or directly with database
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    multipleStatements: true,
  })

  try {
    console.log('Applying schema.sql...')
    await connection.query(sql)
    console.log('✓ schema.sql executed successfully!')

    // Check all tables created
    await connection.query('USE ' + (process.env.DB_NAME || 'hangers_baskets'))
    const [tables] = await connection.query('SHOW TABLES')
    console.log('Existing tables in database:')
    console.table(tables)
  } catch (err) {
    console.error('✗ Migration error:', err)
    process.exit(1)
  } finally {
    await connection.end()
  }
}

runMigration()
