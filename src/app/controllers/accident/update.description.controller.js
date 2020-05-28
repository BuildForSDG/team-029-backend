import moment from 'moment';
import constants from '../../../config/constants';
import AccidentService from '../../services/accident.service';
// import ReverseGeocodeService from '../../services/reverse.geocode.service';
// import WardenService from '../../services/warden.service';
// import NotificationService from '../../services/notification.service';
// import sendSms from '../../lib/twilio';
// import sendMail from '../../lib/email';
// import config from '../../../config';
import AccidentRoutingService from '../../services/accident.routing.service';

const { DEFAULT_ERROR } = constants;

class updateDescriptionController {
  /**
   * @description Updates accident's description
   * @param { Object } req - requst object
   * @param { Object } res - response object
   */
  static async saveDescription(req, res) {
    try {
      const { body } = req;
      const accidentResult = await AccidentService.saveAccidentDescription(body);
      if (!accidentResult.success) { throw new Error(accidentResult.message); }
      let { accident } = accidentResult;
      const routingResult = await AccidentRoutingService.handleAccident(accident, body);
      if (!routingResult.success) { throw new Error(routingResult.message); }

      accident = routingResult.accident;

      // const data = {
      //   longitude: Number(accidentResult.accident.longitude),
      //   latitude: Number(accidentResult.accident.latitude)
      // };

      // const addressTransalation = await ReverseGeocodeService.translateCordinates(data);
      // if (!addressTransalation.success) { throw new Error(accidentResult.message); }
      // const addressData = {
      //   formatted_address: addressTransalation.data.results[0].formatted_address,
      //   full_address: addressTransalation.data,
      //   ussd_session_id: body.ussd_session_id
      // };

      // AccidentService.saveAccidentFullAddress(addressData)
      //   .then(() => logger.info(`[${moment().format('DD-MM-YYYY h:i:s')}]: ######## Address saved`));

      // accidentResult.accident.address = addressTransalation.data.results[0].formatted_address;
      // accidentResult.accident.place_id = addressTransalation.data.results[0].place_id;

      // // Automatically find available warden
      // const wardenResult = await WardenService.determineAvailableWarden();
      // if (!wardenResult.success) { throw new Error(wardenResult.message); }

      // const { warden } = wardenResult;
      // accidentResult.accident.warden_user_id = warden.warden_user_id;

      // // Assign warden to accident

      // // eslint-disable-next-line
      // const attachmentResult = await AccidentService.attachWardenToAccident(accidentResult.accident);
      // if (!attachmentResult.success) { throw new Error('We are unable to assign a warden at the moment'); }

      // const wardenPhoneNumber = warden.phone_number;
      // const { email } = warden;

      // // Send Sms
      // const message = `Hello! You have an emergency assigned to you.\nSeverity: ${accidentResult.accident.severity}\nVictim Address: ${accidentResult.accident.address}\nVictim contact: ${accidentResult.accident.victim_phone_number}\nFor more information, please visit your dashboard.
      // `;
      // const emailMessage = `<b>Hello!</b> You have an emergency assigned to you.<br/>
      //     Severity: ${accidentResult.accident.severity}<br/>
      //     Victim Address: ${accidentResult.accident.address}<br/>
      //     Victim contact: ${accidentResult.accident.victim_phone_number}<br/>
      //     For more information, please visit your dashboard.
      // `;

      // sendSms(message, wardenPhoneNumber)
      //   .then(() => logger.info(`[${moment().format('DD-MM-YYYY h:i:s')}]: ######## Emergency sms sent to [ ${wardenPhoneNumber}] `));

      // // Send mail
      // const options = {
      //   to: email,
      //   from: config.NOTIFICATION_SENDER,
      //   subject: 'New Emergency',
      //   text: emailMessage,
      //   html: emailMessage
      // };

      // sendMail(options)
      //   .then(() => logger.info(`[${moment().format('DD-MM-YYYY h:i:s')}]: ######## Emergency mail sent to [ ${email}] `));

      // // Firebase
      // NotificationService.notifyFirebase(accidentResult.accident)
      //   .then(() => logger.info(`[${moment().format('DD-MM-YYYY h:i:s')}]: ######## Firebase notified`));

      return res.status(200).json({
        current_url: req.originalUrl,
        success: true,
        message: 'Accident Description Entered',
        status: 200,
        data: accident

      });
    } catch (e) {
      logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}]`, 'Error: An error occured in updateDescriptionController', e);
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

export default updateDescriptionController;
