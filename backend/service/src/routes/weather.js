const express = require('express');
const router = express.Router();
const paths = require('../../config/paths');
const { weatherController } = require(paths.WEATHER_CONTROLLER);

router.post('/weather', weatherController);

module.exports = router;