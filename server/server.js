'use strict'
const express = require('express')
const server = module.exports = express()
const path = require('path')
const api = require('./api')
const port = process.env.PORT || 3000

var rpio = require('rpio')
rpio.init({ mapping: 'physical' })

server.set('view engine', 'html')
    // server.use(express.static('client/assets'))
    // server.set('views', './views')

server.get('/', (req, res) => {
    server.use(express.static('client/assets'))
    res.sendFile(path.join(__dirname + '/../client/index.html'))
})

server.use(function(req, res) {
        res.status(404).send({ url: req.originalUrl + ' not found' })
    })
    // server.use('/api', express.static(path.join(__dirname + '/api')))

server.listen(port, () => {
    console.log(`Running on port ${port}...`)
        // turn on the power LED
})