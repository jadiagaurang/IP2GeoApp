"use strict";

// External Packages
const express = require("express");
var router = express.Router();
// Internal Modules
const winston = require("../src/logger").winston;
const ip6addr = require("ip6addr");
const MMGeoIP2Bot = require("../src/geoip.js");
const util = require("../src/utility.js");
var meLogger = winston(process.env.LOG_LEVEL);

/* GET */
router.get("/geoip", function (req, res) {
	doMMGeoIP2Bot(req, res);
});
/* POST */
router.post("/geoip", function (req, res) {
	doMMGeoIP2Bot(req, res);
});

//Routing Callback
function doMMGeoIP2Bot (req, res) {
    try {
        //Get IPAddress from the Request
        var varIP = req.query.ipaddress;    //Try to get it from Query String
        if (util.isBlank(varIP)) {
            varIP = req.body.ipaddress;     //Try to get it from Request Body
        }

        if (util.isBlank(varIP)) {
            throw new Error("Invalid IP");
        }

        try {
            (async() => {
                var objIP = ip6addr.parse(varIP);
                var theIP = objIP.toString();

                let outputResponse = {};
                var varCachedResult = await util.getCachedResult(theIP);

                if (varCachedResult != null) {
                    //Response Back from the Cache
                    outputResponse = JSON.stringify(varCachedResult);

                    //Set Response Header for Debugging
                    res.writeHead(200, { "Content-Type": "application/json", "X-Cache": "HIT" });
                    res.write(outputResponse);
                    res.end();
                }
                else {
                    try {
                        //GeoIPBot Module Object
                        var objMMGeoIP2Bot = new MMGeoIP2Bot(theIP);

                        Promise.all([objMMGeoIP2Bot.getASN(), objMMGeoIP2Bot.getCity(), objMMGeoIP2Bot.getCountry()]).then(function(results) {
                            let varASN = results[0];
                            let varCity = results[1];
                            let varCountry = results[2];

                            outputResponse = {
                                "asn": varASN,
                                "city": varCity,
                                "country": varCountry
                            };

                            (async() => {
                                var blnResult = await util.setCachedResult(theIP, outputResponse);
                                if (!blnResult) {
                                    meLogger.info("MMGeoIP2Bot MemcachedClient Set Exception at " + (new Date()));
                                }
                            })();
                            
                            //Set Response ContentType
                            res.writeHead(200, { "Content-Type": "application/json", "X-Cache": "MISS" });

                            //Write Output
                            res.write(JSON.stringify(outputResponse));
                            res.end();
                        });
                    }
                    catch(innerException) {
                        meLogger.error("MMGeoIP2Bot Controller Exception: " + innerException + " at " + (new Date()));

                        //Set Response ContentType
                        res.writeHead(500, {"Content-Type": "application/json"});

                        //Write Output
                        res.write(JSON.stringify({
                            "Status": "ERROR",
                            "Message": innerException
                        }));
                        res.end();

                        return;
                    }
                }
            })();
        }
        catch (ex) {
            meLogger.error(ex);

            throw ex;
        }
    }
    catch (outerException) {
        meLogger.error("MMGeoIP2Bot Controller Exception: " + outerException + " at " + (new Date()));

        res.writeHead(500, {"Content-Type": "application/json"});
        res.write(JSON.stringify({
          "Status": "ERROR",
          "Message": outerException
        }));
        res.end();

        return;
    }
}

module.exports = router;