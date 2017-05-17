/*jslint node: true*/
/*global describe: true, before: true, it: true*/
/*globals Promise:true*/
"use strict";

// var Promise = require('bluebird');
var chai = require("chai"),
    expect = require("chai").expect;

var testEnv = require('../../../test-env');
var cf_api_url = testEnv.cf_api_url;
// var username = testEnv.username;
// var password = testEnv.password;

var CloudController = require("../../../../lib/model/cloudcontroller/CloudController");
var CloudFoundryUsersUAA = require("../../../../lib/model/uaa/UsersUAA");
var CloudFoundryDomains = require("../../../../lib/model/cloudcontroller/Domains");
CloudController = new CloudController();
CloudFoundryUsersUAA = new CloudFoundryUsersUAA();
CloudFoundryDomains = new CloudFoundryDomains();

describe("Cloud foundry Domains", function () {

    var authorization_endpoint = null;
    var token_endpoint = null;
    var token_type = null;
    var access_token = null;

    before(function () {
        // this.timeout(15000);

        CloudController.setEndPoint(testEnv.cf_api_url);
        CloudFoundryDomains.setEndPoint(testEnv.cf_api_url);

        return CloudController.getInfo().then(function (result) {
            authorization_endpoint = result.authorization_endpoint;
            token_endpoint = result.token_endpoint;
            CloudFoundryUsersUAA.setEndPoint(authorization_endpoint);
            return CloudFoundryUsersUAA.login(testEnv.username, testEnv.password);
        }).then(function (result) {
            CloudFoundryDomains.setToken(result);
        });
    });

    it("The platform returns Domains defined", function () {
        // this.timeout(3000);

        var domain = null;
        return CloudFoundryDomains.getDomains().then(function (result) {
            domain = result.resources[0].entity.name;
            expect(domain).is.a("string");
            expect(result.resources.length).to.be.above(0);
            expect(result.total_results).is.a("number");
        });
    });

    it("The platform returns Shared domains defined", function () {
        // this.timeout(5000);

        var domain = null;
        return CloudFoundryDomains.getSharedDomains().then(function (result) {
            domain = result.resources[0].entity.name;
            expect(domain).is.a("string");
            expect(result.resources.length).to.be.above(0);
            expect(result.total_results).is.a("number");
        });
    });

});