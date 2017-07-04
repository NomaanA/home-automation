'use strict';

const relayPins = [3, 5, 7, 11, 13, 15, 19, 21];
const pinsUtil = require('../pinsUtil.js');
const express = require('express');
const app = express();

app.get('/api/relay/:pin/status', (req, res) => {

    let response = {};
    if (req.params.pin === 'all') {
        response = getAllStatus();
    } else {
        response = getStatus(req.params.pin) === 0 ? 'on' : 'off'
    }
    res.send({
        isAllOn: relayPins.every(isOn),
        status: response
    });
});

app.get('/api/relay/:pin/toggle', (req, res) => {
    const pin = req.params.pin;
    console.log('toggling pin: ', pin)
    openPin(pin);
    isOn(pin) ? turnOff(pin) : turnOn(pin);
    res.send({
        pin: {
            number: pin,
            isOn: isOn(pin)
        }
    });
});

app.get('/api/relay/all/on', (req, res) => {
    console.log('everything is going up!');

    if (!relayPins.every(isOn)) {
        relayPins.forEach(pin => rpio.write(pin, rpio.LOW));
        res.send({ isAllOn: true });
    } else {
        res.send({ isAllOn: true });
        relayPins.forEach(pin => {
            if (!isOn(pin)) turnOn(pin);
        });
        res.send({ isAllOn: true });
    }
})

app.get('/api/relay/all/off', (req, res) => {
    console.log('the world is shutting down');

    if (relayPins.every(isOn)) {
        relayPins.forEach(pin => turnOff(pin));
        res.send({ isAllOn: false });
    } else {
        relayPins.forEach(pin => {
            if (isOn(pin)) turnOff(pin);
        });
        res.send({ isAllOn: false });
    }
})