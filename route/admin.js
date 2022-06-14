var express = require('express');

const admin = express.Router();

admin.get('/', (req, res) => {
    res.render('./admin/index');
});

module.exports = admin;