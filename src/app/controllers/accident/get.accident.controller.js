import moment from 'moment';
import constants from '../../../config/constants';
import AccidentService from '../../services/accident.service';

const { DEFAULT_ERROR } = constants;

class GetAccidentsController {
  /**
   * @description Fetch all accidents
   * @param { Object } req - requst object
   * @param { Object } res - response object
   */
  static async getAccidents(req, res) {
    try {
      const page = req.query.page || 1;
      const body = { page };

      if (req.query.warden_user_id) {
        body.warden_user_id = req.query.warden_user_id;
      }

      if (req.query.status) {
        body.status = req.query.status;
      }

      if (req.query.severity) {
        body.severity = req.query.severity;
      }

      const accidentResult = await AccidentService.getAccidents(body);
      if (!accidentResult.success) { throw new Error(accidentResult.message); }

      return res.status(200).json({
        current_url: req.originalUrl,
        success: true,
        message: 'Accidents Fetched Successfully',
        status: 200,
        data: accidentResult.data

      });
    } catch (e) {
      logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}]`, 'Error: An error occured in GetAccidentsController', e);
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

export default GetAccidentsController;
