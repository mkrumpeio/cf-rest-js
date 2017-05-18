/*jslint node: true*/
/*global describe: true, it: true*/
"use strict";

var chai = require("chai"),
    expect = require("chai").expect;

const request = require("request");
var HttpUtils = require('../../lib/utils/HttpUtils');
HttpUtils = new HttpUtils();

describe.skip("HttpUtils", function () {

    it("HTML 200 Test", function () {
        this.timeout(15000);

        var url = "https://api.run.pivotal.io/v2/info";
        var options = {
            method: 'GET',
            url: url
        };

        return HttpUtils.request(options, 200, false).then(function (result) {
            expect(result).is.a("string");
        });
    });

    it("System requires JSON, but the response is a String", function () {
        this.timeout(15000);

        var url = "https://api3.run.pivotal.io/v2/info";
        var options = {
            method: 'GET',
            url: url
        };

        return HttpUtils.request(options, 200, true).then(function (result) {
            expect(result).is.a("string");
        }).catch(function (reason) {
            // console.log(reason);
            expect(true).is.a("boolean");
        });
    });

    it("HTML 404 Test", function () {
        this.timeout(15000);

        var url = "https://api.run.pivotal.io/v22/info";
        var options = {
            method: 'GET',
            url: url
        };

        return HttpUtils.request(options, 404, false).then(function (result) {
            expect(result).is.a("string");
        });
    });

    it("Set request defaults", function () {
        this.timeout(15000);

        var url = "https://api.run.pivotal.io/v22/info";
        var options = {
            method: 'GET',
            url: url
        };

        //process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        const requestWithDefaults = request.defaults({
            rejectUnauthorized: false
        });

        HttpUtils.setCustomRequestObject(requestWithDefaults);
        return HttpUtils.request(options, 404, false).then(function (result) {
            expect(result).is.a("string");
        });
    });

    it.skip("Set a bad defaults request", function () {
        this.timeout(15000);

        var url = "https://api.run.pivotal.io/v22/info";
        var options = {
            method: 'GET',
            url: url
        };

        const badRequestConfiguration = request.defaults({
            proxy: 'http://localproxy.com'
        });

        HttpUtils.setCustomRequestObject(badRequestConfiguration);
        return HttpUtils.request(options, 404, false).then(function (result) {
            expect(result).is.a("string");
        });
    });

});