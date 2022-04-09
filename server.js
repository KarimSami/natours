const mongoose = require('mongoose');
const app = require('./app');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
process.on('unhandledRejection', (err) => {
  server.close(() => {
    process.exit(1);
  });
});

process.on('uncaughtException', (err) => {
  console.log('uncaughtException, shuting down');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
  })
  .then(() => console.log('Database connected successfully'));

const server = app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}`);
});
