import Analytics from '../models/analytics.model';

class AnalyticsService {
  /**
   * @description Fetches admin statistics
   * @returns { Object } { sucess: true, data }
   */
  static async fetchAdminStats() {
    try {
      const statistics = await Analytics.fetchAdminStats();
      return {
        success: true,
        statistics
      };
    } catch (e) {
      return {
        success: false,
        message: e.message
      };
    }
  }

  /**
   * @description Fetches warden statistics
   * @param { String } wardenUserId
   * @returns { Object } { sucess: true, data }
   */
  static async fetchWardenStats(wardenUserId) {
    try {
      const statistics = await Analytics.fetchWardenStatistics(wardenUserId);
      return {
        success: true,
        statistics
      };
    } catch (e) {
      return {
        success: false,
        message: e.message
      };
    }
  }
}

export default AnalyticsService;
