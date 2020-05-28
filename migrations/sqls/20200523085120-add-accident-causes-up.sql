/* Replace with your SQL commands */

CREATE TABLE IF NOT EXISTS accident_causes (
    id SERIAL PRIMARY KEY NOT NULL, 
    accident_id INTEGER NOT NULL,
    cause_id INTEGER NOT NULL,
    status VARCHAR(250), 
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
