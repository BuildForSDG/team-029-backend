
import Accident from '../models/accident.model';

class AccidentService {
  /**
   * @description Creates a new  accident entry.
   * @param { Object } data { ussd_session_id, phone_number, longitude }
   * @returns { Object } { sucess, accident: true | false}
   */

  static async saveAccidentLongitude(data) {
    try {
      const accident = await Accident.saveLongitude(data);
      return {
        success: true,
        accident
      };
    } catch (e) {
      return {
        success: false,
        message: e.message
      };
    }
  }

  /**
   * @description Updates accident latitude
   * @param { Object } data { ussd_session_id, latitude }
   * @returns { Object } { sucess, accident: true | false}
   */

  static async saveAccidentLatitude(data) {
    try {
      const accident = await Accident.saveLatitude(data);
      return {
        success: true,
        accident
      };
    } catch (e) {
      return {
        success: false,
        message: e.message
      };
    }
  }

  /**
   * @description Updates accident severity
   * @param { Object } data { ussd_session_id, severity }
   * @returns { Object } { sucess, accident: true | false}
   */

  static async saveAccidentSeverity(data) {
    try {
      const accident = await Accident.saveSeverity(data);
      return {
        success: true,
        accident
      };
    } catch (e) {
      return {
        success: false,
        message: e.message
      };
    }
  }

  /**
   * @description Updates accident description
   * @param { Object } data { ussd_session_id, description }
   * @returns { Object } { sucess, accident: true | false}
   */

  static async saveAccidentDescription(data) {
    try {
      const accident = await Accident.saveDescription(data);
      return {
        success: true,
        accident
      };
    } catch (e) {
      return {
        success: false,
        message: e.message
      };
    }
  }
}

export default AccidentService;
