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
  `
};

export default query;
