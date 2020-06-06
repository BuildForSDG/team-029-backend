/* Replace with your SQL commands */
ALTER TABLE accidents ADD COLUMN accident_type VARCHAR(100);

CREATE TABLE IF NOT EXISTS accident_types (
    id SERIAL PRIMARY KEY NOT NULL, 
    type VARCHAR(250), 
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

