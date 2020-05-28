import moment from 'moment';
import constants from '../../../config/constants';
import AccidentService from '../../services/accident.service';

const { DEFAULT_ERROR } = constants;

class updateLatitudeController {
  /**
   * @description Updates accident's latitude
   * @param { Object } req - requst object
   * @param { Object } res - response object
   */
  static async saveLatitude(req, res) {
    try {
      const { body } = req;
      const accidentResult = await AccidentService.saveAccidentLatitude(body);
      if (!accidentResult.success) { throw new Error(accidentResult.message); }

      return res.status(200).json({
        current_url: req.originalUrl,
        success: true,
        message: 'Accident Latitude Entered',
        status: 200,
        data: 'done'

      });
    } catch (e) {
      logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}]`, 'Error: An error occured in updateLatitudeController', e);
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

export default updateLatitudeController;
