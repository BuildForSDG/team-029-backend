/**
 * @description Error thrown whenever there's a registration validation error
 */
class RoadValidationError extends Error {
  constructor(data) {
    super();
    this.message = 'Invalid Input Fields';
    this.name = 'Road Validation Error';
    this.code = 1006;
    this.data = data;
  }
}

export default RoadValidationError;
