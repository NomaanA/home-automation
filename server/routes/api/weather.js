'use strict'
const express = require('express');
const weather = express.Router();
var request = require('superagent-bluebird-promise');
const raspi = require('raspi');
const I2C = require('raspi-i2c').I2C;
const darkSky = require('./third-party/darkSky.js');
const convertTemp = (temp, unit) => {
    if (unit === undefined) unit = 'c';
    switch (unit) {
        case 'f':
            temp = (temp * 1.8 + 32)
            break;
        case 'c':
            // it's already in celsius
            break;
        case 'k':
            temp = temp + 273.15;
            break;
    }
    return temp;
}
weather.get('/current/indoor', (req, res) => {
    let unit = req.query.unit;
    let temperature = {};
    const i2c = new I2C();

    i2c.read(0x48, 0xac, (e, temp) => {});
    
    i2c.readByte(0x48, (e, temp) => {
        if (!e) {
            temp = convertTemp(temp, unit);
        } else {
            if (e.error == null) {
                console.log('\x1b[36m%s\x1b[0m', ' 💩 💩 💩 You need to run the server as an admin. ')
            }
            temp = 0;
            console.log('error reading the temp');
        }
        res.send({
            'timestamp': new Date(),
            temp,
            unit
        });
    });
});
weather.get('/current/outdoor', (req, res) => {
    darkSky.getCurrentWeather().then((resp) => {
        res.send({
            currentWeather: resp
        });
    });
});
module.exports = weather;