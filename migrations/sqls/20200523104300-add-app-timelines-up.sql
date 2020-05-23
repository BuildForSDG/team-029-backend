/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS app_timelines (
    id VARCHAR(50) NOT NULL, 
    admin_id VARCHAR(50),
    description VARCHAR(250), 
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);