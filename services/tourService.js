const HTTP_RESP_STATUS = require('../constants/http-resp-status');
const Tour = require('../models/tour.model');

exports.getAllTours = async () => {
  return await Tour.find();
};

exports.createTour = async (tour) => {
  try {
    return await new Tour(tour).save();
  } catch (e) {
    return e;
  }
};

exports.getTourById = async (id) => {
  return await Tour.findById(id);
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: HTTP_RESP_STATUS.SUCCESS,
    data: {
      tour: 'Updated tour',
    },
  });
};
