/**
 * @description Formats joi error messages into a more readable form. Sample
 * @param { Array } errors array of error objects. Sample:
 * [
 *    {
 *          "message": "\"last_name\" is required",
 *          "path": [
 *              "last_name"
 *          ],
 *          "type": "any.required",
 *          "context": {
 *              "label": "last_name",
 *              "key": "last_name"
 *          }
 *      }
 * ]
 */

const humanizeError = (errors) => {
  const humanizedError = {};
  errors.forEach((error) => {
    if (error.path.join('.') === 'confirm_password') {
      humanizedError[error.path.join('.')] = 'Passwords do not match';
    } else {
      humanizedError[error.path.join('.')] = error.message;
    }
  });
  return humanizedError;
};

export default humanizeError;
