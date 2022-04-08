module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || HTTP_RESP_STATUS.ERROR;
  res.status(err.statusCode).json({
    status: err.status,
    messae: err.message,
  });
};
