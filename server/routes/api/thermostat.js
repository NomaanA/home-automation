'use strict'

const express = require('express');
const thermostat = express.Router();

const raspi = require('raspi');
const I2C = require('raspi-i2c').I2C;

const readTemperature = (unit) => {
    const i2c = new I2C();

    let reading = i2c.readByteSync(0x48, 0x00);

    switch (unit) {
        case 'f':
            reading = (reading * 1.8 + 32)
            break;
        case 'c':
            // it's already in celsius
            break;
        case 'k':
            reading = reading + 273.15;
            break;
    }

    return Math.round(reading);
};

thermostat.get('/', (req, res) => {
    let unit = req.query.unit;
    let temperature = {};

    if (unit === undefined) unit = 'c';

    raspi.init(() => {
        try {
            temperature = readTemperature(unit);
        } catch (e) {
            temperature = '--';
            console.log('error:::', e);
        }

        res.send({
            'timestamp': new Date(),
            temperature,
            unit
        });
    });
})

module.exports = thermostat;