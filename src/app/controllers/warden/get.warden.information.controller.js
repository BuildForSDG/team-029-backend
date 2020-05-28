import moment from 'moment';
import constants from '../../../config/constants';
import WardenService from '../../services/warden.service';

const { DEFAULT_ERROR } = constants;

class GetWardenInfoController {
  /**
   * @description Fetches warden info road | accident responses | road assignments
   * @param { Object } req - requst object
   * @param { Object } res - response object
   */
  static async getWardenInformation(req, res) {
    try {
      const wardenId = req.params.id;
      if (!wardenId) { throw new Error('We are unable to find details for this warden, check the warden supplied'); }
      const infoResult = await WardenService.fetchWardenInfo(wardenId);
      if (!infoResult.success) { throw new Error(infoResult.message); }
      return res.status(200).json({
        current_url: req.originalUrl,
        success: true,
        message: 'Information Fetched Successfully',
        status: 200,
        data: infoResult.data

      });
    } catch (e) {
      logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}]`, 'Error: An error occured in GetWardenInfoController', e);
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

export default GetWardenInfoController;
