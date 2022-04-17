const HTTP_RESP_STATUS = require('../constants/http-resp-status');
const authService = require('../services/authService');
const catchAsync = require('../utils/catch-async');

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await authService.createUser(req.body);
  res.status(201).json({
    status: HTTP_RESP_STATUS.SUCCESS,
    data: {
      user: newUser,
    },
  });
});
