
import Accident from '../models/accident.model';
import config from '../../config';

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

  /**
   * @description Updates accident address_meta_data
   * @param { Object } data { ussd_session_id, address }
   * @returns { Object } { sucess, accident: true | false}
   */

  static async saveAccidentFullAddress(data) {
    try {
      const accident = await Accident.saveAddress(data);
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
   * @description Attach warden to accident
   * @param { Object } data { ussd_session_id, warden_user_id }
   * @returns { Object } { sucess, done: true}
   */

  static async attachWardenToAccident(data) {
    try {
      await Accident.attachWardenToAccident(data);
      return {
        success: true,
        data: true
      };
    } catch (e) {
      return {
        success: false,
        message: e.message
      };
    }
  }

  /**
   * @description Creates accident
   * @param { Object } data { longitude, latitude, severity, description, severity }
   * @returns { Object } { sucess, accident}
   */

  static async createAccident(data) {
    try {
      const accident = await Accident.saveAccident(data);
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
   * @description Fetch all accidents and apply filters
   * when available
   * @param { Object } data
   * @returns { Object } { sucess: true, data: { roads, page_count, item_count, current_page } }
   */

  static async getAccidents(data) {
    try {
      data.limit = config.paginationLimit;
      data.offset = (Number(data.page) - 1) * data.limit;
      const result = await Accident.getAccidents(data);
      const accidentCount = result.count.count;
      const itemCount = parseFloat(accidentCount);
      const pageCount = Math.ceil(itemCount / data.limit);

      return {
        success: true,
        data: {
          accidents: result.accidents,
          page_count: pageCount,
          item_count: itemCount,
          current_page: Number(data.page)
        }
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
