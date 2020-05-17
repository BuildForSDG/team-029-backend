/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS accident_responses (
    id SERIAL PRIMARY KEY,  
    accident_id INTEGER NOT NULL, 
    warden_user_id VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS roads (
    id SERIAL PRIMARY KEY,  
    title VARCHAR(200) NOT NULL, 
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);


CREATE TABLE IF NOT EXISTS road_assignments (
    id SERIAL PRIMARY KEY,  
    warden_user_id VARCHAR(50), 
    road_id INTEGER,
    date_assigned TIMESTAMPTZ DEFAULT NOW(),
    date_unassigned TIMESTAMPTZ,
    status VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

