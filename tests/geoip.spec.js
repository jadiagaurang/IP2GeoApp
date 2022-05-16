#! /usr/bin/env node

"use strict";

const supertest = require("supertest");
const assert = require('assert');
const app = require("../app");

describe("GET /api/geoip", function() {
	it("GET IP2Geo StatusCode 200", function(done) {
		supertest(app)
		.get("/api/geoip?ipaddress=1.1.1.1")
		.expect(200)
		.end(function(err, res){
			if (err) done(err);
			done();
		});
	});
});

describe("POST /api/geoip", function() {
	it("POST IP2Geo StatusCode 200", function(done) {
		supertest(app)
		.post("/api/geoip")
		.set("Content-Type", "application/json")
		.send({
			"ipaddress":"8.8.4.4"
		})
		.expect(200)
		.end(function(err, res){
			if (err) done(err);
			done();
		});
	});
});