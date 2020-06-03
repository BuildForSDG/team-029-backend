import moment from 'moment';
import db from '../utils/database';
import accidentQuery from '../queries/accident';
import roadQuery from '../queries/road';

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

  /**
     * @description Fetches accident for a particular warden
     * @param { Object } wardenUserId
  */

  static async getWardenAccidents(wardenUserId) {
    try {
      const accidents = await db.any(accidentQuery.getWardenAccident, [
        wardenUserId
      ]);

      const count = await db.oneOrNone(accidentQuery.getAccidentsCount, [
        wardenUserId
      ]);
      return {
        accidents,
        count
      };
    } catch (e) {
      logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}]`, `Error: Failed to fetch warden [ ${wardenUserId} ] accident in getWardenAccidents method in  accident.model`, e);
      throw new Error('Failed to fetch warden accidents');
    }
  }

  /**
     * @description Fetches accident for a particular road
     * @param { Object } roadId
  */

  static async getRoadAccidents(roadId) {
    try {
      const accidents = await db.any(roadQuery.getRoadAccidents, [
        roadId
      ]);

      const count = await db.oneOrNone(roadQuery.getRoadAccidentsCount, [
        roadId
      ]);

      return {
        accidents,
        count
      };
    } catch (e) {
      logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}]`, `Error: Failed to fetch road [ ${roadId} ] accidents in getRoadAccidents method in  accident.model`, e);
      throw new Error('Failed to fetch road accidents');
    }
  }

  /**
     * @description Fetches a road's accident statistics
     * @param { Object } roadId
  */

  static async getRoadAccidentStatistics(roadId) {
    try {
      const accidentStats = await db.oneOrNone(roadQuery.getRoadAcidentStatistics, [
        roadId
      ]);

      return accidentStats;
    } catch (e) {
      logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}]`, `Error: Failed to fetch road [ ${roadId} ] accidents statistics in getRoadAccidentStatistics method in  accident.model`, e);
      throw new Error('Failed to fetch road accident statistics');
    }
  }

  /**
     * @description Saves a new accident cause
     * @param { Object } data {  accident_cause }
  */

  static async saveAccidentCause(data) {
    try {
      const { accident_cause: accidentCause } = data;
      const accident = await db.oneOrNone(accidentQuery.createAccidentCause, [
        accidentCause
      ]);
      return accident;
    } catch (e) {
      logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}]`, 'Error: Failed to accident cause in saveAccidentCause method in  accident.model', e);
      throw new Error('Failed to save new accident cause');
    }
  }

  /**
     * @description Saves a new accident type
     * @param { Object } data {  accident_type }
  */

  static async saveAccidentType(data) {
    try {
      const { accident_type: accidentType } = data;
      const accident = await db.oneOrNone(accidentQuery.createAccidentType, [
        accidentType
      ]);
      return accident;
    } catch (e) {
      logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}]`, 'Error: Failed to save accident type in saveAccidentType method in  accident.model', e);
      throw new Error('Failed to save new accident type');
    }
  }

  /**
     * @description Fetches all accident causes
  */

  static async getAccidentCauses() {
    try {
      const accidentCauses = await db.any(accidentQuery.getAccidentCause);

      const count = await db.oneOrNone(accidentQuery.getAccidentCauseCount);
      return {
        accidentCauses,
        count
      };
    } catch (e) {
      logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}]`, 'Error: Failed to fetch accident causes in getAccidentCauses method in  accident.model', e);
      throw new Error('Failed to fetch accident causes');
    }
  }

  /**
      * @description Fetches all accident types
  */

  static async getAccidentTypes() {
    try {
      const accidentTypes = await db.any(accidentQuery.getAccidentType);

      const count = await db.oneOrNone(accidentQuery.getAccidentTypeCount);
      return {
        accidentTypes,
        count
      };
    } catch (e) {
      logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}]`, 'Error: Failed to fetch accident types in getAccidentTypes method in  accident.model', e);
      throw new Error('Failed to fetch accident types');
    }
  }

  /**
     * @description Update accident status to attended and update cause of accident
     * @param { Number }  accidentId
     * @param { String } accidentCause
     * @param { String } accidentType
     * @param { String } roadId
  */

  static async setAccidentToAttended(accidentId, accidentCause, accidentType, roadId) {
    try {
      const accident = await db.any(accidentQuery.setAccidentStatusToAttended,
        [accidentCause, roadId, accidentType, accidentId]);
      return accident;
    } catch (e) {
      logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}]`, 'Error: Failed to set accident as attended setAccidentToAttended method in  accident.model', e);
      throw new Error('Failed to set accident as attended');
    }
  }
}

export default Accident;
