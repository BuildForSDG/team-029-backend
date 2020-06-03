import moment from 'moment';
import constants from '../../../config/constants';
import AccidentService from '../../services/accident.service';
import Validator from '../../utils/validator';

const { DEFAULT_ERROR } = constants;

class AccidentTypeController {
  /**
   * @description Fetch all accident causes
   * @param { Object } req - request object
   * @param { Object } res - response object
   */
  static async getAccidentTypes(req, res) {
    try {
      const accidentResult = await AccidentService.getAccidentTypes();
      if (!accidentResult.success) { throw new Error(accidentResult.message); }

      const data = {
        accident_typess: accidentResult.accident.accidentTypes,
        count: accidentResult.accident.count.count

      };

      return res.status(200).json({
        current_url: req.originalUrl,
        success: true,
        message: 'Accidents Types Fetched Successfully',
        status: 200,
        data

      });
    } catch (e) {
      logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}]`, 'Error: An error occured in getAccidentTypes method in AccidentTypeController ', e);
      return res.status(400).json({

        current_url: req.originalUrl,
        success: false,
        message: e.message || DEFAULT_ERROR,
        status: 400,
        data: e.data || {},
        code: e.code

      });
    }
  }

  /**
   * @description Creates a new accident type
   * @param { Object } req - request object
   * @param { Object } res - response object
   */
  static async createAccidentType(req, res) {
    try {
      let { body } = req;
      body = Validator.validateAccidentTypeCredentials(body);
      const accidentResult = await AccidentService.createAccidentType(body);
      if (!accidentResult.success) { throw new Error(accidentResult.message); }

      const { accident } = accidentResult;

      return res.status(200).json({
        current_url: req.originalUrl,
        success: true,
        message: 'New Accident Type Created Successfully',
        status: 200,
        data: accident

      });
    } catch (e) {
      logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}]`, 'Error: An error occured in CreateAccidentTypeController', e);
      return res.status(400).json({

        current_url: req.originalUrl,
        success: false,
        message: e.message || DEFAULT_ERROR,
        status: 400,
        data: e.data || {},
        code: e.code

      });
    }
  }
}

export default AccidentTypeController;
