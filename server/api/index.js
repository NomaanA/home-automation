'use strict';
const pinsUtil = require('../pinsUtil.js');
const server = require('../server.js');

const relayPins = [3, 5, 7, 11, 13, 15, 19, 21];

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
})