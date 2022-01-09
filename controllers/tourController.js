const express = require('express');
const router = express.Router();
const tourServices = require('../services/tourService');

router.param('id', tourServices.checkId);

const checkBody = (req, res, next) => {
  const body = req.body;
  if (!(body.name && body.price))
    return res.status(400).json({
      status: 'error',
      message: 'Body is incomplete',
    });
  next();
};

router
  .route('/')
  .get(tourServices.getAllTours)
  .post(checkBody, tourServices.createTour);
router.route('/:id').get(tourServices.getTour).patch(tourServices.updateTour);

module.exports = router;
