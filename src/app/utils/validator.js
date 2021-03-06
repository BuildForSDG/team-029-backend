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

  static validateRoadCredentials(fields) {
    const schema = Joi.object({
      title: Joi.string().required()
    }).options({ abortEarly: false });

    const result = schema.validate(fields);

    if (result.error) {
      const error = humanizeError(result.error.details);
      throw new PasswordResetValidationError(error);
    }

    return fields;
  }

  static validateRoadUpdateCredentials(fields) {
    const schema = Joi.object({
      title: Joi.string().required(),
      road_id: Joi.number().required()
    }).options({ abortEarly: false });

    const result = schema.validate(fields);

    if (result.error) {
      const error = humanizeError(result.error.details);
      throw new PasswordResetValidationError(error);
    }

    return fields;
  }

  static validateRoadWardenUnassinmentCredentials(fields) {
    const schema = Joi.object({
      road_id: Joi.number().required(),
      assignment_id: Joi.number().required()
    }).options({ abortEarly: false });

    const result = schema.validate(fields);

    if (result.error) {
      const error = humanizeError(result.error.details);
      throw new PasswordResetValidationError(error);
    }

    return fields;
  }

  static validateRoadWardenAssinmentCredentials(fields) {
    const schema = Joi.object({
      road_id: Joi.number().required(),
      warden_id: Joi.string().required()
    }).options({ abortEarly: false });

    const result = schema.validate(fields);

    if (result.error) {
      const error = humanizeError(result.error.details);
      throw new PasswordResetValidationError(error);
    }

    return fields;
  }

  static validateAccidentCredentials(fields) {
    const schema = Joi.object({
      longitude: Joi.number().required(),
      latitude: Joi.number().required(),
      severity: Joi.string().valid('low', 'moderate', 'high').required(),
      description: Joi.string().required(),
      phone_number: Joi.string().required()
    }).options({ abortEarly: false });

    const result = schema.validate(fields);

    if (result.error) {
      const error = humanizeError(result.error.details);
      throw new PasswordResetValidationError(error);
    }

    return fields;
  }

  static validateAccidentCauseCredentials(fields) {
    const schema = Joi.object({
      accident_cause: Joi.string().required()
    }).options({ abortEarly: false });

    const result = schema.validate(fields);

    if (result.error) {
      const error = humanizeError(result.error.details);
      throw new PasswordResetValidationError(error);
    }

    return fields;
  }

  static validateAccidentTypeCredentials(fields) {
    const schema = Joi.object({
      accident_type: Joi.string().required()
    }).options({ abortEarly: false });

    const result = schema.validate(fields);

    if (result.error) {
      const error = humanizeError(result.error.details);
      throw new PasswordResetValidationError(error);
    }

    return fields;
  }

  static validateAccidentReportCredentials(fields) {
    const schema = Joi.object({
      accident_id: Joi.string().required(),
      accident_cause: Joi.string().required(),
      accident_type: Joi.string().required(),
      road_id: Joi.string().required()

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
