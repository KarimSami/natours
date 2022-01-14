const mongoose = require('mongoose');
const app = require('./app');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
  })
  .then(() => console.log('Database connected successfully'));

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    require: [true, 'A tour must have a price'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);

app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}`);
});
