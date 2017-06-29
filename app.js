const express = require('express');
const app = express();
var rpio = require('rpio');

rpio.init({ mapping: 'physical' });

app.get('/', (req, res) => {
    res.send('Yo');
})


app.get('/api/pin/:pin/status', (req, res) => {
    const pinNumber = parseInt(req.params.pin, 10);
    res.send({ status: rpio.read(pinNumber) });
});

app.get('/api/pin/:pin/toggle', (req, res) => {
    const pin = parseInt(req.params.pin, 10);
    rpio.open(pin, rpio.OUTPUT)
    if (rpio.read(pin) === 1) {
        rpio.write(pin, rpio.LOW);
    } else {
        rpio.write(pin, rpio.HIGH);
    }
});



app.listen(3000, () => {
    console.log('Running...')
})