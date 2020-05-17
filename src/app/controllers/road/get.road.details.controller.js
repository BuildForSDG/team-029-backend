import moment from 'moment';
import constants from '../../../config/constants';
import RoadService from '../../services/road.service';

const { DEFAULT_ERROR } = constants;

class GetRoadDetailsController {
  /**
   * @description Creates a new road
   * @param { Object } req - requst object
   * @param { Object } res - response object
   */
  static async getRoadDetails(req, res) {
    try {
      const roadId = req.params.id;
      if (!roadId) { throw new Error('We are unable to find details for this road'); }
      const roadResult = await RoadService.getRoadInfo(roadId);
      if (!roadResult.success) { throw new Error(roadResult.message); }

      return res.status(200).json({
        current_url: req.originalUrl,
        success: true,
        message: 'Road Information Fetched Successfully',
        status: 200,
        data: roadResult.road

      });
    } catch (e) {
      logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}]`, 'Error: An error occured in GetRoadDetailsController', e);
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

export default GetRoadDetailsController;
