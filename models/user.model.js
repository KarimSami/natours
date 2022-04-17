const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
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
      // Will only work on create and save
      validate: {
        validator: function (val) {
          return val === this.password;
        },
        message: "Password don't match!",
      },
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female'],
        message: 'Gender must either be male or female',
      },

      required: false,
    },
  },
  {
    timeStamps: true,
  }
);

userSchema.pre('save', async function (next) {
  //only run this function if password is modified
  if (!this.isModified('password')) return next();

  //hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  //delete the password confirm
  this.passwordConfirm = undefined;
  next();
});
const User = mongoose.model('user', userSchema);
module.exports = User;
