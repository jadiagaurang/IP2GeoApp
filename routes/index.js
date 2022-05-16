"use strict";

// External Packages
var express = require("express");
var router = express.Router();
// Internal Modules
const winston = require("../src/logger").winston;
var meLogger = winston(process.env.LOG_LEVEL);

/* GET home page. */
router.get("/", function (req, res) {
    meLogger.info(req.headers["x-forwarded-for"]);
    meLogger.info(req.socket.remoteAddress);
    
    res.render("index", { 
        title: "Convert IP Address to Geolocation Data",
        ipaddress: req.headers["x-forwarded-for"] || req.socket.remoteAddress
    });
});

module.exports = router;