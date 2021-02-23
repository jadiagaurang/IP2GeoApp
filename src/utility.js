'use strict';
const Memcached = require("memcached");

//START: Utility Functions
module.exports = class Utility {
	static isInvalidRequests(req) {
		if(req.url === "/favicon.ico" || Utility.isBlank(req.url)) {
			return true;
		}
	
		return false;
	}

	static isBlank (obj) {
		return (!obj || obj === "");
	}

	static async getCachedResult (theIP) {
		return new Promise((resolve, reject) => {
			var memcacheHost = process.env.SERVER_MEMCACHE_HOST;
			var memcachePort = process.env.SERVER_MEMCACHE_PORT;

			if (!Utility.isBlank(memcacheHost) && !Utility.isBlank(memcachePort)) {
				//Make CacheKey
				var varCacheKey = "Host=" + process.env.SERVER_HOST + "&Method=doMMGeoIP2Bot&IP=" + theIP;

				//Set up Memcache Client
				var dcOptions = {
					timeout: 5000   //the time after which Memcached sends a connection timeout (in milliseconds).
				};
				var memcachedClient = new Memcached(memcacheHost + ":" + memcachePort, dcOptions);

				memcachedClient.gets(varCacheKey, function (err, data) {
					// If data received from memcached and isCache flag active.
					if (!Utility.isBlank(data) && !Utility.isBlank(data[varCacheKey])) {
						resolve(data[varCacheKey]);
					}
					else {
						resolve(null);
					}
				});
			}
			else {
				resolve(null);
			}
		});
	}

	static async setCachedResult (theIP, data) {
		return new Promise((resolve, reject) => {
			var memcacheHost = process.env.SERVER_MEMCACHE_HOST;
			var memcachePort = process.env.SERVER_MEMCACHE_PORT;

			if (!Utility.isBlank(memcacheHost) && !Utility.isBlank(memcachePort)) {
				//Make CacheKey
				var varCacheKey = "Host=" + process.env.SERVER_HOST + "&Method=doMMGeoIP2Bot&IP=" + theIP;

				//Set up Memcache Client
				var dcOptions = {
					timeout: 5000   //the time after which Memcached sends a connection timeout (in milliseconds).
				};
				var memcachedClient = new Memcached(memcacheHost + ":" + memcachePort, dcOptions);

				memcachedClient.set(varCacheKey, data, (60 * 1000), function (err) {
					if (!Utility.isBlank(err)) {
						resolve(false);
					}
					else {
						resolve(true);
					}
				});
			}
			else {
				resolve(false);
			}
		});
	}

	delay(timeout) {
		return new Promise((resolve) => {
			setTimeout(resolve, timeout);
		});
	}
}
//END: Utility Functions