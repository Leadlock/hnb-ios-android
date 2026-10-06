# Plesk Deployment Guide — Hangers & Baskets

> Node.js 16.20.2 serves both the API and the React frontend from one folder.

---

## Upload Folder Structure

```
hangers-baskets/
├── dist/              ← built React frontend (npm run build output)
├── routes/
├── middleware/
├── migrations/
├── server.js
├── db.js
├── mailer.js
├── create-admin.js
├── seed-pricing.js
├── seed-service-meta.js
├── generate-pricing-template.js
├── schema.sql
└── package.json
```

---

## Step 1 — Build Frontend Locally

```bash
npm run build
```

This creates the `dist/` folder at the project root.

---

## Step 2 — Prepare Upload Folder

On your local machine create a folder called `hangers-baskets/` and copy into it:

- `dist/` folder
- `routes/`, `middleware/`, `migrations/` folders
- `server.js`, `db.js`, `mailer.js`, `create-admin.js`
- `seed-pricing.js`, `seed-service-meta.js`, `generate-pricing-template.js`
- `schema.sql`, `package.json`

❌ Do NOT include: `node_modules/`, `.env`, `src/`, `vite.config.js`, `index.html`, `package-lock.json`

**Tip — zip it for faster upload:**
- Zip the entire `hangers-baskets/` folder
- Upload the zip via Plesk File Manager
- Right-click the zip in Plesk → **Extract**

---

## Step 3 — Upload to Plesk File Manager

1. Plesk → **Files**
2. Open `httpdocs/`
3. Create a new folder → name it `hangers-baskets`
4. Open that folder → upload all contents of your local `hangers-baskets/`

---

## Step 4 — Create `.env` on Server

Inside `httpdocs/hangers-baskets/`, click **New File** → name it `.env`:

```env
PORT=3001

DB_HOST=localhost
DB_PORT=3306
DB_USER=your_plesk_db_user
DB_PASSWORD=your_plesk_db_password
DB_NAME=hangers_baskets

FRONTEND_URL=https://yourdomain.com

JWT_SECRET=replace_with_long_random_string
JWT_EXPIRES_IN=8h

SMTP_HOST=smtp.zoho.in
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=info@yourdomain.com
SMTP_PASSWORD=your_smtp_password
EMAIL_FROM="Hangers & Baskets <info@yourdomain.com>"
```

> DB credentials → Plesk → **Databases** → your DB → **Connection Info**

---

## Step 5 — Create Database

1. Plesk → **Databases** → **Add Database**
   - Name: `hangers_baskets`
   - Create a DB user, save the credentials (use them in `.env` above)
2. Click **phpMyAdmin** on that DB
3. **Import** tab → upload `schema.sql` → Go

---

## Step 6 — Configure Node.js in Plesk

1. Plesk → **Dev Tools** → **Node.js**
2. Click **Enable Node.js**
3. Set:
   - **Node.js version**: `16.20.2`
   - **Application root**: `httpdocs/hangers-baskets`
   - **Application startup file**: `server.js`
   - **Document root**: `httpdocs/hangers-baskets/dist`
4. Click **Apply**
5. Click **NPM Install**
6. Click **Start**

---

## Step 7 — Add nginx Proxy

1. Plesk → **Hosting & DNS** → **Apache & nginx Settings**
2. **Additional nginx directives** → paste:

```nginx
location /api/ {
    proxy_pass http://127.0.0.1:3001/api/;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}

location / {
    proxy_pass http://127.0.0.1:3001/;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
}
```

3. Click **OK**

---

## Step 8 — Create Admin Account

In Plesk SSH terminal or Node.js **Run Script** panel:

```bash
cd httpdocs/hangers-baskets
node create-admin.js
```

---

## Step 9 — Seed Database (Optional)

Run these if you want to populate pricing and service metadata:

```bash
node seed-service-meta.js   # seed service descriptions
node seed-pricing.js        # seed prices from Excel
```

---

## Step 10 — SSL Certificate

Plesk → **Security** → **SSL/TLS Certificates** → **Get it free** (Let's Encrypt) → Install.

---

## Checklist

- [ ] `npm run build` done locally
- [ ] `hangers-baskets/` folder prepared with `dist/` inside
- [ ] Uploaded to `httpdocs/hangers-baskets/` via File Manager
- [ ] `.env` created on server with correct DB + SMTP credentials
- [ ] Database `hangers_baskets` created + `schema.sql` imported via phpMyAdmin
- [ ] Node.js configured: app root = `hangers-baskets/`, startup = `server.js`, doc root = `dist/`
- [ ] NPM Install clicked
- [ ] Node.js app Started
- [ ] nginx proxy directives added
- [ ] Admin account created via `create-admin.js`
- [ ] SSL certificate installed
