/* Replace with your SQL commands */

CREATE TABLE IF NOT EXISTS causes (
    id SERIAL PRIMARY KEY NOT NULL, 
    cause VARCHAR(250), 
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);





