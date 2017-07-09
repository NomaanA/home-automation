'use strict';
const express = require('express');
const router = express.Router();

// const pinsUtil = require('../pinsUtil.js');
// const server = require('../server.js');
// const config = require('../../config')
const thermostat = require('./thermostat');
const relay = require('./relay');

router.get('/', (req, res) => {
    res.send('cool, we got an api!');
})

router.use('/thermostat', thermostat);
router.use('/relay', relay)

module.exports = router;