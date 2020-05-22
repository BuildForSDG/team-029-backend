/**
 * @description Error thrown whenever there's a password reset validation error
 */
class PasswordResetValidationError extends Error {
  constructor(data) {
    super();
    this.message = 'Invalid Input Fields';
    this.name = 'Password Validation Error';
    this.code = 1004;
    this.data = data;
  }
}

export default PasswordResetValidationError;
