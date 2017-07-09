'use strict'

const express = require('express');
const relay = express.Router();

const helper = require('./helper');
const config = require('../../../config');
const relayPins = config.relayPins;

relay.get('/status', (req, res) => {

    const pin = req.query.pin;
    let response = {};

    if (pin === 'all') {
        response = helper.getAllStatus(relayPins);
    } else {
        console.log(helper.getStatus(pin));
        response = helper.getStatus(pin) === 0 ? 'on' : 'off'
    }
    res.send({
        isAllOn: relayPins.every(helper.isOn),
        status: response
    });
});


relay.post('/toggle', (req, res) => {
    const pin = req.query.pin;
    let respond = {};
    console.log('toggling pin: ', pin);

    if (pin === 'all') {

        if (!relayPins.every(helper.isOn)) {
            relayPins.forEach(pin => {
                helper.openPin(pin);
                helper.turnOn(pin)
            });
        } else {
            relayPins.forEach(pin => {
                helper.isOn(pin) ? helper.turnOff(pin) : helper.turnOn(pin);
            });
        }
        respond = { isAllOn: relayPins.every(helper.isOn) }
    } else {
        helper.openPin(pin);
        helper.isOn(pin) ? helper.turnOff(pin) : helper.turnOn(pin);
        respond = {
            pin: {
                number: pin,
                isOn: helper.isOn(pin)
            }
        };
    }

    res.send(respond);
});

relay.post('/all/on', (req, res) => {
    console.log('everything is going up!');

    if (!relayPins.every(helper.isOn)) {
        relayPins.forEach(pin => helper.turnOn(pin));
        res.send({ isAllOn: true });
    } else {
        relayPins.forEach(pin => {
            if (!helper.isOn(pin)) helper.turnOff(pin);
        });
        res.send({ isAllOn: true });
    }
})

relay.post('/all/off', (req, res) => {
    console.log('the world is shutting down');

    if (relayPins.every(helper.isOn)) {
        relayPins.forEach(pin => helper.turnOff(pin));
        res.send({ isAllOn: false });
    } else {
        relayPins.forEach(pin => {
            if (helper.isOn(pin)) helper.turnOff(pin);
        });
        res.send({ isAllOn: false });
    }
})

relay.post('/all/toggle', (req, res) => {

    //if all of them are not on 
    if (!relayPins.every(helper.isOn)) {
        relayPins.forEach(pin => {
            helper.openPin(pin);
            helper.turnOn(pin);
        });
        res.send({ isAllOn: true });
    } else {
        relayPins.forEach(pin => {
            helper.openPin(pin);
            helper.isOn(pin) ? helper.turnOff(pin) : helper.turnOn(pin)
        });
        res.send({ isAllOn: false });
    }
});

module.exports = relay;