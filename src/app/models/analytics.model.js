import moment from 'moment';
import db from '../utils/database';
import analyticsQuery from '../queries/analytics';

class Analytics {
  /**
     * @description Fetches statistics from db for admin
     * @returns { Object } statistics
  */

  static async fetchAdminStats() {
    try {
      const statistics = await db.oneOrNone(analyticsQuery.getAdminDashboardStats);
      return statistics;
    } catch (e) {
      logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}]`, 'Error: Failed to fetch admin statistics in fetchAdminStats method in analytics.model', e);
      throw new Error('Failed to fetch admin stats');
    }
  }

  /**
     * @description Fetches statistics from db for roadWarden
     * @param { String } wardenUserId
     * @returns { Object } statistics
  */

  static async fetchWardenStatistics(wardenUserId) {
    try {
      const statistics = await db.oneOrNone(analyticsQuery.getWardenDashboardStats, [wardenUserId]);
      return statistics;
    } catch (e) {
      logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}]`, 'Error: Failed to fetch admin statistics in fetchWardenStatistics method in analytics.model', e);
      throw new Error('Failed to fetch warden stats');
    }
  }
}

export default Analytics;
