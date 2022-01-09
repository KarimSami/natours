const express = require('express');
const router = express.Router();
const tourServices = require('../services/tourService');

router.param('id', tourServices.checkId);

router.route('/').get(tourServices.getAllTours).post(tourServices.createTour);
router.route('/:id').get(tourServices.getTour).patch(tourServices.updateTour);

module.exports = router;
