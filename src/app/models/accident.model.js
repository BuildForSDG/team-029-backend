import moment from 'moment';
import db from '../utils/database';
import accidentQuery from '../queries/accident';

class Accident {
  /**
     * @description Creates new accident and save longitude
     * along with ussd_session_id and phone_number
     * @param { Object } data
  */

  static async saveLongitude(data) {
    try {
      const { ussd_session_id: ussdSessionId, phone_number: phoneNumber, longitude } = data;
      await db.oneOrNone(accidentQuery.saveLongitude, [phoneNumber, ussdSessionId, longitude]);
      return true;
    } catch (e) {
      logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}]`, 'Error: Failed to save longitude in saveLongitude method in  accident.model', e);
      throw new Error('Failed to save longitude');
    }
  }

  /**
     * @description Saves accident latitude
     * @param { Object } data { ussd_session_id, latitude }
  */

  static async saveLatitude(data) {
    try {
      const { ussd_session_id: ussdSessionId, latitude } = data;
      await db.oneOrNone(accidentQuery.saveLatitude, [latitude, ussdSessionId]);
      return true;
    } catch (e) {
      logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}]`, 'Error: Failed to save latitude in saveLatitude method in  accident.model', e);
      throw new Error('Failed to save latitude');
    }
  }

  /**
     * @description Saves accident severity
     * @param { Object } data { ussd_session_id, severity }
  */

  static async saveSeverity(data) {
    try {
      const { ussd_session_id: ussdSessionId, severity } = data;
      await db.oneOrNone(accidentQuery.saveSeverity, [severity, ussdSessionId]);
      return true;
    } catch (e) {
      logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}]`, 'Error: Failed to save latitude in saveSeverity method in  accident.model', e);
      throw new Error('Failed to save severity');
    }
  }

  /**
     * @description Saves accident description
     * @param { Object } data { ussd_session_id, description }
  */

  static async saveDescription(data) {
    try {
      const { ussd_session_id: ussdSessionId, description } = data;
      const accident = await db.oneOrNone(accidentQuery.saveDescription, [
        description, ussdSessionId
      ]);
      return accident;
    } catch (e) {
      logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}]`, 'Error: Failed to save latitude in saveDescription method in  accident.model', e);
      throw new Error('Failed to save accident description');
    }
  }

  /**
     * @description Saves accident full address
     * @param { Object } data { address, ussd_session_id }
  */

  static async saveAddress(data) {
    try {
      const { ussd_session_id: ussdSessionId, accident_id: accidentId } = data;
      const formatedAddress = data.formatted_address;
      const jsonData = JSON.stringify(data.full_address);

      if (accidentId) {
        await db.oneOrNone(accidentQuery.saveAddressUsingAccidentId, [
          jsonData, formatedAddress, accidentId
        ]);
      } else {
        await db.oneOrNone(accidentQuery.saveAddress, [
          jsonData, formatedAddress, ussdSessionId
        ]);
      }

      return true;
    } catch (e) {
      logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}]`, 'Error: Failed to save transalated accident address in  saveAddress method in  accident.model', e);
      throw new Error('Failed to save accident address');
    }
  }

  /**
     * @description Saves assigned warden to accident
     * @param { Object } data { warden_user_id, ussd_session_id }
  */

  static async attachWardenToAccident(data) {
    try {
      const { ussd_session_id: ussdSessionId, warden_user_id: wardenUserId, id } = data;
      if (ussdSessionId) {
        await db.oneOrNone(accidentQuery.attachWardenToAccident, [
          wardenUserId, ussdSessionId
        ]);
      } else {
        await db.oneOrNone(accidentQuery.attachWardenToAccidentUsingAccidentId, [
          wardenUserId, id
        ]);
      }

      return true;
    } catch (e) {
      logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}]`, 'Error: Failed to save attached warden in attachWardenToAccident method in  accident.model', e);
      throw new Error('Failed to attach warden to accident');
    }
  }

  /**
     * @description Saves accident data coming from web client not USSD
     * @param { Object } data { longitude, latitude, severity, latitude, phoneNumber}
  */

  static async saveAccident(data) {
    try {
      const {
        longitude, latitude, severity, phone_number: victimPhoneNumber, description
      } = data;
      const accident = await db.oneOrNone(accidentQuery.createAccident, [
        longitude, latitude, severity, description, victimPhoneNumber
      ]);
      return accident;
    } catch (e) {
      logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}]`, 'Error: Failed to create accident in saveAccident method in  accident.model', e);
      throw new Error('Failed to create accident');
    }
  }

  /**
       * @description Fetches accidents and applies filters when necessary
       * @param { Object } data { longitude, latitude, severity, latitude, phoneNumber}
    */

  static async getAccidents(data) {
    try {
      const {
        offset, limit, warden_user_id: wardenUserId, status, severity
      } = data;
      let firstFilter = false;
      let baseQuery = accidentQuery.getAccidents;
      let countQuery = accidentQuery.getAccidentsCount;

      if (wardenUserId) {
        baseQuery += `${accidentQuery.filterByWardenUserWhere} '${wardenUserId}'`;
        countQuery += `${accidentQuery.filterByWardenUserWhere} '${wardenUserId}'`;
        firstFilter = true;
      }

      if (severity) {
        if (firstFilter) {
          baseQuery += ` AND ${accidentQuery.filterBySeverity} '${severity}'`;
          countQuery += ` AND ${accidentQuery.filterBySeverity} '${severity}'`;
        } else {
          baseQuery += ` ${accidentQuery.filterBySeverityWhere} '${severity}'`;
          countQuery += ` ${accidentQuery.filterBySeverityWhere} '${severity}'`;
          firstFilter = true;
        }
      }

      if (status) {
        if (firstFilter) {
          baseQuery += ` AND ${accidentQuery.filterByStatus} '${status}'`;
          countQuery += ` AND ${accidentQuery.filterByStatus} '${status}'`;
        } else {
          baseQuery += ` ${accidentQuery.filterByStatusWhere} '${status}'`;
          countQuery += ` ${accidentQuery.filterByStatusWhere} '${status}'`;
          firstFilter = true;
        }
      }

      baseQuery += accidentQuery.orderByCreatedAtDesc;
      baseQuery += accidentQuery.offsetQuery;

      const accidents = await db.any(baseQuery, [
        offset, limit
      ]);

      const count = await db.oneOrNone(countQuery);

      return {
        accidents,
        count
      };
    } catch (e) {
      logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}]`, 'Error: Failed to fetch accidents in getAccidents method in  accident.model', e);
      throw new Error('Failed to fetch accidents');
    }
  }
}

export default Accident;
