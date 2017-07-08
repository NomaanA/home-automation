'use strict';
const pinsUtil = require('../pinsUtil.js');
const server = require('../server.js');

//TODO: move these to a helper for sensors
const raspi = require('raspi');
const I2C = require('raspi-i2c').I2C;

const relayPins = [16, 18, 22, 11, 13, 15, 19, 21];

server.get('/api/relay/status', (req, res) => {

    const pin = req.query.pin;
    let response = {};

    if (pin === 'all') {
        response = pinsUtil.getAllStatus(relayPins);
    } else {
        console.log(pinsUtil.getStatus(pin));
        response = pinsUtil.getStatus(pin) === 0 ? 'on' : 'off'
    }
    res.send({
        isAllOn: relayPins.every(pinsUtil.isOn),
        status: response
    });
});

//TODO: move this to a sensors file 
server.get('/api/sensors/temperature', (req, res) => {
    const unit = req.query.unit;

    let respond = {};

    raspi.init(() => {
        const i2c = new I2C();
        try {
            respond = i2c.readByteSync(0x48, 0x00);
            respond = unit === 'f' ? (respond * 1.8 + 32) : respond;
            respond = Math.round(respond);

        } catch (e) {
            respond = '--';
            console.log('error:::', e);
        }
        res.send({
            'timestamp': new Date(),
            'temperature': respond
        });
    });
})

server.post('/api/relay/toggle', (req, res) => {
    const pin = req.query.pin;
    let respond = {};
    console.log('toggling pin: ', pin)

    if (pin === 'all') {
        if (!relayPins.every(pinsUtil.isOn)) {
            relayPins.forEach(pin => pinsUtil.turnOn(pin));
        } else {
            relayPins.forEach(pin => {
                pinsUtil.isOn(pin) ? pinsUtil.turnOff(pin) : pinsUtil.turnOn(pin);
            });
        }
        respond = { isAllOn: relayPins.every(pinsUtil.isOn) }
    } else {
        pinsUtil.openPin(pin);
        pinsUtil.isOn(pin) ? pinsUtil.turnOff(pin) : pinsUtil.turnOn(pin);
        respond = {
            pin: {
                number: pin,
                isOn: pinsUtil.isOn(pin)
            }
        };
    }

    res.send(respond);
});

server.post('/api/relay/all/on', (req, res) => {
    console.log('everything is going up!');

    if (!relayPins.every(pinsUtil.isOn)) {
        relayPins.forEach(pin => pinsUtil.turnOn(pin));
        res.send({ isAllOn: true });
    } else {
        res.send({ isAllOn: true });
        relayPins.forEach(pin => {
            if (!pinsUtil.isOn(pin)) pinsUtil.turnOff(pin);
        });
        res.send({ isAllOn: true });
    }
})

server.post('/api/relay/all/off', (req, res) => {
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

server.post('/api/relay/all/toggle', (req, res) => {
    console.log('everything is going up!');
    if (!relayPins.every(pinsUtil.isOn)) {
        relayPins.forEach(pin => pinsUtil.turnOn(pin));
        res.send({ isAllOn: true });
    } else {
        res.send({ isAllOn: true });
        relayPins.forEach(pin => {
            if (!pinsUtil.isOn(pin)) pinsUtil.turnOff(pin);
        });
        res.send({ isAllOn: true });
    }
});