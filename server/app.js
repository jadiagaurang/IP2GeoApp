const fs = require("fs");
const http = require("http");
const path = require("path");
const ip6addr = require("ip6addr");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const dotenv = require("dotenv");

const MMGeoIP2Bot = require("../src/geoip.js");
const util = require("../src/utility.js");

//Load Environment Variables from the Config File
const args = process.argv;
const fileName = path.dirname(fs.realpathSync(__filename));

if (args.length > 2) {
    objEnv = args[2];
    var isCache = args[3]; // Flag for memcache activate/deactivate

	if (objEnv === "prod") {
		dotenv.config({ path: path.join(fileName, "./config/prod.env") });
	}
	else {
		dotenv.config({ path: path.join(fileName, "./config/dev.env") });
	}
}
else {
  dotenv.config({ path: path.join(fileName, "./config/dev.env") });
}

//Incoming Request Parser
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//Index Request Controller
app.get("/", function (req, res) {
	console.log("Index Controller at " + (new Date()));

	var varResponse = "<html><head></head><body><h1>It works!</h1></body></html>";
	res.writeHead(200, {"Content-Type": "text/html"});
	res.write(varResponse);
	res.end();
});

//GeoIPBot Controller for GET + POST
app.get("/v1/geoip", function (req, res) {
	doMMGeoIP2Bot(req, res);
});
app.post("/v1/geoip", function (req, res) {
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

        //Get IP from the Request
        var varIP = req.ipaddress;
        if (util.isBlank(varIP)) {
            varIP = req.body.ipaddress;
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

//***** Start the Engines Here *****//
//Listen Incoming Request on Port 80 or Config Port
var port = process.env.SERVER_PORT;
if (util.isBlank(port)) {
	port = 80;
}
//Start the App on Unsecure Port
http.createServer(app).listen(port, () => {
	console.log("Starting MMGeoIP2Bot on Port #" + port + " at " + (new Date()));
});