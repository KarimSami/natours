const express = require('express');
const fs = require('fs');
const app = express();
const HTTP_RESP_STATUS = require('./constants/http-resp-status');

app.use(express.json()); //this is a middle waire provided by express library and used by the app to parse the request body on the request object

const port = 8000;

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8')
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: HTTP_RESP_STATUS.SUCCESS,
    results: tours.length,
    data: { tours },
  });
});

app.post('/api/v1/tours/', (req, res) => {
  const tour = req.body;
  tour['id'] = tours.length;

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify([...tours, tour]),
    (err) => {
      if (err) {
        console.log(e);
        res.status(500).json({
          status: HTTP_RESP_STATUS.ERROR,
        });
      }
      res.status(201).json({
        status: HTTP_RESP_STATUS.SUCCESS,
        data: tour,
      });
    }
  );
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
