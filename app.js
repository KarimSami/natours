const express = require('express');
const morgan = require('morgan');
const tourController = require('./controllers/tourController');
const userController = require('./controllers/userController');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourController);
app.use('/api/v1/users', userController);

module.exports = app;
