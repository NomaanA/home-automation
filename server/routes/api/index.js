'use strict';
const express = require('express');
const router = express.Router();

// const pinsUtil = require('../pinsUtil.js');
// const server = require('../server.js');
// const config = require('../../config')
const weather = require('./weather');
const relay = require('./relay');

router.get('/', (req, res) => {
    res.send('cool, we got an api!');
})

router.use('/weather', weather);
router.use('/relay', relay)

module.exports = router;