
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

  /**
   * @description Get warden accidents
   * @param { Object } wardenUserId
   * @returns { Object } { sucess, accident}
   */

  static async getWardenAccidents(wardenUserId) {
    try {
      const accident = await Accident.getWardenAccidents(wardenUserId);
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
   * @description Get road accidents
   * @param { Object } roadId
   * @returns { Object } { sucess, accident}
   */

  static async getRoadAccidents(roadId) {
    try {
      const accident = await Accident.getRoadAccidents(roadId);
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
   * @description Get road accident statistics
   * @param { Object } roadId
   * @returns { Object } { sucess, accidentStats}
   */

  static async getRoadAccidentStatistics(roadId) {
    try {
      const accidentStats = await Accident.getRoadAccidentStatistics(roadId);
      const data = {
        accident_statistics: {}
      };

      data.accident_statistics = accidentStats;

      return {
        success: true,
        accident_statistics: data.accident_statistics
      };
    } catch (e) {
      return {
        success: false,
        message: e.message
      };
    }
  }

  /**
   * @description Creates accident cause
   * @param { Object } data { accident_cause }
   * @returns { Object } { sucess, cause}
   */

  static async createAccidentCause(data) {
    try {
      const accident = await Accident.saveAccidentCause(data);
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
   * @description Creates accident type
   * @param { Object } data { accident_type }
   * @returns { Object } { sucess, type}
   */

  static async createAccidentType(data) {
    try {
      const accident = await Accident.saveAccidentType(data);
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
   * @description Get accident causes
   * @returns { Object } { sucess, accidentCause }
   */

  static async getAccidentCauses() {
    try {
      const accident = await Accident.getAccidentCauses();
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
   * @description Get accident types
   * @returns { Object } { sucess, accidentTypes }
   */

  static async getAccidentTypes() {
    try {
      const accident = await Accident.getAccidentTypes();
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
   * @description Takes accident report
   * @param { Object } data { accident_id, accident_cause, road_id }
   * @returns { Object } { sucess, accident}
   */

  static async saveAccidentReport(data) {
    try {
      const {
        accident_id: accidentId, accident_cause: accidentCause,
        road_id: roadId, accident_type: accidentType
      } = data;
      const accident = await Accident.setAccidentToAttended(
        accidentId, accidentCause, accidentType, roadId
      );

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
