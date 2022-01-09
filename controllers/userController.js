const express = require('express');
const userServices = require('../services/userService');
const router = express.Router();

router.route('/').get(userServices.getAllUsers).post(userServices.createUser);
router.route('/:id').get(userServices.getUser).patch(userServices.updateUser);

module.exports = router;
