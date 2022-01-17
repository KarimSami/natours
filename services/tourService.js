const Tour = require('../models/tour.model');

exports.getAllTours = async (filter, sort, fields, pagination) => {
  const exculdedFields = ['page', 'sort', 'limit', ' fileds'];
  exculdedFields.forEach((field) => delete filter[field]);
  let queryString = JSON.stringify(filter);
  queryString = queryString.replace(
    /\b(gte|gt|lt|lte)\b/g,
    (match) => `$${match}`
  );

  let query = Tour.find(JSON.parse(queryString));
  const sortBy = sort.split(',').join(' ');
  const selectedFields = fields.split(',').join(' ');
  query
    .sort(sortBy)
    .select(selectedFields)
    .skip((pagination.page - 1) * pagination.pageSize)
    .limit(pagination.pageSize);

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
