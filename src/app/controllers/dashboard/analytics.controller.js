import moment from 'moment';
import constants from '../../../config/constants';
import AnalyticsService from '../../services/analytics.service';

const { DEFAULT_ERROR } = constants;

class AnalyticsController {
  /**
   * @description Fetch admin statistics
   * @param { Object } req - request object
   * @param { Object } res - response object
   */
  static async getAdminStatistics(req, res) {
    try {
      const analyticsResult = await AnalyticsService.fetchAdminStats();
      if (!analyticsResult.success) { throw new Error(analyticsResult.message); }

      return res.status(200).json({
        current_url: req.originalUrl,
        success: true,
        message: 'Admin Analytics Data Fetched Successfully',
        status: 200,
        data: analyticsResult.statistics

      });
    } catch (e) {
      logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}]`, 'Error: An error occured in AnalyticsController ', e);
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
   * @description Fetch warden statistics
   * @param { Object } req - request object
   * @param { Object } res - response object
   */
  static async getWardenStatistics(req, res) {
    try {
      const { user } = req;
      const analyticsResult = await AnalyticsService.fetchWardenStats(user.id);
      if (!analyticsResult.success) { throw new Error(analyticsResult.message); }

      return res.status(200).json({
        current_url: req.originalUrl,
        success: true,
        message: 'Warden Analytics Data Fetched Successfully',
        status: 200,
        data: analyticsResult.statistics

      });
    } catch (e) {
      logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}]`, 'Error: An error occured in AnalyticsController ', e);
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

export default AnalyticsController;
