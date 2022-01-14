const Tour = require('../models/tour.model');

exports.getAllTours = async () => {
  return await Tour.find();
};

exports.createTour = async (tour) => {
  try {
    return await Tour.create(tour);
  } catch (e) {
    return e;
  }
};

exports.getTourById = async (id) => {
  return await Tour.findById(id);
};

exports.updateTour = async (id, payload) => {
  return await Tour.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
};

exports.deleteTour = async (id) => {
  return await Tour.findByIdAndDelete(id);
};
