const query = {
  createRoad: `
    INSERT         
    INTO
        roads (title)
    VALUES 
        ($1)
    RETURNING 
        *
    `,
  updateRoadTitle: `
    UPDATE
        roads
    SET
        title = $1,
        updated_at = $2
    WHERE
        id = $3 
    RETURNING 
        *
  `,
  findRoadById: `
    SELECT 
        *
    FROM
        roads
    WHERE
        id = $1
 `,
  fetchRoads: `
    SELECT 
        *
    FROM
        roads
    ORDER BY 
        created_at DESC
    OFFSET
        $1
    LIMIT 
        $2
    `,
  countRoads: `
    SELECT 
        count(*) as count
    FROM
        roads
    `,
  fetchRoadWardens: `
    SELECT 
        users.first_name,
        users.last_name,
        users.email,
        users.phone_number,
        users.office_address,
        road_assignments.id as assignment_id,
        road_assignments.date_assigned,
        road_assignments.date_unassigned,
        road_assignments.status
    FROM
        road_assignments
    LEFT JOIN 
        users ON users.id = road_assignments.warden_user_id
    WHERE
        road_id = $1
    ORDER BY 
        road_assignments.created_at DESC
    `,
  countRoadWardens: `
    SELECT 
        count(*) as count
    FROM
        road_assignments
    LEFT JOIN 
        users ON users.id = road_assignments.warden_user_id
    WHERE
        road_id = $1
    `,

  assignWardenToRoad: `
    INSERT
    INTO
        road_assignments (road_id, warden_user_id, status)
    VALUES 
        ($1, $2, $3)
    `,
  fetchWardenRoads: `
    SELECT 
        roads.id as road_id,
        roads.title,
        road_assignments.id as assignment_id,
        road_assignments.date_assigned,
        road_assignments.date_unassigned,
        road_assignments.status
    FROM
        road_assignments
    LEFT JOIN 
        users ON users.id = road_assignments.warden_user_id
    LEFT JOIN
        roads ON roads.id = road_assignments.road_id
    WHERE
        road_assignments.warden_user_id = $1
    ORDER BY 
        road_assignments.created_at DESC
    `,
  getRoadAcidentStatistics: `
    SELECT 
        road_id,
        ( 
            SELECT 
                count(*)
            FROM 
                accidents
            WHERE 
                road_id = $1
        
        ) AS total_accident_cases, 
        ( 
            SELECT 
                AVG (daily_accidents)
            FROM 
            ( 
                SELECT 
                    daily_accidents 
                FROM 
                ( 
                    SELECT 
                        date_trunc('day', accidents.created_at) "day",
                        count(*) daily_accidents
                    FROM 
                        accidents
                    WHERE 
                        road_id = $1
                    GROUP BY 
                        day 
                ) AS daily_acc_stats 
            
            ) AS accident_stats
        
        ) AS avg_daily_accidents,
        ( 
            SELECT 
                STRING_AGG(most_common_accident_types, ',') AS most_common_accident_types
            FROM 
                ( 
                    SELECT 
                        LOWER(accident_type) as most_common_accident_types
                    FROM 
                        accidents
                    WHERE 
                        road_id = $1
                    GROUP BY 
                        LOWER(accidents.accident_type)
                    HAVING 
                        COUNT(LOWER(accidents.accident_type)) = 
                            ( 
                                SELECT 
                                    MAX(no_of_accident_types)     
                                FROM 
                                ( 
                                    
                                    SELECT 
                                        LOWER(accident_type) AS accident_type, count(accident_type) no_of_accident_types
                                    FROM 
                                        accidents
                                    WHERE 
                                        road_id = $1
                                    GROUP BY 
                                        LOWER(accidents.accident_type)
                                                                    
                                ) AS accident_types
                            )
            
                ) AS most_common_accident_type
        
        ) AS most_common_accident_types, 
        ( 
            SELECT 
                STRING_AGG(most_common_accident_causes, ', ') AS most_common_accident_cause
            FROM 
            ( 
                SELECT 
                    LOWER(cause) AS most_common_accident_causes
                FROM 
                    accidents
                WHERE 
                    road_id = $1
                GROUP BY 
                    LOWER(accidents.cause)
                HAVING 
                    COUNT(LOWER(accidents.cause)) = 
                        ( SELECT 
                                MAX(no_of_accident_causes)     
                            FROM 
                            ( 
                            
                                SELECT 
                                    LOWER(cause) AS cause, count(cause) no_of_accident_causes
                                FROM 
                                    accidents
                                WHERE 
                                    road_id = $1
                                GROUP BY 
                                    LOWER(accidents.cause)
                            ) AS accident_causes
                        )
            
            ) AS most_common_accident_cause
        
        ) AS most_common_accident_causes
    FROM 
        accidents
    WHERE 
        road_id = $1
    GROUP BY road_id;
  `,
  getRoadAccidents: `
    SELECT 
        accidents.id as accident_id,
        accidents.road_id,
        accidents.description,
        accidents.warden_user_id,
        accidents.ussd_session_id,
        accidents.victim_phone_number,
        accidents.longitude,
        accidents.latitude,
        accidents.address,
        accidents.severity,
        accidents.status,
        accidents.cause AS cause_of_accident,
        accidents.accident_type,
        accidents.accident_report_date,
        roads.title as road_title,
        accidents.created_at,
        accidents.updated_at
    FROM 
        roads
    LEFT JOIN accidents ON accidents.road_id = roads.id
    WHERE 
      roads.id = $1
    ORDER BY
         roads.created_at DESC
   `,
  getRoadAccidentsCount: `
    SELECT 
        count(*) as count
    FROM 
        roads
    LEFT JOIN accidents ON accidents.road_id = roads.id 
    WHERE 
        roads.id = $1
   `,
  countWardenRoads: `
    SELECT 
        count(*) as count 
    FROM
        road_assignments
    LEFT JOIN 
        users ON users.id = road_assignments.warden_user_id
    LEFT JOIN
        roads ON roads.id = road_assignments.road_id
    WHERE
        road_assignments.warden_user_id = $1
   `,
  unassignWarden: `
    UPDATE
         road_assignments
    SET
        date_unassigned = NOW(),
        status = 'Inactive'
    WHERE
        id = $1
   `
};

export default query;
