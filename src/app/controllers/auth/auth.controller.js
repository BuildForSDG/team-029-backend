import moment from 'moment';
import Validator from '../../utils/validator';
import constants from '../../../config/constants';
import config from '../../../config';
import UserService from '../../services/user.service';
import RegistrationError from '../../errors/registration.error';
import { bcryptSaltPassword } from './utils';
import LoginError from '../../errors/login.error';
import PasswordResetError from '../../errors/password.error';
import { encoder } from '../../utils/encoder.decoder';
import sendMail from '../../lib/email';
import sendSms from '../../lib/twilio';

const { DEFAULT_ERROR } = constants;

class AuthController {
  /**
   * @description Registers a new user
   * @param { Object } req - requst object
   * @param { Object } res - response object
   */
  static async register(req, res) {
    try {
      let { body } = req;
      body = Validator.validateRegistration(body);

      const { password } = body;

      // Verify email
      const { email } = body;
      const emailResult = await UserService.fetchUserByEmail(email);
      if (!emailResult.success) { throw new RegistrationError(); }

      if (emailResult.user) { throw new RegistrationError(' Email already exists '); }

      const { salt, hash } = await bcryptSaltPassword(password);

      body.salt = salt;
      body.password = hash;

      // Generate user id
      const idResult = await UserService.generateUserId();
      if (!idResult.success) { throw new RegistrationError(); }

      const { id: userId } = idResult;
      body.id = userId;

      // Determine user role
      const userRole = body.user_type.toLowerCase() === 'admin' ? ['A'] : ['RW'];
      body.user_role = userRole;

      const result = await UserService.CreateUser(body);

      if (!result.success) { throw new RegistrationError(); }

      const { user: newUser } = result;

      delete newUser.password;
      delete newUser.salt;

      return res.status(200).json({
        current_url: req.originalUrl,
        success: true,
        message: 'Registration Successful!',
        status: 200,
        data: newUser

      });
    } catch (e) {
      logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}]`, 'Error: An error occured in AuthController', e);
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


  /**
   * @description Logs in a user
   * @param { Object } req - requst object
   * @param { Object } res - response object
   */

  static async login(req, res) {
    try {
      let { body } = req;
      body = Validator.validateLogin(body);
      const { email, password } = body;
      const userResult = await UserService.fetchUserByEmail(email);
      if (!userResult.success) { throw new LoginError(); }

      if (userResult.sucess && !userResult.user) { throw new LoginError('Invalid user name or password'); }

      const passwordResult = await UserService.verifyPassword(userResult.user, password);
      if (!passwordResult.success) { throw new LoginError(); }

      if (!passwordResult.valid) { throw new LoginError('Invalid user name or password'); }

      const { user } = userResult;
      delete user.password;
      delete user.salt;
      delete user.password_reset_token;
      delete user.password_reset_token_date;

      // Generate JWT
      const tokenResult = await UserService.createUserToken(user);
      if (!tokenResult.success) { throw new LoginError(); }
      const { token } = tokenResult;

      return res.status(200).json({
        current_url: req.originalUrl,
        success: true,
        message: 'Login Successful!',
        status: 200,
        data: { token, user }

      });
    } catch (e) {
      logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}]`, 'Error: An error occured in AuthController', e);
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

  /**
   * @description Creates and sends password reset token to user
   * @param {*} req
   * @param {*} res
   */
  static async resetPassword(req, res) {
    try {
      let { body } = req;
      body = Validator.validatePasswordReset(body);
      const { email } = body;

      const userResult = await UserService.fetchUserByEmail(email);
      if (!userResult.success) { throw new PasswordResetError(); }
      if (!userResult.user) { throw new PasswordResetError('Please provide a valid email'); }
      const { user } = userResult;

      // Create token for user
      const tokenResult = await UserService.createUserPasswordResetToken(user);
      if (!tokenResult.success) { throw new PasswordResetError('Something went wrong, we are looking into it'); }
      const { token } = tokenResult;

      const arg = {
        token
      };

      const argString = JSON.stringify(arg);
      const encryptedToken = encoder(argString);
      const url = `${config.APPLICATION_BASE_URL}/reset-password?token=${encryptedToken}`;
      const message = `Hello! Click on the link to reset your password: ${url}`;
      const options = {
        to: email,
        from: config.NOTIFICATION_SENDER,
        subject: 'Passord Reset',
        text: message,
        html: message
      };

      await sendMail(options);

      const { phone_number: phoneNumber } = user;
      await sendSms(message, phoneNumber);

      return res.status(200).json({
        current_url: req.originalUrl,
        success: true,
        message: 'Password Reset Token Sent Successfully',
        status: 200,
        data: { done: 'true' }

      });
    } catch (e) {
      logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}]`, 'Error: An error occured in AuthController', e);
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

  /**
   * @description Confirms password reset token for a user
   * @param {*} req
   * @param {*} res
   */
  static async confirmPasswordToken(req, res) {
    try {
      if (!(req.query && req.query.token)) { throw new PasswordResetError('Please provide a valid token'); }

      const { token } = req.query;
      // Find user
      await UserService.confirmUserPasswordToken(token);

      return res.status(200).json({
        current_url: req.originalUrl,
        success: true,
        message: 'Password Reset Token Confirmed Successfully',
        status: 200,
        data: { done: 'true' }

      });
    } catch (e) {
      logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}]`, 'Error: An error occured in AuthController', e);
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

  /**
   * @description Changes user password
   * @param {*} req
   * @param {*} res
   */
  static async changePassword(req, res) {
    try {
      let { body } = req;
      body = Validator.validatePasswordResetCredentials(body);
      const { password } = body;
      const { salt, hash } = await bcryptSaltPassword(password);

      body.salt = salt;
      body.password = hash;

      const updateResult = await UserService.updateUserPassword(body);
      if (!updateResult.success) { throw new Error(updateResult.message); }

      const { email } = updateResult.data;

      const message = `Hello! Your password has been changed successfully. You can now login with your new password ${password}`;
      const options = {
        to: email,
        from: config.NOTIFICATION_SENDER,
        subject: 'Passord Reset',
        text: message,
        html: message
      };

      await sendMail(options);

      return res.status(200).json({
        current_url: req.originalUrl,
        success: true,
        message: 'Password Updated Successfully',
        status: 200,
        data: { done: 'true' }

      });
    } catch (e) {
      logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}]`, 'Error: An error occured in AuthController', e);
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

export default AuthController;
