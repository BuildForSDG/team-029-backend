import Joi from '@hapi/joi';
import RegistrationValidationError from '../errors/registration.validation.error';
import humanizeError from '../errors/utils/humanize.errors';
import constants from '../../config/constants';
import LoginValidationError from '../errors/login.validation.error';
import PasswordResetValidationError from '../errors/password.reset.validation.error';

const { USER_ROLES } = constants;

class Validator {
  /**
   * @description Validates user registration fields
   * @param {*} fields - Inputs supplied by user
   * @returns fields if valid otherwise, it returns an object of fields that failed the validation
   */

  static validateRegistration(fields) {
    const schema = Joi.object({
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone_number: Joi.string().min(11).max(11).required(),
      office_address: Joi.string().required(),
      user_type: Joi.string().valid(...USER_ROLES).required(),
      password: Joi.string().min(6).max(15).required(),
      confirm_password: Joi.any().valid(Joi.ref('password')).required()

    }).options({ abortEarly: false });

    const result = schema.validate(fields);

    if (result.error) {
      const error = humanizeError(result.error.details);
      throw new RegistrationValidationError(error);
    }

    return fields;
  }

  static validateLogin(fields) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(15).required()
    }).options({ abortEarly: false });

    const result = schema.validate(fields);

    if (result.error) {
      const error = humanizeError(result.error.details);
      throw new LoginValidationError(error);
    }

    return fields;
  }

  static validatePasswordReset(fields) {
    const schema = Joi.object({
      email: Joi.string().email().required()
    }).options({ abortEarly: false });

    const result = schema.validate(fields);

    if (result.error) {
      const error = humanizeError(result.error.details);
      throw new PasswordResetValidationError(error);
    }

    return fields;
  }

  static validatePasswordResetCredentials(fields) {
    const schema = Joi.object({
      token: Joi.string().required(),
      password: Joi.string().min(6).max(15).required(),
      confirm_password: Joi.any().valid(Joi.ref('password')).required()
    }).options({ abortEarly: false });

    const result = schema.validate(fields);

    if (result.error) {
      const error = humanizeError(result.error.details);
      throw new PasswordResetValidationError(error);
    }

    return fields;
  }
}

export default Validator;
