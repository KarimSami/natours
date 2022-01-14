const express = require('express');
const fs = require('fs');
const HTTP_RESP_STATUS = require('../constants/http-resp-status');
const Tour = require('../models/tour.model');

exports.getAllTours = async (req, res) => {
  const tours = await Tour.find();
  res.status(200).json({
    status: HTTP_RESP_STATUS.SUCCESS,
    results: tours.length,
    data: { tours },
  });
};

exports.createTour = async (req, res) => {
  const tour = new Tour(req.body);
  try {
    await tour.save();
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
