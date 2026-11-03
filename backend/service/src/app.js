const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const paths = require('../config/paths');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

const pageRoutes = require(paths.ROUTES + '/pageroutes.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(paths.PUBLIC));

app.use('/', pageRoutes);
app.use('/', require(paths.ROUTES + '/weather.js'));
app.listen(PORT, () => {
    console.log(`Server avviato su http://localhost:${PORT}`);
});