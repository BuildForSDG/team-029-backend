import moment from 'moment';
import db from '../utils/database';
import roadQuery from '../queries/road';

class Road {
  /**
     * @description Saves a new road in the database
     * @param { Object } data
  */

  static async createRoad(data) {
    try {
      const { title } = data;
      const road = await db.oneOrNone(roadQuery.createRoad, [title]);
      return road;
    } catch (e) {
      logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}]`, 'Error: Failed to create road in createsRoad method in  road.model', e);
      throw new Error('Failed to create road');
    }
  }

  /**
     * @description Updates a road title in the database
     * @param { Object } data
  */

  static async updateRoadTitle(data) {
    try {
      const { road_id: id, title } = data;
      const road = await db.oneOrNone(roadQuery.updateRoadTitle, [title, moment(), id]);
      return road;
    } catch (e) {
      logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}]`, 'Error: Failed to update road in updateRoadTile method in  road.model', e);
      throw new Error('Failed to update road title');
    }
  }

  /**
     * @description Returns road with the provided id
     * @param { Object } data
  */

  static async findRoadById(id) {
    try {
      const road = await db.oneOrNone(roadQuery.findRoadById, [id]);
      return road;
    } catch (e) {
      logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}]`, 'Error: Failed to Find road in findRoadById method in  road.model', e);
      throw new Error('Failed to fetch road');
    }
  }

  /**
     * @description Returns list of roads
     * @param { Object } data : { offset, limit }
  */

  static async fetchRoads(data) {
    try {
      const { offset, limit } = data;
      const roads = await db.any(roadQuery.fetchRoads, [offset, limit]);
      const count = await db.oneOrNone(roadQuery.countRoads);
      return {
        roads,
        count
      };
    } catch (e) {
      logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}]`, 'Error: Failed to feech road in fetchRoads method in  road.model', e);
      throw new Error('Failed to fetch roads');
    }
  }

  /**
     * @description Returns list of road users info
     * @param { Object } id  - Road id
  */

  static async fetchRoadWardens(id) {
    try {
      const roadWardens = await db.any(roadQuery.fetchRoadWardens, [id]);
      const count = await db.oneOrNone(roadQuery.countRoadWardens, [id]);
      return {
        roadWardens,
        count
      };
    } catch (e) {
      logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}]`, 'Error: Failed to fetch road wardens in fetchRoadWardens method in  road.model', e);
      throw new Error('Failed to fetch road wardens');
    }
  }

  /**
     * @description Assign warden
     * @param { Object } data
  */

  static async assignWarden(data) {
    try {
      const { road_id: roadId, warden_id: wardenId } = data;
      await db.none(roadQuery.assignWardenToRoad, [roadId, wardenId, 'Active', moment()]);
      return true;
    } catch (e) {
      logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}]`, 'Error: Failed to assign warden to road in assignWarden method in road.model', e);
      throw new Error('Failed to assign warden to road');
    }
  }

  /**
     * @description Returns list of roads assigned to the provided warden
     * @param { String } id : Warden id
  */

  static async fetchRoadsForWarden(id) {
    try {
      const userId = id;
      const roads = await db.any(roadQuery.fetchWardenRoads, [userId]);
      const count = await db.oneOrNone(roadQuery.countWardenRoads, [userId]);
      return {
        roads,
        count
      };
    } catch (e) {
      logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}]`, 'Error: Failed to fetch roads in fetchRoadsForWarden method in  road.model', e);
      throw new Error('Failed to fetch roads assigned to this warden, please try again');
    }
  }

  /**
     * @description Unassigns a warden from a road
     * @param { Object } data
  */

  static async unAssignWarden(data) {
    try {
      const { assignment_id: id } = data;
      await db.none(roadQuery.unassignWarden, [id]);
      return true;
    } catch (e) {
      logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}]`, 'Error: Failed to remove warden from road in unAssignWarden method in road.model', e);
      throw new Error('Failed to remove warden from road');
    }
  }
}

export default Road;
