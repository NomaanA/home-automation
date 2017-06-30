const express = require('express');
const app = express();
var rpio = require('rpio');

rpio.init({ mapping: 'physical' });

app.get('/', (req, res) => {
    res.send('Yo');
})

const relayPins = [3, 5, 7, 9, 11, 13, 15, 19, 21];


app.get('/api/relay/:pin/status', (req, res) => {
    const pinNumber = parseInt(req.params.pin, 10);
    res.send({ status: rpio.read(pinNumber) });
});

app.get('/api/relay/:pin/toggle', (req, res) => {
    const pin = parseInt(req.params.pin, 10);
    rpio.open(pin, rpio.OUTPUT)
    if (rpio.read(pin) === 1) {
        rpio.write(pin, rpio.LOW);
    } else {
        rpio.write(pin, rpio.HIGH);
    }
});

app.get('/api/relay/toggle-all', (req, res) => {
    relayPins.map(pin => {
        if (rpio.read(pin) === 1) {
            rpio.write(pin, rpio.LOW);
        } else {
            rpio.write(pin, rpio.HIGH);
        }
    });
})



app.listen(3000, () => {
    console.log('Running...')
})