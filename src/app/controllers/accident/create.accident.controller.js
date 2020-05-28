import moment from 'moment';
import Validator from '../../utils/validator';
import constants from '../../../config/constants';
import AccidentService from '../../services/accident.service';
import AccidentRoutingService from '../../services/accident.routing.service';

const { DEFAULT_ERROR } = constants;

class CreateAccidentController {
  /**
   * @description Creates a new accident from the client page
   * @param { Object } req - requst object
   * @param { Object } res - response object
   */
  static async createAccident(req, res) {
    try {
      let { body } = req;
      body = Validator.validateAccidentCredentials(body);
      const accidentResult = await AccidentService.createAccident(body);
      if (!accidentResult.success) { throw new Error(accidentResult.message); }

      let { accident } = accidentResult;
      const routingResult = await AccidentRoutingService.handleAccident(accident);
      if (!routingResult.success) { throw new Error(routingResult.message); }

      accident = routingResult.accident;

      return res.status(200).json({
        current_url: req.originalUrl,
        success: true,
        message: 'Accident Recorded Successfully',
        status: 200,
        data: accident

      });
    } catch (e) {
      logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}]`, 'Error: An error occured in CreateAccidentController', e);
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

export default CreateAccidentController;
