const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../../frontend/public/index.html'));
});

router.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../../frontend/public/about.html'));
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../../frontend/public/login.html'));
});

router.get('/weather', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../../frontend/public/weather.html'));
});

module.exports = router;