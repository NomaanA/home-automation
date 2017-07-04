'use strict';
const express = require('express');
const app = module.exports = express();
const path = require('path');
const api = require('./api');

var rpio = require('rpio');
rpio.init({ mapping: 'physical' });

app.set('view engine', 'html');
// app.use(express.static('client/assets'));
// app.set('views', './views');

app.get('/', (req, res) => {
    app.use(express.static('client/assets'));
    res.sendFile(path.join(__dirname + '/../client/index.html'));
});

// app.use('/api', express.static(path.join(__dirname + '/api')));


app.listen(3000, () => {
    console.log('Running...')
})