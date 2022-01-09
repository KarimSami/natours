const express = require('express');
const fs = require('fs');
const HTTP_RESP_STATUS = require('../constants/http-resp-status');
const router = express.Router();

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8')
);
console.log(__dirname);
const getAllTours = (req, res) => {
  res.status(200).json({
    status: HTTP_RESP_STATUS.SUCCESS,
    results: tours.length,
    data: { tours },
  });
};

const getTourById = (id) => {
  return tours.find((tour) => tour.id === id);
};

const createTour = (req, res) => {
  const tour = req.body;
  tour['id'] = tours.length;
  try {
    writeTourToFile(tour);
    res.status(201).json({
      status: HTTP_RESP_STATUS.SUCCESS,
      data: tour,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      status: HTTP_RESP_STATUS.ERROR,
    });
  }
};
const writeTourToFile = (tour) => {
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify([...tours, tour]),
    (err) => {
      if (err) {
        throw new Error();
      }
    }
  );
};

const getTour = (req, res) => {
  const id = +req.params.id;
  const tour = getTourById(id);
  if (!tour)
    res.status(404).json({
      status: HTTP_RESP_STATUS.FAIL,
      message: 'No Such Tour',
    });

  res.status(200).json({
    status: HTTP_RESP_STATUS.SUCCESS,
    results: 1,
    data: { tour },
  });
};

const updateTour = (req, res) => {
  if (!getTourById(+req.params.id))
    res.status(404).json({
      status: HTTP_RESP_STATUS.FAIL,
    });
  res.status(200).json({
    status: HTTP_RESP_STATUS.SUCCESS,
    data: {
      tour: 'Updated tour',
    },
  });
};

router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTour).patch(updateTour);

module.exports = router;
