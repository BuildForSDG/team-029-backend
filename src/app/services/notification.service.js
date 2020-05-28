
import axios from 'axios';

class NotificationService {
  /**
   * @description Sends notification to firebase database
   * @param { Object } data
   * @returns { Object } { sucess, done }
   */

  static async notifyFirebase(data) {
    try {
      const fbData = {
        accident_id: data.id,
        address: data.address,
        description: data.description,
        created_at: data.created_at,
        warden_user_id: data.warden_user_id,
        victim_phone_number: data.victim_phone_number,
        longitude: Number(data.longitude),
        latitude: Number(data.latitude),
        severity: data.severity,
        read: false,
        place_id: data.place_id
      };

      const res = await axios.post('https://us-central1-roadry-cloud.cloudfunctions.net/notifications/alert', fbData);
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

export default NotificationService;
