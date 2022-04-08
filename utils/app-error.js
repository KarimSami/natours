const HTTP_RESP_STATUS = require('../constants/http-resp-status');

class AppError extends Error {
  //use this error class for operational errors only
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4')
      ? HTTP_RESP_STATUS.FAIL
      : HTTP_RESP_STATUS.ERROR;
    this.isOperational = true; //used to test if the error is operational
    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = AppError;
