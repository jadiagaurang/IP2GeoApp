#! /usr/bin/env node

"use strict";

// External Packages
const fs = require("fs");
const path = require("path");
const Reader = require("@maxmind/geoip2-node").Reader;
const _ = require("underscore");

// Internal Modules
const winston = require("./logger").winston;

module.exports = class MMGeoIP2Bot {
	defaultOptions = {
	}

	//Default Constructor
	constructor(varIP, options) {
		var me = this;
		
		me.options = _.extend({}, me.defaultOptions, options);
		me.logger = winston(process.env.LOG_LEVEL);
		
		me.varMMDBPath = path.dirname(fs.realpathSync(__filename));
		me.IPAddress = varIP;
	}

  	getASN = async() => {
		var me = this;

		return new Promise((resolve, reject) => {
			let dbASN = path.join(this.varMMDBPath, "../db/GeoLite2-ASN.mmdb");
			Reader.open(dbASN).then(reader => {
				try {
					const response = reader.asn(this.IPAddress);
					resolve(response);
				}
				catch (ex) {
					me.logger.error(ex);
					resolve({});
				}
			}).catch(function(ex) {
				me.logger.error(ex);
				resolve({});
			});
		});
	}

	getCity = async() => {
		var me = this;

		return new Promise((resolve, reject) => {
			let dbCity = path.join(this.varMMDBPath, "../db/GeoLite2-City.mmdb");
			Reader.open(dbCity).then(reader => {
				try {
					const response = reader.city(this.IPAddress);
					resolve(response);
				}
				catch (ex) {
					me.logger.error(ex);
					resolve({});
				}
			}).catch(function(ex) {
				me.logger.error(ex);
				resolve({});
			});
		});
	}

	getCountry = async() => {
		var me = this;

		return new Promise((resolve, reject) => {			
			let dbCountry = path.join(this.varMMDBPath, "../db/GeoLite2-Country.mmdb");
			Reader.open(dbCountry).then(reader => {
				try {
					const response = reader.country(this.IPAddress);
					resolve(response);
				}
				catch (ex) {
					me.logger.error(ex);
					resolve({});
				}
			}).catch(function(ex) {
				console.log(me.logger);
				me.logger.error(ex);
				resolve({});
			});
		});
	}
}