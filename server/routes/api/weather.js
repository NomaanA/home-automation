'use strict'

const express = require('express');
const weather = express.Router();

const raspi = require('raspi');
const I2C = require('raspi-i2c').I2C;

const darkSky = require('./third-party/darkSky.js');

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

weather.get('/current/indoor', (req, res) => {
    let unit = req.query.unit;
    let temperature = {};

    if (unit === undefined) unit = 'c';

    raspi.init(() => {
        try {
            temperature = readTemperature(unit);
        } catch (e) {
            temperature = '--';
            if (e.error == null) {
                console.log('\x1b[36m%s\x1b[0m', ' 💩 💩 💩 You need to run the server as an admin. ')
            } else {
                console.log('error:::', e);
            }
        }

        res.send({
            'timestamp': new Date(),
            temperature,
            unit
        });
    });
})

weather.get('/current/outdoor', (req, res) => {
    darkSky.getCurrentWeather().then((resp) => {
        res.send({ currentWeather: resp });
    });
})

module.exports = weather;