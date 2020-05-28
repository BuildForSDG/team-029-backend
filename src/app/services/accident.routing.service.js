import moment from 'moment';
import AccidentService from './accident.service';
import ReverseGeocodeService from './reverse.geocode.service';
import WardenService from './warden.service';
import NotificationService from './notification.service';
import sendSms from '../lib/twilio';
import sendMail from '../lib/email';
import config from '../../config';

class AccidentRoutingService {
  /**
   * @description Performs address translation, warding selection
   * and routing notification to the right channel
   * @param { Object } accident
   */
  static async handleAccident(accident, body = {}) {
    try {
      const data = {
        longitude: Number(accident.longitude),
        latitude: Number(accident.latitude)
      };

      const addressTransalation = await ReverseGeocodeService.translateCordinates(data);
      if (!addressTransalation.success) { throw new Error(addressTransalation.message); }
      const addressData = {
        formatted_address: addressTransalation.data.results[0].formatted_address,
        full_address: addressTransalation.data,
        ussd_session_id: body.ussd_session_id,
        accident_id: accident.id
      };

      AccidentService.saveAccidentFullAddress(addressData)
        .then(() => logger.info(`[${moment().format('DD-MM-YYYY h:i:s')}]: ######## Address saved`));

      accident.address = addressTransalation.data.results[0].formatted_address;
      accident.place_id = addressTransalation.data.results[0].place_id;

      // Automatically find available warden
      const wardenResult = await WardenService.determineAvailableWarden();
      if (!wardenResult.success) { throw new Error(wardenResult.message); }

      const { warden } = wardenResult;
      accident.warden_user_id = warden.warden_user_id;

      // Assign warden to accident

      // eslint-disable-next-line
      const attachmentResult = await AccidentService.attachWardenToAccident(accident);
      if (!attachmentResult.success) { throw new Error('We are unable to assign a warden at the moment'); }

      const wardenPhoneNumber = warden.phone_number;
      const { email } = warden;

      // Send Sms
      const message = `Hello! You have an emergency assigned to you.\nSeverity: ${accident.severity}\nVictim Address: ${accident.address}\nVictim contact: ${accident.victim_phone_number}\nFor more information, please visit your dashboard.
      `;
      const emailMessage = `<b>Hello!</b> You have an emergency assigned to you.<br/>
          Severity: ${accident.severity}<br/>
          Victim Address: ${accident.address}<br/>
          Victim contact: ${accident.victim_phone_number}<br/>
          For more information, please visit your dashboard.
      `;

      sendSms(message, wardenPhoneNumber)
        .then(() => logger.info(`[${moment().format('DD-MM-YYYY h:i:s')}]: ######## Emergency sms sent to [ ${wardenPhoneNumber}] `));

      // Send mail
      const options = {
        to: email,
        from: config.NOTIFICATION_SENDER,
        subject: 'New Emergency',
        text: emailMessage,
        html: emailMessage
      };

      sendMail(options)
        .then(() => logger.info(`[${moment().format('DD-MM-YYYY h:i:s')}]: ######## Emergency mail sent to [ ${email}] `));

      // Firebase
      NotificationService.notifyFirebase(accident)
        .then(() => logger.info(`[${moment().format('DD-MM-YYYY h:i:s')}]: ######## Firebase notified`));

      return {
        success: true,
        accident
      };
    } catch (e) {
      logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}]`, 'Error: An error occured in AccidentRoutingService', e);
      return {
        success: false,
        message: e.message
      };
    }
  }
}

export default AccidentRoutingService;
