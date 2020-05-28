/* Replace with your SQL commands */

CREATE TABLE IF NOT EXISTS accidents (
    id SERIAL PRIMARY KEY NOT NULL,  
    road_id INTEGER,
    description VARCHAR(250), 
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
