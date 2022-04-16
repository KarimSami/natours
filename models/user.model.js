const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A user must have a name!'],
    },
    photo: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: [true, 'A user must have an email!'],
      validate: {
        validator: validator.isEmail,
        message: 'Not a proper email!',
      },
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'A user must have a password'],
      minlength: 8,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'A user must have confirm password'],
      minlength: 8,
    },
    gender: {
      type: {
        enum: {
          values: ['male', 'female'],
          message: 'Gender must either be "male" or "female"',
        },
      },
      required: false,
    },
    activated: {
      type: Boolean,
      default: false,
    },
  },
  {
    timeStamps: true,
  }
);
const User = mongoose.model('user', userSchema);
module.exports = User;
