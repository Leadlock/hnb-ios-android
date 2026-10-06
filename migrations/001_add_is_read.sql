-- Run once to add read/unread tracking
ALTER TABLE franchise_enquiries ADD COLUMN is_read TINYINT(1) NOT NULL DEFAULT 0;
ALTER TABLE job_applications    ADD COLUMN is_read TINYINT(1) NOT NULL DEFAULT 0;
