/* Replace with your SQL commands */
ALTER TABLE users ADD COLUMN  password_reset_token TEXT;
ALTER TABLE users ADD COLUMN  password_reset_token_date TIMESTAMPTZ;



