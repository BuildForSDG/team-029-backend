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
