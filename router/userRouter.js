const express = require('express');
const HTTP_RESP_STATUS = require('../constants/http-resp-status');

const router = express.Router();

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: HTTP_RESP_STATUS.ERROR,
    message: 'This route is not yet implemented',
  });
};
const createUser = (req, res) => {
  res.status(500).json({
    status: HTTP_RESP_STATUS.ERROR,
    message: 'This route is not yet implemented',
  });
};
const getUser = (req, res) => {
  res.status(500).json({
    status: HTTP_RESP_STATUS.ERROR,
    message: 'This route is not yet implemented',
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: HTTP_RESP_STATUS.ERROR,
    message: 'This route is not yet implemented',
  });
};

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser);

module.exports = router;
