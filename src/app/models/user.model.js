import moment from 'moment';
import db from '../utils/database';
import userQuery from '../queries/user';

class User {
  /**
     * @description Fetches a single user from the database using the user's id
     * @param { Number } id
     * @returns { Object } user - Returns the user as an object
  */

  static async findUserById(id) {
    try {
      const user = await db.oneOrNone(userQuery.findUserById, [id]);
      return user;
    } catch (e) {
      logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}]`, 'Error: Failed to fetch user from findUserById method in  user.model', e);
      throw new Error('Failed to fetch user');
    }
  }

  /**
     * @description Fetches a single user from the database using the user's email
     * @param { String } email
     * @returns { Object } user - Returns the user as an object
  */

  static async findUserByEmail(email) {
    try {
      const user = await db.oneOrNone(userQuery.findUserByEmail, [email]);
      return user;
    } catch (e) {
      logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}]`, 'Error: Failed to fetch user from findUserById method in  user.model', e);
      throw new Error('Failed to fetch user');
    }
  }

  /**
   * @description Creates a new user
   * @param { Object } userData - Users details
   * @returns { Object } user - Returns the newly created user or throws an error if it fails
   */

  static async createUser(userData) {
    try {
      const {
        id, first_name: firstName, last_name: lastName, email,
        phone_number: phoneNumber, office_address: officeAddress, user_role: userRole, password, salt
      } = userData;

      const user = await db.oneOrNone(
        userQuery.createUser,
        [id, firstName, lastName, email, officeAddress, phoneNumber, userRole, password, salt]
      );

      return user;
    } catch (e) {
      logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}]`, 'Error: Failed to create user from createUser method in  user.model', e);
      throw new Error('Failed to create user');
    }
  }

  /**
   * @description Verifies user id
   * @param { Number } id - user id
   */

  static async verifyUserId(id) {
    try {
      const user = await db.oneOrNone(
        userQuery.verifyUserId,
        [id]
      );

      return user;
    } catch (e) {
      logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}]`, 'Error: Failed to verify user id from verifyUserId method in  user.model', e);
      throw new Error('Failed to verify id');
    }
  }
}

export default User;
