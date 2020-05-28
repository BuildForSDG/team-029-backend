
import axios from 'axios';
import config from '../../config';

class ReverseGeocodeService {
  /**
   * @description Converts cordinates to a readable address
   * @param { Object } data { longitude, latitude }
   * @returns { Object } { sucess, address: {}}
   */

  static async translateCordinates(data) {
    try {
      const { longitude, latitude } = data;
      const apiKey = config.GOOGLE_API_KEY;
      const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`);
      return {
        success: true,
        data: res.data
      };
    } catch (e) {
      return {
        success: false,
        message: e.message
      };
    }
  }
}

export default ReverseGeocodeService;
