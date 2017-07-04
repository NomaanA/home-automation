'use strict';

var rpio = require('rpio');
rpio.init({ mapping: 'physical' });

module.exports = {
    getStatus: (pin) => rpio.read(pin),
    isOn: (pin) => rpio.read(pin) === 0,
    turnOff: (pin) => rpio.write(pin, rpio.HIGH),
    turnOn: (pin) => rpio.write(pin, rpio.LOW),
    openPin: (pin) => rpio.open(pin, rpio.OUTPUT),
    getAllStatus: () => {
        let statusArray = [];
        relayPins.forEach(pin => {
            statusArray.push({
                pin: pin,
                status: getStatus(pin)
            })
        });
        return statusArray;
    }
}