/* Replace with your SQL commands */
-- id. |. road_id | description | created_at | updated_at
CREATE TABLE IF NOT EXISTS accidents (
    id VARCHAR(50) NOT NULL, 
    road_id VARCHAR REFERENCESroad(id),
    description VARCHAR(250), 
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
