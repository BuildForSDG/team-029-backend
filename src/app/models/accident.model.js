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
      await db.oneOrNone(accidentQuery.saveDescription, [description, ussdSessionId]);
      return true;
    } catch (e) {
      logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}]`, 'Error: Failed to save latitude in saveDescription method in  accident.model', e);
      throw new Error('Failed to save accident description');
    }
  }
}

export default Accident;
