import moment from 'moment';
import constants from '../../../config/constants';
import RoadService from '../../services/road.service';

const { DEFAULT_ERROR } = constants;

class GetAllRoadsController {
  /**
   * @description Creates a new road
   * @param { Object } req - requst object
   * @param { Object } res - response object
   */
  static async getRoads(req, res) {
    try {
      const page = req.query.page || 1;
      const body = { page };
      const roadResult = await RoadService.getRoads(body);
      if (!roadResult.success) { throw new Error(roadResult.message); }

      return res.status(200).json({
        current_url: req.originalUrl,
        success: true,
        message: 'Roads Fetched Successfully',
        status: 200,
        data: roadResult.data

      });
    } catch (e) {
      logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}]`, 'Error: An error occured in GetAllRoadsController', e);
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

export default GetAllRoadsController;
