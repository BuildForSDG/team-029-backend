import uuidv1 from 'uuid/v1';
import moment from 'moment';
import User from '../models/user.model';
import { getRandomString, verifyHash, generateJWTToken } from '../controllers/auth/utils';
import constants from '../../config/constants';
import config from '../../config';
import { decoder } from '../utils/encoder.decoder';
import PasswordResetError from '../errors/password.error';

const { MIN_ID_LENGTH } = constants;

class UserService {
  /**
   * @description Creates a new user
   * @param { Object } data
   * @returns { Object } { sucess: true, user }
   */
  static async CreateUser(data) {
    try {
      const user = await User.createUser(data);
      return {
        success: true,
        user
      };
    } catch (e) {
      return {
        success: false,
        message: e.message
      };
    }
  }

  /**
   *
   * @description Generates a unique user id
   */
  static async generateUserId() {
    try {
      let id = getRandomString(MIN_ID_LENGTH);
      let idExists = true;
      while (idExists) {
        // eslint-disable-next-line
        idExists = await User.verifyUserId(id);
        if (idExists) {
          id = getRandomString(MIN_ID_LENGTH);
        }
      }

      id = `USR-${id}`;

      return {
        success: true,
        id
      };
    } catch (e) {
      return {
        success: false,
        message: e.message
      };
    }
  }

  /**
   *
   * @description Verifies user password
   */
  static async verifyPassword(user, password) {
    try {
      const { password: passwordHash, salt } = user; // hashed password
      const passwordIsValid = await verifyHash(password, salt, passwordHash);
      return {
        success: true,
        valid: passwordIsValid
      };
    } catch (e) {
      return {
        success: false,
        message: e.message
      };
    }
  }

  /**
   * @description Fetches user by email
   * @param { String } email - User email
   */
  static async fetchUserByEmail(email) {
    try {
      const user = await User.findUserByEmail(email);
      return {
        success: true,
        user
      };
    } catch (e) {
      return {
        success: false,
        message: e.message
      };
    }
  }

  /**
   * @description Logs in a user
   * @param { Object } user - User details
   */
  static async createUserToken(user) {
    try {
      const token = generateJWTToken(user);
      return {
        success: true,
        token
      };
    } catch (e) {
      return {
        success: false,
        message: e.message
      };
    }
  }

  /**
   * @description Logs in a user
   * @param { Object } email - User details
   */
  static async createUserPasswordResetToken(user) {
    try {
      const { id } = user;
      const token = uuidv1();
      await User.saveUserResetToken(id, token);
      return {
        success: true,
        token
      };
    } catch (e) {
      return {
        success: false,
        message: e.message
      };
    }
  }

  /**
   * @description Confirm user password reset token validity
   * @param { String } token - User token
   */
  static async confirmUserPasswordToken(token) {
    try {
      const { token: decodedToken } = JSON.parse(decoder(token));
      const user = await User.findUserByToken(decodedToken);
      if (!user) { throw new Error('Invalid reset token provided'); }

      const tokenIsValid = this.verifyTokenExpiry(user);
      if (!tokenIsValid) { throw new Error('Token expired'); }
      return {
        success: true,
        data: user
      };
    } catch (e) {
      return {
        success: false,
        message: e.message
      };
    }
  }

  /**
   * @description Updates user password credentials
   * @param { String } token - User token
   */
  static async updateUserPassword(data) {
    try {
      const { token } = data;
      const confirmationResult = await this.confirmUserPasswordToken(token);
      if (!confirmationResult.success) { throw new PasswordResetError('Token is invalid'); }
      const { id } = confirmationResult.data;
      data.userId = id;
      await User.updatePassword(data);
      return {
        success: true,
        data: confirmationResult.data
      };
    } catch (e) {
      return {
        success: false,
        message: e.message
      };
    }
  }

  static verifyTokenExpiry(user) {
    const { password_reset_token_date: passwordResetTokenDate } = user;
    const a = moment(passwordResetTokenDate);
    const b = moment();
    const dateDifference = b.diff(a, 'seconds');
    const expiryTime = (config.passwordResetTokenExpiresIn * 60 * 60);
    if (expiryTime > dateDifference) {
      return true;
    }
    return false;
  }
}

export default UserService;
