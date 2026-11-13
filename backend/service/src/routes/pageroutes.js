const express = require('express');
const router = express.Router();
const path = require('path');
const paths = require('../../config/paths');

router.get('/', (req, res) => {
    res.sendFile(path.join(paths.PUBLIC, 'index.html'));
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(paths.PUBLIC, 'login.html'));
});

router.get('/signin', (req, res) => {
    res.sendFile(path.join(paths.PUBLIC, 'sign.html'));
});

router.get('/about', (req, res) => {
    res.sendFile(path.join(paths.PUBLIC, 'about.html'));
});

router.get('/weather', (req, res) => {
    res.sendFile(path.join(paths.PUBLIC, 'weather.html'));
});

module.exports = router;