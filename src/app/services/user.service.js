import User from '../models/user.model';
import { getRandomString, verifyHash, generateJWTToken } from '../controllers/auth/utils';
import constants from '../../config/constants';

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
}

export default UserService;
