const Tour = require('../models/tour.model');
const APIFeatures = require('../utils/api-features');

exports.getAllTours = async (reqQuery) => {
  const features = new APIFeatures(Tour.find(), reqQuery)
    .filter()
    .sort('-createdAt')
    .select('-__v')
    .paginate({ page: 1, pageSize: 10 });
  return await features.query;
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
