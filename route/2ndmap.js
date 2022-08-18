var express = require('express');

const home = express.Router();

home.get('/', (req, res) => {
    res.render('./page/2ndmap');
});

module.exports = home;