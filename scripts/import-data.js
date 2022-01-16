const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: '../config.env' });
const fs = require('fs');
const Tour = require('../models/tour.model');

mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
  })
  .then(() => console.log('Database connected successfully'));

const tours = fs.readFileSync(
  `${__dirname}/../dev-data/data/tours-simple.json`,
  'utf-8'
);

const importData = async () => {
  try {
    await Tour.create(JSON.parse(tours));
    console.log('Data successfully loaded');
  } catch (e) {
    console.log(e);
  } finally {
    mongoose.disconnect();
  }
};

const deleteAllData = async () => {
  try {
    await Tour.deleteMany();
    console.log('All data deleted');
  } catch (e) {
    console.log(e);
  } finally {
    mongoose.disconnect();
  }
};

if (process.argv[2] == '--import') importData();
if (process.argv[2] == '--delete') deleteAllData();
