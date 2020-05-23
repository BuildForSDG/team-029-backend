/* Replace with your SQL commands */

CREATE TABLE IF NOT EXISTS accident_causes (
    id VARCHAR(50) NOT NULL,
    accident_id VARCHAR(50),
    cause_id VARCHAR(50),
    status VARCHAR(250), 
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
