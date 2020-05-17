import User from '../models/user.model';
import Road from '../models/road.model';
import RoadService from './road.service';

class WardenService {
  /**
   * @description Fetches warden information : user_details, road_assignments, accident_responses
   * @param { Object } id - Warden id
   * @returns { Object } { sucess: true, data }
   */
  static async fetchWardenInfo(id) {
    try {
      const user = await User.fetchWarden(id);
      if (!user) { throw new Error('User is not recognized'); }

      const wardenRoadInfo = await RoadService.getRoadsForWarden(id);
      if (!wardenRoadInfo.success) { throw new Error('We are unable to fetch information for this warden at the moment, please try again'); }

      delete user.salt;
      delete user.password;
      delete user.password_reset_token;
      delete user.password_reset_token_date;

      const data = { ...user };
      data.road_information = {
        roads: wardenRoadInfo.data.roads,
        count: wardenRoadInfo.data.count
      };

      return {
        success: true,
        data
      };
    } catch (e) {
      return {
        success: false,
        message: e.message
      };
    }
  }
}

export default WardenService;
