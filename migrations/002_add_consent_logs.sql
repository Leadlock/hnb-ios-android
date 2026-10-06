-- Cookie consent audit trail (GDPR / India DPDP Act)
CREATE TABLE IF NOT EXISTS consent_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ip_address VARCHAR(45),
  language VARCHAR(10) NOT NULL DEFAULT 'en',
  consent_version VARCHAR(20) NOT NULL,
  choices JSON NOT NULL,
  action ENUM('accepted_all', 'rejected_all', 'custom', 'withdrawn') NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
