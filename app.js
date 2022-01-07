const express = require('express');
const fs = require('fs');
const app = express();
const HTTP_RESP_STATUS = require('./constants/http-resp-status');
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

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
