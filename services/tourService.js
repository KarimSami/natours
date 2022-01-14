const express = require('express');
const fs = require('fs');
const HTTP_RESP_STATUS = require('../constants/http-resp-status');
const Tour = require('../models/tour.model');

exports.checkBody = (req, res, next) => {
  exports.body = req.body;
  if (!(body.name && body.price))
    return res.status(400).json({
      status: 'error',
      message: 'Body is incomplete',
    });
  next();
};

exports.getAllTours = async (req, res) => {
  const tours = await Tour.find();
  res.status(200).json({
    status: HTTP_RESP_STATUS.SUCCESS,
    results: tours.length,
    data: { tours },
  });
};

exports.createTour = (req, res) => {
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

exports.getTour = async (req, res) => {
  const id = req.params.id;
  const tour = await Tour.findById(id);
  res.status(200).json({
    status: HTTP_RESP_STATUS.SUCCESS,
    results: 1,
    data: { tour },
  });
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: HTTP_RESP_STATUS.SUCCESS,
    data: {
      tour: 'Updated tour',
    },
  });
};
