const express = require('express');
const morgan = require('morgan');
const tourController = require('./controllers/tourController');
const userController = require('./controllers/userController');

const app = express();
const port = 8000;

// middlewares
app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// routers
app.use('/api/v1/tours', tourController);
app.use('/api/v1/users', userController);

// start server
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
