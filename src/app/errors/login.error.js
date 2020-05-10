/**
 * @description Error thrown whenever there's a registration error after validation has passed
 */
class LoginError extends Error {
  constructor(msg) {
    super();
    this.message = msg || 'Unable to login in user at the moment';
    this.name = 'Login Error';
    this.code = 1003;
    this.data = {};
  }
}

export default LoginError;
