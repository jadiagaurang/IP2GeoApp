#! /usr/bin/env node

"use strict";

// External Packages
const fs = require("fs");
const path = require("path");
const Reader = require("@maxmind/geoip2-node").Reader;
// Internal Modules
const winston = require("./logger").winston;

module.exports = class MMGeoIP2Bot {
	//Default Constructor
	constructor(varIP) {
		this.varMMDBPath = path.dirname(fs.realpathSync(__filename));
		this.IPAddress = varIP;
	}

  	getASN = async() => {
		return new Promise((resolve, reject) => {
			let dbASN = path.join(this.varMMDBPath, "../db/GeoLite2-ASN.mmdb");
			Reader.open(dbASN).then(reader => {
				try {
					const response = reader.asn(this.IPAddress);
					resolve(response);
				}
				catch (ex) {
					console.error(ex);
					reject(ex);
				}
			}).catch(function(ex) {
				winston.error(ex);
				reject(ex);
			});
		});
	}

	getCity = async() => {
		return new Promise((resolve, reject) => {
			let dbCity = path.join(this.varMMDBPath, "../db/GeoLite2-City.mmdb");
			Reader.open(dbCity).then(reader => {
				try {
					const response = reader.city(this.IPAddress);
					resolve(response);
				}
				catch (ex) {
					console.error(ex);
					reject(ex);
				}
			}).catch(function(ex) {
				winston.error(ex);
				reject(ex);
			});
		});
	}

	getCountry = async() => {
		return new Promise((resolve, reject) => {			
			let dbCountry = path.join(this.varMMDBPath, "../db/GeoLite2-Country.mmdb");
			Reader.open(dbCountry).then(reader => {
				try {
					const response = reader.country(this.IPAddress);
					resolve(response);
				}
				catch (ex) {
					console.error(ex);
					reject(ex);
				}
			}).catch(function(ex) {
				winston.error(ex);
				reject(ex);
			});
		});
	}
}