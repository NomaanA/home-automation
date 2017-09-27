"use strict";
const express = require("express");
const app = (module.exports = express());
const path = require("path");
const port = process.env.PORT || 3000;
const router = express.Router();
const raspi = require("raspi");
const isOnline = require("is-online");
const helper = require("./routes/api/helper.js");
const api = require("./routes/api/");

app.set("view engine", "html");

app.get("/", (req, res) => {
    res.status(200).sendFile(`${process.cwd()}/app/public/index.html`);
});

app.use("/api", api);

app.use(express.static(path.join(__dirname, "../public")));

const appInstance = app.listen(port, () => {
    raspi.init(() => {
        console.log(`Running on port ${port}...`);
        // if the pi is not connected to the internet, flash the led
        isOnline().then(online => {
            if (!online) {
                setInterval(() => {
                    helper.getStatus(40) === "off" ?
                        helper.turnOn(40) :
                        helper.turnOff(40);
                }, 1000);
            } else {
                console.log(`online at ${new Date()}`);
                helper.openPin(40);
                helper.turnOff(40);
            }
        });
    });
});

const gracefulShutdown = () => {
    helper.openPin(40);
    // TODO: fix this. reverse on and off
    helper.turnOn(40);
    console.log(`\n offline at ${new Date()}`);
    console.log("\n Bye.");

    appInstance.close();
    process.exit();
};

// listen for TERM signal .e.g. kill
process.on("SIGTERM", gracefulShutdown);

// listen for INT signal e.g. Ctrl-C
process.on("SIGINT", gracefulShutdown);