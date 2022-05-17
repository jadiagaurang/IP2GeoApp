"use strict";

// External Packages
var express = require("express");
var router = express.Router();
// Internal Modules
const util = require("../src/utility.js");
const winston = require("../src/logger").winston;
var meLogger = winston(process.env.LOG_LEVEL);

/* GET home page. */
router.get("/", function (req, res) {
    meLogger.info("x-forwarded-for: " + req.headers["x-forwarded-for"]);
    meLogger.info("remoteAddress: " + req.socket.remoteAddress);

    var strClientIP = "";
    if (!util.isBlank(req.headers["x-forwarded-for"])) {
        if (req.headers["x-forwarded-for"].split(",").length > 0) {
            strClientIP = req.headers["x-forwarded-for"].split(",")[0].trim()
        }
    }
    else {
        strClientIP = req.socket.remoteAddress;
    }

    res.render("index", { 
        title: "Convert IP Address to Geolocation Data",
        ipaddress: strClientIP
    });
});

module.exports = router;