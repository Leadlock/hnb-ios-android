// Run: node make-deploy-zip.js
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const AdmZip = require('adm-zip')

const ROOT = __dirname
const DEST = path.join(require('os').homedir(), 'Desktop', 'hnb-deploy.zip')

const INCLUDE_FILES = ['server.js', 'db.js', 'mailer.js', 'migrate.js', 'package.json', 'package-lock.json', 'schema.sql']
const INCLUDE_FOLDERS = ['dist', 'routes', 'middleware']

console.log('Building...')
execSync('npm run build', { stdio: 'inherit', cwd: ROOT })

console.log('Zipping...')
if (fs.existsSync(DEST)) fs.unlinkSync(DEST)

const zip = new AdmZip()

for (const file of INCLUDE_FILES) {
  const fp = path.join(ROOT, file)
  if (fs.existsSync(fp)) zip.addLocalFile(fp)
}

for (const folder of INCLUDE_FOLDERS) {
  const fp = path.join(ROOT, folder)
  if (fs.existsSync(fp)) zip.addLocalFolder(fp, folder)
}

zip.writeZip(DEST)
const mb = (fs.statSync(DEST).size / 1024 / 1024).toFixed(1)
console.log('Done: ' + mb + ' MB -> ' + DEST)
