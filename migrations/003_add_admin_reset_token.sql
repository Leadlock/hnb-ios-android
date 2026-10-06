-- Run once to add forgot-password support for admin_users
ALTER TABLE admin_users ADD COLUMN reset_token VARCHAR(128);
ALTER TABLE admin_users ADD COLUMN reset_token_expires DATETIME;
