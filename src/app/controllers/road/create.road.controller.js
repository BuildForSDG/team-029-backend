import moment from 'moment';
import Validator from '../../utils/validator';
import constants from '../../../config/constants';
import RoadService from '../../services/road.service';

const { DEFAULT_ERROR } = constants;

class CreateRoadController {
  /**
   * @description Creates a new road
   * @param { Object } req - requst object
   * @param { Object } res - response object
   */
  static async createRoad(req, res) {
    try {
      let { body } = req;
      body = Validator.validateRoadCredentials(body);
      const roadResult = await RoadService.createRoad(body);
      if (!roadResult.success) { throw new Error(roadResult.message); }

      const { road } = roadResult;
      if (!road) { throw new Error('Unable to create road at the moment'); }

      return res.status(200).json({
        current_url: req.originalUrl,
        success: true,
        message: 'Road Created Successfully',
        status: 200,
        data: road

      });
    } catch (e) {
      logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}]`, 'Error: An error occured in CreateRoadController', e);
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

export default CreateRoadController;
