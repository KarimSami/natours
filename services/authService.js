const { issueToken } = require('../utils/issue-token');
const User = require('../models/user.model');
const AppError = require('../utils/app-error');

exports.createUser = async (userData) => {
  return await User.create(userData);
};

exports.authenticateUser = async (email, password) => {
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password)))
    throw new AppError('Incorrect email or password');
  return issueToken(user._id);
};
