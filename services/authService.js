const User = require('../models/user.model');

exports.createUser = async (userData) => {
  return await User.create(userData);
};
