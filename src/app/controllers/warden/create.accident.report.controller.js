import moment from 'moment';
import Validator from '../../utils/validator';
import constants from '../../../config/constants';
import AccidentService from '../../services/accident.service';

const { DEFAULT_ERROR } = constants;

class CreateAccidentReport {
  /**
   * @description Creates an accident report
   * @param { Object } req - request object
   * @param { Object } res - response object
   */
  static async createAccidentReport(req, res) {
    try {
      let { body } = req;
      body = Validator.validateAccidentReportCredentials(body);
      const accidentResult = await AccidentService.saveAccidentReport(body);
      if (!accidentResult.success) { throw new Error(accidentResult.message); }

      const { accident } = accidentResult;

      return res.status(200).json({
        current_url: req.originalUrl,
        success: true,
        message: 'Accident Report Recorded Successfully',
        status: 200,
        data: accident

      });
    } catch (e) {
      logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}]`, 'Error: An error occured in CreateAccidentReport', e);
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

export default CreateAccidentReport;
