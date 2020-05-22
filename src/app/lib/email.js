import Q from 'q';
import sgMail from '@sendgrid/mail';
import config from '../../config';

sgMail.setApiKey(config.SEND_GRID_API_KEY);

const sendMail = (options) => {
  const defer = Q.defer();
  const msg = {
    to: options.to,
    from: options.from,
    subject: options.subject,
    text: options.text,
    html: options.html
  };

  logger.info(JSON.stringify(msg, null, '\t'));

  sgMail.send(msg)
    .then(() => {
      defer.resolve(true);
    })
    .catch((e) => {
      defer.reject(e);
    });
  return defer.promise;
};

export default sendMail;
