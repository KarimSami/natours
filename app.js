const express = require('express');
const morgan = require('morgan');
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

module.exports = app;
