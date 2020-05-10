/**
 * @description Error thrown whenever there's a registration error after validation has passed
 */
class RegistrationError extends Error {
  constructor(msg) {
    super();
    this.message = msg || 'Unable to register user at the moment';
    this.name = 'Registration Error';
    this.code = 1001;
    this.data = {};
  }
}

export default RegistrationError;
