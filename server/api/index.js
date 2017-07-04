'use strict';
const pinsUtil = require('../pinsUtil.js');
const app = require('../server.js');

const relayPins = [3, 5, 7, 11, 13, 15, 19, 21];

app.get('/api/relay/:pin/status', (req, res) => {

    let response = {};
    if (req.params.pin === 'all') {
        response = pinsUtil.getAllStatus();
    } else {
        response = pinsUtil.getStatus(req.params.pin) === 0 ? 'on' : 'off'
    }
    res.send({
        isAllOn: relayPins.every(isOn),
        status: response
    });
});

app.get('/api/relay/:pin/toggle', (req, res) => {
    const pin = req.params.pin;
    console.log('toggling pin: ', pin)
    pinsUtil.openPin(pin);
    pinsUtil.isOn(pin) ? pinsUtil.turnOff(pin) : pinsUtil.turnOn(pin);
    res.send({
        pin: {
            number: pin,
            isOn: pinsUtil.isOn(pin)
        }
    });
});

app.get('/api/relay/all/on', (req, res) => {
    console.log('everything is going up!');

    if (!relayPins.every(pinsUtil.isOn)) {
        relayPins.forEach(pin => pinsUtil.turnOff(pin));
        res.send({ isAllOn: true });
    } else {
        res.send({ isAllOn: true });
        relayPins.forEach(pin => {
            if (!pinsUtil.isOn(pin)) pinsUtil.turnOn(pin);
        });
        res.send({ isAllOn: true });
    }
})

app.get('/api/relay/all/off', (req, res) => {
    console.log('the world is shutting down');

    if (relayPins.every(pinsUtil.isOn)) {
        relayPins.forEach(pin => pinsUtil.turnOff(pin));
        res.send({ isAllOn: false });
    } else {
        relayPins.forEach(pin => {
            if (pinsUtil.isOn(pin)) pinsUtil.turnOff(pin);
        });
        res.send({ isAllOn: false });
    }
})