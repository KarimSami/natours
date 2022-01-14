const mongoose = require('mongoose');

const tourSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name!'],
      unique: true,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price!'],
    },

    rating: {
      type: Number,
      default: 4.5,
    },
  },
  { timestamps: true }
);

const Tour = mongoose.model('tour', tourSchema);

module.exports = Tour;