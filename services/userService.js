const express = require('express');
const HTTP_RESP_STATUS = require('../constants/http-resp-status');

exports.getAllUsers = (req, res) => {
  res.status(500).json({
    status: HTTP_RESP_STATUS.ERROR,
    message: 'This route is not yet implemented',
  });
};
exports.createUser = (req, res) => {
  res.status(500).json({
    status: HTTP_RESP_STATUS.ERROR,
    message: 'This route is not yet implemented',
  });
};
exports.getUser = (req, res) => {
  res.status(500).json({
    status: HTTP_RESP_STATUS.ERROR,
    message: 'This route is not yet implemented',
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: HTTP_RESP_STATUS.ERROR,
    message: 'This route is not yet implemented',
  });
};
