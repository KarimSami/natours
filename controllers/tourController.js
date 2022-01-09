const express = require('express');
const router = express.Router();
const tourServices = require('../services/tourService');

router.route('/').get(tourServices.getAllTours).post(tourServices.createTour);
router.route('/:id').get(tourServices.getTour).patch(tourServices.updateTour);

module.exports = router;
