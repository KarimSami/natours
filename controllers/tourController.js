const express = require('express');
const HTTP_RESP_STATUS = require('../constants/http-resp-status');
const tourServices = require('../services/tourService');

// router.param('id', tourServices.checkId);

exports.getAllTours = async (req, res) => {
  const tours = await tourServices.getAllTours();
  res.status(200).json({
    status: HTTP_RESP_STATUS.SUCCESS,
    results: tours.length,
    data: { tours },
  });
};

exports.createTour = async (req, res) => {
  const tour = req.body;
  try {
    const resp = await tourServices.createTour(tour);
    console.log(resp);
    res.status(201).json({
      status: HTTP_RESP_STATUS.SUCCESS,
      data: tour,
    });
  } catch (e) {
    res.status(500).json({
      status: HTTP_RESP_STATUS.ERROR,
    });
  }
};

exports.getTourById = async (req, res) => {
  const id = req.params.id;
  const tour = await tourServices.getTourById(id);
  res.status(200).json({
    status: HTTP_RESP_STATUS.SUCCESS,
    results: 1,
    data: { tour },
  });
};
