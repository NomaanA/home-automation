"use strict";
const express = require("express");
const server = (module.exports = express());
const path = require("path");
const port = process.env.PORT || 3000;
const router = express.Router();
const raspi = require("raspi");
const helper = require("./routes/api/helper.js");

// different routes
const publicPath = path.resolve(__dirname, "../client/public");
const api = require("./routes/api/");
server.use("/api", api);
server.use(express.static(publicPath));

server.use((req, res) => {
    res.status(404).send({ url: req.originalUrl + " not found" });
});

server.set("view engine", "html");
server.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "../client/index.html"));
});

const app = server.listen(port, () => {
    raspi.init(() => {
        console.log(`Running on port ${port}...`);
        helper.openPin(40);
        helper.turnOff(40);
    });
});

const gracefulShutdown = () => {
    helper.openPin(40);
    // TODO: fix this. reverse on and off
    helper.turnOn(40);
    console.log("Bye.");

    app.close();
    process.exit();
};

// listen for TERM signal .e.g. kill
process.on("SIGTERM", gracefulShutdown);

// listen for INT signal e.g. Ctrl-C
process.on("SIGINT", gracefulShutdown);