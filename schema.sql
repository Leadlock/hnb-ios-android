-- Run this once to set up the database and tables

CREATE DATABASE IF NOT EXISTS hangers_baskets
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE hangers_baskets;

CREATE TABLE IF NOT EXISTS franchise_enquiries (
  id               INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  first_name       VARCHAR(100) NOT NULL,
  last_name        VARCHAR(100),
  mobile           VARCHAR(15)  NOT NULL,
  email            VARCHAR(255) NOT NULL,
  state            VARCHAR(100) NOT NULL,
  city             VARCHAR(100) NOT NULL,
  investment_range VARCHAR(50),
  timeline         VARCHAR(50),
  created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_read          TINYINT(1)   NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS job_applications (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  position   VARCHAR(100) NOT NULL,
  name       VARCHAR(150) NOT NULL,
  phone      VARCHAR(15)  NOT NULL,
  email      VARCHAR(255),
  message    TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_read    TINYINT(1)   NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS admin_users (
  id                  INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  email               VARCHAR(255) NOT NULL UNIQUE,
  password_hash       VARCHAR(255) NOT NULL,
  reset_token         VARCHAR(128),
  reset_token_expires DATETIME,
  created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS pricing_items (
  id           INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  service_type VARCHAR(100) NOT NULL,
  category     VARCHAR(150) NOT NULL DEFAULT '',
  item_name    VARCHAR(255) NOT NULL,
  price        DECIMAL(10,2) NOT NULL DEFAULT 0,
  unit         VARCHAR(50)  NOT NULL DEFAULT 'piece',
  sort_order   INT UNSIGNED NOT NULL DEFAULT 0,
  is_active    TINYINT(1)   NOT NULL DEFAULT 1,
  updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS service_metadata (
  service_type  VARCHAR(100) NOT NULL PRIMARY KEY,
  description   TEXT,
  svg_icon      MEDIUMTEXT,
  accent_color  VARCHAR(20)  NOT NULL DEFAULT '#1F5FFF',
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Cookie consent audit trail (GDPR / India DPDP Act)
CREATE TABLE IF NOT EXISTS consent_logs (
  id               INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  ip_address       VARCHAR(45),
  language         VARCHAR(10)  NOT NULL DEFAULT 'en',
  consent_version  VARCHAR(20)  NOT NULL,
  choices          JSON         NOT NULL,
  action           ENUM('accepted_all', 'rejected_all', 'custom', 'withdrawn') NOT NULL,
  created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ──────────────────────────────────────────────────────────────────────────────
-- SCHEMA UPDATES (idempotent — safe to re-run on existing databases)
-- Each block adds a column only if it does not already exist.
-- Add new ALTER TABLE changes here whenever a new column is introduced.
-- ──────────────────────────────────────────────────────────────────────────────

-- 001: add is_read to franchise_enquiries
SET @s = (SELECT IF(
  COUNT(*) = 0,
  'ALTER TABLE franchise_enquiries ADD COLUMN is_read TINYINT(1) NOT NULL DEFAULT 0',
  'SELECT 1 -- already exists'
) FROM information_schema.columns
  WHERE table_schema = DATABASE()
    AND table_name   = 'franchise_enquiries'
    AND column_name  = 'is_read');
PREPARE stmt FROM @s; EXECUTE stmt; DEALLOCATE PREPARE stmt;

-- 001: add is_read to job_applications
SET @s = (SELECT IF(
  COUNT(*) = 0,
  'ALTER TABLE job_applications ADD COLUMN is_read TINYINT(1) NOT NULL DEFAULT 0',
  'SELECT 1 -- already exists'
) FROM information_schema.columns
  WHERE table_schema = DATABASE()
    AND table_name   = 'job_applications'
    AND column_name  = 'is_read');
PREPARE stmt FROM @s; EXECUTE stmt; DEALLOCATE PREPARE stmt;

-- 002: add sort_order to service_metadata (controls pricing page display order)
SET @s = (SELECT IF(
  COUNT(*) = 0,
  'ALTER TABLE service_metadata ADD COLUMN sort_order INT NOT NULL DEFAULT 0',
  'SELECT 1 -- already exists'
) FROM information_schema.columns
  WHERE table_schema = DATABASE()
    AND table_name   = 'service_metadata'
    AND column_name  = 'sort_order');
PREPARE stmt FROM @s; EXECUTE stmt; DEALLOCATE PREPARE stmt;

-- 003: add reset_token to admin_users (forgot-password flow)
SET @s = (SELECT IF(
  COUNT(*) = 0,
  'ALTER TABLE admin_users ADD COLUMN reset_token VARCHAR(128)',
  'SELECT 1 -- already exists'
) FROM information_schema.columns
  WHERE table_schema = DATABASE()
    AND table_name   = 'admin_users'
    AND column_name  = 'reset_token');
PREPARE stmt FROM @s; EXECUTE stmt; DEALLOCATE PREPARE stmt;

-- 003: add reset_token_expires to admin_users (forgot-password flow)
SET @s = (SELECT IF(
  COUNT(*) = 0,
  'ALTER TABLE admin_users ADD COLUMN reset_token_expires DATETIME',
  'SELECT 1 -- already exists'
) FROM information_schema.columns
  WHERE table_schema = DATABASE()
    AND table_name   = 'admin_users'
    AND column_name  = 'reset_token_expires');
PREPARE stmt FROM @s; EXECUTE stmt; DEALLOCATE PREPARE stmt;
