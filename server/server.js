'use strict'
const express = require('express')
const server = module.exports = express()

const path = require('path');
const port = process.env.PORT || 3000
const router = express.Router();

// different routes 
const api = require('./routes/api/');

server.set('view engine', 'html')

server.use('/api', api);
server.use((req, res) => {
    res.status(404).send({ url: req.originalUrl + ' not found' })
})

server.get('/', (req, res) => {
    server.use(express.static('client/assets'))
    res.sendFile(path.join(__dirname + '/../client/index.html'))
})

server.listen(port, () => {
    console.log(`Running on port ${port}...`)
        // turn on the power LED
})