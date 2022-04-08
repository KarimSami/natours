const HTTP_RESP_STATUS = require('../constants/http-resp-status');

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    messae: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational)
    res.status(err.statusCode).json({
      status: err.status,
      messae: err.message,
    });
  else {
    res.status(500).json({
      status: HTTP_RESP_STATUS.ERROR,
      messae: 'Something went wrong!',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || HTTP_RESP_STATUS.ERROR;
  console.log(process.env.NODE_ENV);
  if (process.env.NODE_ENV === 'development') sendErrorDev(err, res);
  else if (process.env.NODE_ENV === 'production') sendErrorProd(err, res);
};
