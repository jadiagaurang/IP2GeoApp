"use strict";

var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {
    res.render("index", { 
        title: "Convert IP Address to Geolocation Data",
        ipaddress: req.headers["x-forwarded-for"] || req.socket.remoteAddress
    });
});

module.exports = router;