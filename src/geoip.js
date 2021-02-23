'use strict';
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const Reader = require("@maxmind/geoip2-node").Reader;

module.exports = class MMGeoIP2Bot {
	//Default Constructor
	constructor(varIP) {
		//Default Values
		this.requestId = uuidv4();

		this.IPAddress = varIP;
	}

  	async getASN() {
		return new Promise((resolve, reject) => {
			console.log("MMGeoIP2Bot - getASN : " + this.IPAddress + " at " + (new Date()));

			let dbASN = path.join(path.dirname(fs.realpathSync(__filename)), "../db/GeoLite2-ASN.mmdb");
			Reader.open(dbASN).then(reader => {
				try {
					const response = reader.asn(this.IPAddress);
					resolve(response);
				}
				catch (ex) {
					console.error(ex);
					reject(ex);
				}
			}).catch(function(rej) {
				//here when you reject the promise
				console.log(rej);
				reject(ex);
			});
		});
	}

	async getCity() {
		return new Promise((resolve, reject) => {
			console.log("MMGeoIP2Bot - getCity : " + this.IPAddress + " at " + (new Date()));

			let dbCity = path.join(path.dirname(fs.realpathSync(__filename)), "../db/GeoLite2-City.mmdb");
			Reader.open(dbCity).then(reader => {
				try {
					const response = reader.city(this.IPAddress);
					resolve(response);
				}
				catch (ex) {
					console.error(ex);
					reject(ex);
				}
			}).catch(function(rej) {
				//here when you reject the promise
				console.log(rej);
				reject(ex);
			});
		});
	}

	async getCountry() {
		return new Promise((resolve, reject) => {
			console.log("MMGeoIP2Bot - getCountry : " + this.IPAddress + " at " + (new Date()));
			
			let dbCountry = path.join(path.dirname(fs.realpathSync(__filename)), "../db/GeoLite2-Country.mmdb");
			Reader.open(dbCountry).then(reader => {
				try {
					const response = reader.country(this.IPAddress);
					console.log(response);
					resolve(response);
				}
				catch (ex) {
					console.error(ex);
					reject(ex);
				}
			}).catch(function(rej) {
				//here when you reject the promise
				console.log(rej);
				reject(ex);
			});
		});
	}
	  
	delay(timeout) {
		return new Promise((resolve) => {
			setTimeout(resolve, timeout);
		});
	}
}
