const query = {
  saveLongitude: `
        INSERT 
            INTO
                accidents(victim_phone_number, ussd_session_id, longitude)
        VALUES( $1, $2, $3 )
    `,
  saveLatitude: `
        UPDATE
            accidents
        SET
            latitude = $1
        WHERE
            ussd_session_id = $2
    `,
  saveSeverity: `
    UPDATE
        accidents
    SET
        severity = $1
    WHERE
        ussd_session_id = $2
    `,
  saveDescription: `
    UPDATE
        accidents
    SET
        description = $1
    WHERE
        ussd_session_id = $2
    RETURNING *
    `,
  saveAddress: `
    UPDATE
        accidents
    SET
        address_meta_data = $1,
        address = $2
    WHERE
        ussd_session_id = $3
    `,
  saveAddressUsingAccidentId: `
    UPDATE
        accidents
    SET
        address_meta_data = $1,
        address = $2
    WHERE
        id = $3 
   
   `,

  attachWardenToAccident: `
    UPDATE
        accidents
    SET
        warden_user_id = $1
    WHERE
        ussd_session_id = $2
    `,

  attachWardenToAccidentUsingAccidentId: `
    UPDATE
        accidents
    SET
        warden_user_id = $1
    WHERE
        id = $2
    `,
  createAccident: `
     INSERT 
        INTO 
            accidents(longitude, latitude, severity, description, victim_phone_number)
        VALUES($1, $2, $3, $4, $5)
     RETURNING *
   `,
  createAccidentCause: `
   INSERT 
      INTO 
          causes(cause)
      VALUES($1)
   RETURNING *
 `,
  createAccidentType: `
 INSERT 
    INTO 
        accident_types(type)
    VALUES($1)
 RETURNING *
`,
  getWardenAccident: `
    SELECT
        accidents.id AS accident_id,
        accidents.warden_user_id,
        roads.title,
        accidents.description,
        accidents.address,
        accidents.severity,
        accidents.cause AS cause_of_accident,
        accidents.accident_type,
        accidents.victim_phone_number,
        accidents.address_meta_data,
        accidents.created_at,
        accidents.updated_at,
        accidents.accident_report_date
    FROM  
        accidents
    LEFT JOIN users ON users.id =  accidents.warden_user_id
    LEFT JOIN roads ON roads.id = accidents.road_id
    WHERE
        users.id = $1
    AND
        user_role = '{RW}'
    ORDER BY created_at DESC
  
  `,
  getWardenAccidentsCount: `
    SELECT
        count(*) AS count
    FROM  
        accidents
    LEFT JOIN users ON users.id =  accidents.warden_user_id
    LEFT JOIN roads ON roads.id = accidents.road_id
    WHERE
        users.id = $1
    AND
        user_role = '{RW}'
  `,
  getAccidents: `
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
        users.email,
        users.phone_number,
        users.first_name,
        users.last_name,
        accidents.created_at,
        accidents.updated_at
    FROM 
        accidents
    LEFT JOIN users ON users.id = accidents.warden_user_id
   
   `,
  getAccidentsCount: `
    SELECT 
        count(*) as count
    FROM 
        accidents
    LEFT JOIN users ON users.id = accidents.warden_user_id
   
   `,
  filterByWardenUser: `
      accidents.warden_user_id = 
   `,
  filterByWardenUserWhere: `
    WHERE 
        accidents.warden_user_id = 
    `,
  filterByStatus: `
       status = 
   `,
  filterByStatusWhere: `
        WHERE
            status = 
   `,
  filterBySeverity: `
     severity = 
   `,
  filterBySeverityWhere: `
        WHERE
            severity = 
   `,
  orderByCreatedAtDesc: `
        ORDER BY accidents.created_at DESC
  `,
  offsetQuery: `
        OFFSET
            $1
        LIMIT
            $2
  `,
  getAccidentCause: `
    SELECT
       *
    FROM  
        causes
    ORDER BY 
        created_at DESC
  
  `,
  getAccidentCauseCount: `
    SELECT
        count(*) AS count
    FROM  
        causes
  `,
  getAccidentType: `
    SELECT
       *
    FROM  
        accident_types
    ORDER BY 
        created_at DESC
  
  `,
  getAccidentTypeCount: `
    SELECT
        count(*) AS count
    FROM  
        accident_types
  `,
  setAccidentStatusToAttended: `
    UPDATE
        accidents
    SET
        status = 'attended',
        cause = $1,
        road_id = $2,
        accident_type = $3,
        accident_report_date = NOW()
    WHERE
        id = $4
    RETURNING 
        id,
        road_id,
        description,
        cause AS cause_of_accident,
        accident_type,
        warden_user_id,
        ussd_session_id,
        victim_phone_number,
        longitude,
        latitude,
        address,
        severity,
        status,
        created_at,
        updated_at,
        accident_report_date

  
  `
};

export default query;
