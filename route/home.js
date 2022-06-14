var express = require('express');

const home = express.Router();

home.get('/', (req, res) => {
    res.render('./page/index');
});

module.exports = home;