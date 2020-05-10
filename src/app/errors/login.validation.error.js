/**
 * @description Error thrown whenever there's a login validation error
 */
class LoginValidationError extends Error {
  constructor(data) {
    super();
    this.message = 'Invalid Input Fields';
    this.name = 'Login Validation Error';
    this.code = 1002;
    this.data = data;
  }
}

export default LoginValidationError;
