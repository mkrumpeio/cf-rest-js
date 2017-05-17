/*jslint node: true*/
/*global describe: true, before: true, it: true*/
"use strict";

// var Promise = require('bluebird');
var chai = require("chai"),
    chaiAsPromised = require("chai-as-promised"),
    expect = require("chai").expect;
chai.use(chaiAsPromised);

var testEnv = require('../../../test-env');
var cf_api_url = testEnv.cf_api_url;
// var username = testEnv.username;
// var password = testEnv.password;

var CloudController = require("../../../../lib/model/cloudcontroller/CloudController");
var CloudFoundryUsersUAA = require("../../../../lib/model/uaa/UsersUAA");
CloudController = new CloudController();
CloudFoundryUsersUAA = new CloudFoundryUsersUAA();

const request = require("request");

describe("Cloud Controller:", function () {

    var authorization_endpoint = null;
    var token_endpoint = null;

    before(function () {
        // this.timeout(15000);

        CloudController.setEndPoint(testEnv.cf_api_url);

        return CloudController.getInfo().then(function (result) {
            authorization_endpoint = result.authorization_endpoint;
            token_endpoint = result.token_endpoint;
            CloudFoundryUsersUAA.setEndPoint(authorization_endpoint);
            return CloudFoundryUsersUAA.login(testEnv.username, testEnv.password);
        }).then(function (result) {
            CloudFoundryUsersUAA.setToken(result);
            CloudController.setToken(result);
        });
    });

    it("The connection show API Version", function () {
        return CloudController.getInfo().then(function (result) {
            console.log(result.api_version);
            return expect(result.api_version).to.be.a('string');
        });
    });

    it.skip("The connection with the PaaS is OK", function () {
        return expect(CloudController.getInfo()).eventually.property("version", 2);
    });

    it("Get all featured flags", function () {
        return CloudController.getFeaturedFlags().then(function (result) {
            return expect(true).to.be.a('boolean');
        });
    });

    // if(environment === "PIVOTAL") {
    //     it("Get info about the featured flag: 'diego_docker'", function () {
    //         var dockerFlag = "diego_docker";
    //         return CloudController.getFeaturedFlag(dockerFlag).then(function (result) {
    //             console.log(result);
    //             return expect(true).to.be.a('boolean');
    //         });
    //     });
    //     it("[DEBUGGING] Enable Docker on Diego", function () {
    //         var dockerFlag = "diego_docker";
    //         return CloudController.setFeaturedFlag(dockerFlag).then(function (result) {
    //             return expect(true).to.be.a('boolean');
    //         }).catch(function (reason) {
    //             console.log(reason);
    //             return expect(true).to.be.a('boolean');
    //         });
    //     });
    // }

    it("Set Custom request object", function () {

        //process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        const requestWithDefaults = request.defaults({
            rejectUnauthorized: false
        });

        CloudController.setCustomRequestObject(requestWithDefaults);
        return CloudController.getFeaturedFlags().then(function (result) {
            return expect(true).to.be.a('boolean');
        });
    });

    it.skip("Set Bad Custom request object", function () {

        const badRequestConfiguration = request.defaults({
            proxy: 'http://localproxy.com'
        });

        CloudController.setCustomRequestObject(badRequestConfiguration);
        return CloudController.getFeaturedFlags().then(function (result) {
            return expect(true).to.be.a('boolean');
        });
    });

});