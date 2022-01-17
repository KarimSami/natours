const Tour = require('../models/tour.model');

exports.getAllTours = async (filter) => {
  const exculdedFields = ['page', 'sort', 'limit', ' fileds'];
  exculdedFields.forEach((field) => delete filter[field]);
  const query = Tour.find(filter);
  return await query;
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
