import Q from 'q';
import twilio from 'twilio';
import config from '../../config';

const accountSid = config.TWILIO_SID;
const authToken = config.TWILIO_AUTH_TOKEN;
const from = config.TWILIO_PHONE_NUMBER;
const client = twilio(accountSid, authToken);

const sendSms = async (message, phoneNumber) => {
  logger.info(`Sending Message ${message} to ${phoneNumber}`);
  const defer = Q.defer();
  const intlNumber = phoneNumber.split('');
  intlNumber.shift();
  const to = `+234${intlNumber.join('')}`;

  client.messages.create({
    from,
    body: message,
    to
  }).then((response) => {
    defer.resolve(response.sid);
  }).catch((e) => {
    logger.error(`Error sending SMS to ${to}`, e);
    defer.reject(e);
  });
  return defer.promise;
};
export default sendSms;
