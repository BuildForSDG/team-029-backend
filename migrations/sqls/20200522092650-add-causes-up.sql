/* Replace with your SQL commands */

CREATE TABLE IF NOT EXISTS causes (
    id VARCHAR(50) NOT NULL, 
    cause VARCHAR(250), 
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);





