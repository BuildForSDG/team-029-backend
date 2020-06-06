import moment from 'moment';
import constants from '../../../config/constants';
import RoadService from '../../services/road.service';
import AccidentService from '../../services/accident.service';

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
      const data = roadResult.road;


      const roadAccidentResult = await AccidentService.getRoadAccidents(roadId);
      if (!roadAccidentResult.success) { throw new Error(roadAccidentResult.message); }

      data.road_accidents = {
        accidents: roadAccidentResult.accident.accidents,
        count: roadAccidentResult.accident.count.count
      };

      const roadAccidentStatsResult = await AccidentService.getRoadAccidentStatistics(roadId);
      if (!roadAccidentStatsResult.success) { throw new Error(roadAccidentStatsResult.message); }

      data.road_accidents.accident_statistics = roadAccidentStatsResult.accident_statistics;

      return res.status(200).json({
        current_url: req.originalUrl,
        success: true,
        message: 'Road Information Fetched Successfully',
        status: 200,
        data

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
