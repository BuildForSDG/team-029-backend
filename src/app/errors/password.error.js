/**
 * @description Error thrown whenever there's a password reset error after validation has passed
 */
class PasswordResetError extends Error {
  constructor(msg) {
    super();
    this.message = msg || 'Unable to reset password at the moment';
    this.name = 'Password Error';
    this.code = 1005;
    this.data = {};
  }
}

export default PasswordResetError;
