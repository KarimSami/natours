const mongoose = require('mongoose');
const app = require('./app');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
  })
  .then(() => console.log('Database connected successfully'));
app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}`);
});
