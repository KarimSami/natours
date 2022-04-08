const HTTP_RESP_STATUS = require('../constants/http-resp-status');
const tourServices = require('../services/tourService');
const catchAsync = require('../utils/catch-async');
const AppError = require('../utils/app-error');
// router.param('id', tourServices.checkId);

exports.getAllTours = catchAsync(async (req, res, next) => {
  const tours = await tourServices.getAllTours({ ...req.query });
  res.status(200).json({
    status: HTTP_RESP_STATUS.SUCCESS,
    results: tours.length,
    data: { tours },
  });
});

exports.createTour = catchAsync(async (req, res, next) => {
  const tour = req.body;
  const createdTour = await tourServices.createTour(tour);
  res.status(201).json({
    status: HTTP_RESP_STATUS.SUCCESS,
    data: createdTour,
  });
});

exports.getTourById = async (req, res, next) => {
  const id = req.params.id;
  const tour = await tourServices.getTourById(id);
  if (!tour) return next(new AppError('no tour with that id', 404));

  res.status(200).json({
    status: HTTP_RESP_STATUS.SUCCESS,
    data: { tour },
  });
};

exports.updateTour = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const payload = req.body;
  const newTour = await tourServices.updateTour(id, payload);
  if (!newTour) return next(new AppError('no tour with that id', 404));
  res.status(201).json({
    status: HTTP_RESP_STATUS.SUCCESS,
    tour: newTour,
  });
});

exports.deleteTour = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const tour = await tourServices.deleteTour(id);
  if (!tour) return next(new AppError('no tour with that id', 404));
  res.status(200).json({
    status: HTTP_RESP_STATUS.SUCCESS,
  });
});

exports.getTourStats = catchAsync(async (req, res, next) => {
  const stats = await tourServices.getTourStats();
  res.status(200).json({
    status: HTTP_RESP_STATUS.SUCCESS,
    data: { stats },
  });
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = +req.params.year;
  const plan = await tourServices.getMonthlyPlan(year);
  res.status(200).json({
    status: HTTP_RESP_STATUS.SUCCESS,
    data: { plan },
  });
});
