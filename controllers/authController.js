const HTTP_RESP_STATUS = require('../constants/http-resp-status');
const authService = require('../services/authService');
const catchAsync = require('../utils/catch-async');
const AppError = require('../utils/app-error');
const { issueToken } = require('../utils/issue-token');

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await authService.createUser({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = issueToken(newUser._id);

  res.status(201).json({
    status: HTTP_RESP_STATUS.SUCCESS,
    token,
    data: {
      user: newUser,
    },
  });
});

exports.signin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  const token = await authService.authenticateUser(email, password);
  if (!token)
    return next(new AppError('Username or password is incorrect', 400));
  res.status(200).json({
    status: HTTP_RESP_STATUS.SUCCESS,
    token,
  });
});
