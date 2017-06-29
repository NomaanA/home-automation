const express = require('express');
const app = express();
var rpio = require('rpio');


app.get('/', (req, res) => {
    res.send('Yo');
})


app.get('/api/pin/:pin/status', (req, res) => {
    console.log(req.params.pin);
    res.send({ status: rpio.read(req.params.pin) });
});


app.listen(3000, () => {
    console.log('Running...')
})