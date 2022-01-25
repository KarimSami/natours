const express = require('express');
const res = require('express/lib/response');
const morgan = require('morgan');
const HTTP_RESP_STATUS = require('./constants/http-resp-status');
const tourRouter = require('./router/tour.router');
const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRouter);
// app.use('/api/v1/users', userController);
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: HTTP_RESP_STATUS.FAIL,
    message: `can't find ${req.originalUrl}`,
  });
});

module.exports = app;
