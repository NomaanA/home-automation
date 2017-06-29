const express = require('express');
const app = express();
var rpio = require('rpio');

rpio.init({mapping: 'physical'}); 

app.get('/', (req, res) => {
    res.send('Yo');
})


app.get('/api/pin/:pin/status', (req, res) => {
    const pinNumber = parseInt(req.params.pin,10);
    res.send({ status: rpio.read(pinNumber) });
});


app.listen(3000, () => {
    console.log('Running...')
})
