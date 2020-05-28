const query = {
  findUserById: `
    SELECT 
        *
    FROM 
        users
    WHERE 
        id = $1
  `,
  findUserByEmail: `
    SELECT 
        *
    FROM 
        users
    WHERE 
        email = $1
  `,
  findUserByToken: `
    SELECT 
        *
    FROM 
        users
    WHERE 
        password_reset_token = $1
  `,
  createUser: `
    INSERT
        INTO
            users (id, first_name, last_name, email, office_address, phone_number, user_role, password, salt )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *
  `,
  verifyUserId: `
    SELECT 
      *
    FROM
      users
    WHERE
      id = $1
  `,
  saveUserPasswordToken: `
    UPDATE
       users
    SET 
       password_reset_token = $1,
       password_reset_token_date = $2
    WHERE 
       id = $3
  `,
  updatePassword: `
    UPDATE
       users
    SET 
       password_reset_token = $1,
       password_reset_token_date = $2,
       salt = $3,
       password = $4
    WHERE 
       id = $5
  `,
  findWardenUserById: `
    SELECT 
        *
    FROM 
        users
    WHERE 
        user_role = '{RW}'
    AND
        id = $1
  `,
  findUnassignedWarden: `
  SELECT 
    users.id as warden_user_id,
    email,
    phone_number
  FROM 
    users
  WHERE
    user_role = '{RW}'
  AND
    users.id  NOT IN (
      SELECT 
        warden_user_id
      FROM
        accidents
      WHERE
        warden_user_id IS NOT NULL     
    );
  `,
  findWardenWithNoPendingAccidentCases: `
   SELECT 
      warden_user_id,
      email,
      phone_number
  FROM 
    accidents
  INNER JOIN users ON users.id = warden_user_id
  WHERE 
    user_role = '{RW}'
  AND
    accidents.status = 'pending'
  GROUP BY(warden_user_id, email, phone_number)
  HAVING(COUNT(warden_user_id) = 0)
  LIMIT 1
  `,

  findWardenWithLeastPendingAccidentCases: `
      SELECT 
      warden_user_id,
      phone_number,
      email
    FROM 
      accidents
    INNER JOIN users ON users.id = accidents.warden_user_id
    WHERE 
      user_role = '{RW}'
    AND 
        accidents.status = 'pending'
    GROUP BY (warden_user_id, phone_number, email)
    HAVING (COUNT(warden_user_id) = ( SELECT
      MIN(pending_accidents) 
    FROM ( SELECT 
          warden_user_id,
          phone_number,
          email,
          COUNT(warden_user_id) as pending_accidents
      FROM 
          accidents
      INNER JOIN users ON users.id = accidents.warden_user_id
      WHERE 
          user_role = '{RW}'
      AND 
            accidents.status = 'pending'
      GROUP BY (warden_user_id, phone_number, email)
      HAVING (COUNT(warden_user_id) <= all(
          SELECT 
            COUNT(warden_user_id)
          FROM 
            accidents
        INNER JOIN users ON users.id = accidents.warden_user_id
        WHERE 
            user_role = '{RW}'
        AND 
              accidents.status = 'pending'
          GROUP BY(warden_user_id)
    ))) as cases
    LIMIT 1
    ))
    LIMIT 1
  `
};

export default query;
