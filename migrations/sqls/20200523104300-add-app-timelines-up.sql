/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS app_timelines (
    id SERIAL PRIMARY KEY NOT NULL, 
    admin_id INTEGER NOT NULL,
    description VARCHAR(250), 
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);