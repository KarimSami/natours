const HTTP_RESP_STATUS = require('../constants/http-resp-status');
const tourServices = require('../services/tourService');

// router.param('id', tourServices.checkId);

exports.getAllTours = async (req, res) => {
  const tours = await tourServices.getAllTours();
  res.status(200).json({
    status: HTTP_RESP_STATUS.SUCCESS,
    results: tours.length,
    data: { tours },
  });
};

exports.createTour = async (req, res) => {
  const tour = req.body;
  try {
    await tourServices.createTour(tour);
    res.status(201).json({
      status: HTTP_RESP_STATUS.SUCCESS,
      data: tour,
    });
  } catch (e) {
    res.status(500).json({
      status: HTTP_RESP_STATUS.ERROR,
    });
  }
};

exports.getTourById = async (req, res) => {
  const id = req.params.id;
  const tour = await tourServices.getTourById(id);
  res.status(200).json({
    status: HTTP_RESP_STATUS.SUCCESS,
    results: 1,
    data: { tour },
  });
};

exports.updateTour = async (req, res) => {
  const id = req.params.id;
  const payload = req.body;
  try {
    const newTour = await tourServices.updateTour(id, payload);
    if (!newTour) throw new Error();
    res.status(201).json({
      status: HTTP_RESP_STATUS.SUCCESS,
      tour: newTour,
    });
  } catch (e) {
    res.status(500).json({
      status: HTTP_RESP_STATUS.ERROR,
    });
  }
};
