import { prompt } from 'inquirer';
import moment from 'moment';
import { getRandomString, bcryptSaltPassword } from '../controllers/auth/utils';
import userQuery from '../queries/user';
import db from '../utils/database';

/** *****************************************************
 *  This script is used to create the first admin.     *
 *  => HOW TO RUN:                                     *
 *      > npm run create-admin                         *
 *  Note: Ensure you wait until the terminal returns.  *
 ****************************************************** */

const questions = [
  {
    type: 'input',
    name: 'firstName',
    message: 'Enter first name:  ',
    validate: (value) => {
      if (value) { return true; }
      return 'First name is required!';
    }
  },
  {
    type: 'input',
    name: 'lastName',
    message: 'Enter last name:  ',
    validate: (value) => {
      if (value) { return true; }
      return 'Last name is required!';
    }
  },
  {
    type: 'input',
    name: 'phoneNumber',
    message: 'Enter phone number (11 digits): ',
    validate: (value) => {
      // eslint-disable-next-line
      if (value && value.length === 11 && !isNaN(value)) { 
        return true;
      }
      return 'Please enter a valid phone number';
    }
  },
  {
    type: 'input',
    name: 'officeAddress',
    message: 'Enter address: ',
    validate: (value) => {
      if (value) { return true; }
      return 'Office address is required!';
    }
  },
  {
    type: 'input',
    name: 'email',
    message: 'Enter your email:  ',
    validate: (value) => {
      if (value && value.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i)) { return true; }
      return 'Invalid email!';
    }
  },
  {
    type: 'password',
    name: 'password',
    message: 'Enter your password:  ',
    validate: (value) => {
      if (value) { return true; }
      return 'Password is required!';
    }
  },
  {
    type: 'password',
    name: 'confirmPassword',
    message: 'Confirm Password:  ',
    validate: (value, answers) => {
      if (value === answers.password) { return true; }
      return 'Passwords do not match!';
    }
  }

];

const createFirstAdmin = async () => {
  try {
    const answer = await prompt(questions);
    const { password } = answer;
    const { hash, salt } = await bcryptSaltPassword(password);
    const id = `USR-${getRandomString(5)}`;
    const userRole = ['A'];
    const {
      firstName, lastName, phoneNumber, officeAddress, email
    } = answer;
    db.oneOrNone(
      userQuery.createUser,
      [
        id, firstName, lastName, email, officeAddress, phoneNumber, userRole, hash, salt
      ]
    )// eslint-disable-next-line
      .then(() => console.log('Admin created successfully!, Finishing...')).catch((err) => console.log(err));
  } catch (err) {
    logger.error(`[${moment().format('DD-MMM-YYYY, h:mm:ss')}]`, 'Error: Critical error occurred in admin bash script', err);
  }
};

createFirstAdmin();
