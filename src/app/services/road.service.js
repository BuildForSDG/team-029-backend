
import Road from '../models/road.model';
import config from '../../config';
import UserService from './user.service';

class RoadService {
  /**
   * @description Creates a new road
   * @param { Object } data
   * @returns { Object } { sucess: true, road }
   */

  static async createRoad(data) {
    try {
      const road = await Road.createRoad(data);
      return {
        success: true,
        road
      };
    } catch (e) {
      return {
        success: false,
        message: e.message
      };
    }
  }

  /**
   * @description Updates road title
   * @param { Object } data
   * @returns { Object } { sucess: true, road }
   */

  static async updateRoadTitle(data) {
    try {
      // Ensure road exists;
      const roadResult = await Road.findRoadById(data.road_id);
      if (!roadResult) { throw new Error('We are unable to find the selected road'); }
      const road = await Road.updateRoadTitle(data);
      return {
        success: true,
        road
      };
    } catch (e) {
      return {
        success: false,
        message: e.message
      };
    }
  }

  /**
   * @description Finds a road with the provided id
   * @param { Object } data
   * @returns { Object } { sucess: true, road }
   */

  static async findRoadById(data) {
    try {
      const road = await Road.findRoadById(data.id);
      return {
        success: true,
        road
      };
    } catch (e) {
      return {
        success: false,
        message: e.message
      };
    }
  }

  /**
   * @description Fetch all roads
   * @param { Object } data
   * @returns { Object } { sucess: true, data: { roads, page_count, item_count, current_page } }
   */

  static async getRoads(data) {
    try {
      data.limit = config.paginationLimit;
      data.offset = (Number(data.page) - 1) * data.limit;
      const result = await Road.fetchRoads(data);
      const applicationCount = result.count.count;
      const itemCount = parseFloat(applicationCount);
      const pageCount = Math.ceil(itemCount / data.limit);

      return {
        success: true,
        data: {
          roads: result.roads,
          page_count: pageCount,
          item_count: itemCount,
          current_page: Number(data.page)
        }
      };
    } catch (e) {
      return {
        success: false,
        message: e.message
      };
    }
  }

  /**
   * @description Fetch road information
   * @param { Object } id - road id
   * @returns { Object } { sucess: true, road }
   */

  static async getRoadInfo(id) {
    try {
      // Ensure road exists;
      const roadResult = await Road.findRoadById(id);
      if (!roadResult) { throw new Error('We are unable to find the selected road'); }
      const road = roadResult;
      const roadWardenResult = await Road.fetchRoadWardens(id);
      if (!roadWardenResult) { throw new Error('Something went wrong, we are unable to fetch warden information for the selected road'); }
      const wardenInformation = {
        wardens: roadWardenResult.roadWardens,
        count: roadWardenResult.count.count
      };
      road.warden_information = wardenInformation || {};
      return {
        success: true,
        road
      };
    } catch (e) {
      return {
        success: false,
        message: e.message
      };
    }
  }

  /**
   * @description Assigns a warden to a road
   * @param { Object } data - { warden_id, road_id }
   * @returns { Object } { sucess: true, road }
   */

  static async assignWardenToRoad(data) {
    try {
      // Verify warden
      const wardenResult = await UserService.fetchUserById(data.warden_id);
      if (!wardenResult.success) { throw new Error('We are unable to verify road warden, please try again'); }
      if (!wardenResult.user) { throw new Error('We are unable to find this warden'); }

      // verify road findRoadById method expects the road_id to be of key id
      data.id = data.road_id;
      const roadResult = await this.findRoadById(data);
      if (!roadResult.success) { throw new Error('We are unable to verify road details, please try again'); }
      if (!roadResult.road) { throw new Error('We counld not find this road'); }

      // assign warden to road
      await Road.assignWarden(data);

      const roadInfoResult = await this.getRoadInfo(data.road_id);
      if (!roadInfoResult.success) { throw new Error('Something went wrong with the assignment, we are looking into it'); }
      const { road } = roadInfoResult;

      return {
        success: true,
        road
      };
    } catch (e) {
      return {
        success: false,
        message: e.message
      };
    }
  }

  /**
   * @description Fetch all roads assigned to a warden
   * @param { String } id - Warden id
   * @returns { Object } { sucess: true, roads }
   */

  static async getRoadsForWarden(id) {
    try {
      const wardenRoadInfo = await Road.fetchRoadsForWarden(id);
      return {
        success: true,
        data: {
          roads: wardenRoadInfo.roads,
          count: wardenRoadInfo.count
        }
      };
    } catch (e) {
      return {
        success: false,
        message: e.message
      };
    }
  }

  /**
   * @description Removes a warden from a road
   * @param { Object } data - { warden_id, road_id }
   * @returns { Object } { sucess: true, road }
   */

  static async removeWardenFromRoad(data) {
    try {
      // remove warden from road
      await Road.unAssignWarden(data);
      const roadInfoResult = await this.getRoadInfo(data.road_id);
      if (!roadInfoResult.success) { throw new Error('Something went wrong removing the assignment, we are looking into it'); }
      const { road } = roadInfoResult;

      return {
        success: true,
        road
      };
    } catch (e) {
      return {
        success: false,
        message: e.message
      };
    }
  }
}

export default RoadService;
