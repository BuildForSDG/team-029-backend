const query = {
  getAdminDashboardStats: `
        SELECT 
            (
                SELECT
                    COUNT(*)
                FROM
                    accidents
            )   AS total_no_of_accidents,
            (
                SELECT
                    COUNT(*)
                FROM
                    accidents
                WHERE
                    LOWER(status) = 'pending'
                   
            )   AS total_no_of_pending_accidents,
            (
                SELECT
                    COUNT(*)
                FROM
                    accidents
                WHERE
                    LOWER(status) = 'attended'
                   
            )   AS total_no_of_attended_accidents,
            ( 
                SELECT 
                    CEIL( AVG (daily_accidents) )
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
                        GROUP BY 
                            day 
                    ) AS daily_acc_stats 
                
                ) AS accident_stats
               
            ) AS average_daily_accidents,
            (
                SELECT
                    COUNT(*)
                FROM
                    roads
            ) AS total_no_of_roads,
            (
                SELECT
                    COUNT(*)
                FROM
                    users
                WHERE 
                    user_role = '{RW}'
            )   AS total_no_of_wardens
        `,

  getWardenDashboardStats: `
    SELECT 
        (
            SELECT
                COUNT(*)
            FROM
                accidents
            WHERE
                warden_user_id = $1
        )   AS total_no_of_accidents,
        (
            SELECT
                COUNT(*)
            FROM
                accidents
            WHERE
                LOWER(status) = 'pending'
            AND
                warden_user_id = $1         
        )   AS total_no_of_pending_accidents,
        (
            SELECT
                COUNT(*)
            FROM
                accidents
            WHERE
                LOWER(status) = 'attended'
            AND
                warden_user_id = $1 
                
        )   AS total_no_of_attended_accidents,
        (
            SELECT
                COUNT(*)
            FROM
                road_assignments
            WHERE
                warden_user_id = $1
            AND 
                date_unassigned IS NOT NULL
                
        ) AS total_no_of_road_assignments,
        (
            SELECT
                COUNT(*)
            FROM
                users
            WHERE 
                user_role = '{RW}'
        )   AS total_no_of_wardens
     `

};

export default query;
