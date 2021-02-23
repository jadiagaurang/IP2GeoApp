'use strict';
var express = require('express');
var router = express.Router();

const ip6addr = require("ip6addr");
const MMGeoIP2Bot = require("../src/geoip.js");
const util = require("../src/utility.js");

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
        console.log("MMGeoIP2Bot Controller Started at " + (new Date()));

        //Handling invalid request
      	if(util.isInvalidRequests(req)) {
            res.writeHead(204);
            res.end();
            return;
        }

        //Get IPAddress from the Request
        var varIP = req.query.ipaddress;    //Try to get it from Query String
        if (util.isBlank(varIP)) {
            varIP = req.body.ipaddress;     //Try to get it from Request Body
        }

        if (util.isBlank(varIP)) {
            throw "Invalid IP";
        }

        try {
            (async() => {
                var objIP = ip6addr.parse(varIP);
                var theIP = objIP.toString();

                var varCachedResult = await util.getCachedResult(theIP);

                if (varCachedResult != null) {
                    //Response Back from the Cache
                    var outputResponse = JSON.stringify(varCachedResult);
                    console.log("MMGeoIP2Bot - Memcached : Response for "+ theIP +" retrieved from cache "+ (new Date()));
                    
                    //Set Response Header for Debugging
                    res.writeHead(200, { "Content-Type": "application/json", "X-Cache": "HIT" });
                    res.write(outputResponse);
                    res.end();

                    console.log("MMGeoIP2Bot Controller Ended at " + (new Date()));

                    return;
                }
                else {
                    try {
                        //GeoIPBot Module Object
                        var objMMGeoIP2Bot = new MMGeoIP2Bot(theIP);
                        console.log("MMGeoIP2Bot - Memcached : skipped " + theIP + " at " + (new Date()));

                        let varASN = await objMMGeoIP2Bot.getASN();
                        let varCity = await objMMGeoIP2Bot.getCity();
                        let varCountry = await objMMGeoIP2Bot.getCountry();

                        var outputResponse = {
                            "asn": varASN,
                            "city": varCity,
                            "country": varCountry
                        };

                        var blnResult = await util.setCachedResult(theIP, outputResponse);
                        if (!blnResult) {
                            console.log("MMGeoIP2Bot MemcachedClient Set Exception at " + (new Date()));
                        }

                        //Set Response ContentType
                        res.writeHead(200, { "Content-Type": "application/json", "X-Cache": "MISS" });

                        //Write Output
                        res.write(JSON.stringify(outputResponse));
                        res.end();

                        console.log("MMGeoIP2Bot Controller Ended at " + (new Date()));
                    }
                    catch(innerException) {
                        console.error("MMGeoIP2Bot Controller Exception: " + innerException + " at " + (new Date()));

                        //Set Response ContentType
                        res.writeHead(500, {"Content-Type": "application/json"});

                        //Write Output
                        res.write(JSON.stringify({
                            "Status": "ERROR",
                            "Message": innerException
                        }));
                        res.end();

                        console.log("ShotBot Controller Ended at " + (new Date()));
                        return;
                    }
                }
            })();
        }
        catch (ex) {
            console.error(ex);
            throw ex;
        }
    }
    catch (outerException) {
        console.error("MMGeoIP2Bot Controller Exception: " + outerException + " at " + (new Date()));

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
