const express = require('express');
const res = require('express/lib/response');
const morgan = require('morgan');
const HTTP_RESP_STATUS = require('./constants/http-resp-status');
const tourRouter = require('./router/tour.router');
const AppError = require('./utils/app-error');
const globalErrorHandler = require('./controllers/errorController');
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
  const error = new AppError(`can't find ${req.originalUrl}`, 404);
  next(error);
});

app.use(globalErrorHandler);

module.exports = app;
