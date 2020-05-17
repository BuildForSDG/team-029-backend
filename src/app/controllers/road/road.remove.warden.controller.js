import moment from 'moment';
import Validator from '../../utils/validator';
import constants from '../../../config/constants';
import RoadService from '../../services/road.service';

const { DEFAULT_ERROR } = constants;

class RemoveWardenController {
  /**
   * @description Removes a warden from a road
   * @param { Object } req - requst object
   * @param { Object } res - response object
   */
  static async unassignWarden(req, res) {
    try {
      let { body } = req;
      body = Validator.validateRoadWardenAssinmentCredentials(body);
      const roadResult = await RoadService.removeWardenFromRoad(body);
      if (!roadResult.success) { throw new Error(roadResult.message); }

      return res.status(200).json({
        current_url: req.originalUrl,
        success: true,
        message: 'Warden Removed From Road Successfully',
        status: 200,
        data: roadResult.road

      });
    } catch (e) {
      logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}]`, 'Error: An error occured in RemoveWardenController', e);
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

export default RemoveWardenController;
