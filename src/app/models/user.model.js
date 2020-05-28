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
        phone_number: phoneNumber, office_address: officeAddress,
        user_role: userRole, password, salt
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

  /**
   * @description Saves user's password reset token
   * @param { Number } id - user id
   * @param { String } token
   */

  static async saveUserResetToken(id, token) {
    try {
      await db.none(userQuery.saveUserPasswordToken, [token, moment(), id]);
      return true;
    } catch (e) {
      logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}]`, 'Error: Failed to save password reset token from saveUserResetToken method in  user.model', e);
      throw new Error('Failed to save user password reset token');
    }
  }

  /**
   * @description Find user by token
   * @param { String } token
   */

  static async findUserByToken(token) {
    try {
      const user = await db.oneOrNone(userQuery.findUserByToken, [token]);
      return user;
    } catch (e) {
      logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}]`, 'Error: Failed to find user with the provided token from findUserByToken method in  user.model', e);
      throw new Error('Failed to find token for user');
    }
  }

  /**
   * @description Updates user password credentials
   * @param { String } token
   */

  static async updatePassword(data) {
    try {
      const { salt, password, userId } = data;
      await db.none(userQuery.updatePassword, [null, null, salt, password, userId]);
      return true;
    } catch (e) {
      logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}]`, 'Error: Failed to update user password from updatePassword method in  user.model', e);
      throw new Error('Failed to update user password');
    }
  }

  /**
   * @description Fetches a user of warden role
   * @param { String }  id - User id
   */

  static async fetchWarden(id) {
    try {
      const user = await db.oneOrNone(userQuery.findWardenUserById, [id]);
      return user;
    } catch (e) {
      logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}]`, 'Error: Failed to fetch warden from fetchWarden method in  user.model', e);
      throw new Error('Failed to fetch warden');
    }
  }

  /**
   * @description Fetch warden that has not been assigned to an accident
   */

  static async findUnassignedWarden() {
    try {
      const user = await db.oneOrNone(userQuery.findUnassignedWarden);
      return user;
    } catch (e) {
      logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}]`, 'Error: Failed to fetch warden from findUnassignedWarden method in  user.model', e);
      throw new Error('Failed to fetch unassigned warden');
    }
  }

  /**
   * @description Fetch warden with no pending accident cases
   */

  static async findWardenWithNoPendingAccidentCases() {
    try {
      const user = await db.oneOrNone(userQuery.findWardenWithNoPendingAccidentCases);
      return user;
    } catch (e) {
      logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}]`, 'Error: Failed to fetch warden from findWardenWithNoPendingAccidentCases method in  user.model', e);
      throw new Error('Failed to fetch warden with no pending accident cases');
    }
  }

  /**
   * @description Fetch warden with  least pending accident cases
   */

  static async findWardenWithLeastPendingAccidentCases() {
    try {
      const user = await db.oneOrNone(userQuery.findWardenWithLeastPendingAccidentCases);
      return user;
    } catch (e) {
      logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}]`, 'Error: Failed to fetch warden from findWardenWithLeastPendingAccidentCases method in  user.model', e);
      throw new Error('Failed to fetch warden with least pending accident cases');
    }
  }
}

export default User;
