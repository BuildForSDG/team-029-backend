import moment from 'moment';
import Validator from '../../utils/validator';
import constants from '../../../config/constants';
import UserService from '../../services/user.service';
import RegistrationError from '../../errors/registration.error';
import { bcryptSaltPassword } from './utils';
import LoginError from '../../errors/login.error';

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

      // Generate JWT
      const tokenResult = await UserService.createUserToken(user);
      if (!tokenResult.success) { throw new LoginError(); }
      const { token } = tokenResult;

      return res.status(200).json({
        current_url: req.originalUrl,
        success: true,
        message: 'Registration Successful!',
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
}

export default AuthController;
