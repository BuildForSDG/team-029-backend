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
    `
};

export default query;
