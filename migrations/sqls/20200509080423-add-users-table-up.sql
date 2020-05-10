/* Replace with your SQL commands */
-- Remove test table and data
DROP TABLE IF EXISTS team_mates;

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(50) NOT NULL , 
    first_name VARCHAR(250), 
    last_name VARCHAR(250),
    email VARCHAR(250),
    phone_number VARCHAR(50),
    user_role TEXT [],
    office_address TEXT,
    password VARCHAR(200),
    salt VARCHAR(200),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

