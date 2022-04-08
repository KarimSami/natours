const HTTP_RESP_STATUS = require('../constants/http-resp-status');
const AppError = require('../utils/app-error');

const handleCastErrorDB = (err) => {
  return new AppError(`Invalid ${err.path} with a value ${err.value}`, 404);
};
const handleDuplicateErrorDB = (err) => {
  return new AppError(
    `Duplicate ${Object.keys(err.keyValue)[0]} with a value "${
      err.keyValue[Object.keys(err.keyValue)[0]]
    }"`,
    500
  );
};
const handleValidationErrorDB = (err) => {
  const errorMessage = Object.keys(err.errors).map(
    (errKey) => err.errors[errKey].message
  );

  return new AppError(errorMessage.join(', and '), 500);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational)
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  else {
    res.status(500).json({
      status: HTTP_RESP_STATUS.ERROR,
      message: 'Something went wrong!',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || HTTP_RESP_STATUS.ERROR;
  if (process.env.NODE_ENV === 'development') sendErrorDev(err, res);
  else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    if (err.name === 'CastError') error = handleCastErrorDB(error);
    if (err.code === 11000) error = handleDuplicateErrorDB(error);
    if (err.name === 'ValidationError') error = handleValidationErrorDB(error);
    sendErrorProd(error, res);
  }
};
