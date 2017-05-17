/*jslint node: true*/

// var Promise = require('bluebird');
var chai = require("chai"),
    expect = require("chai").expect;

var testEnv = require('../../../test-env');
var cf_api_url = testEnv.cf_api_url;
// var username = testEnv.username;
// var password = testEnv.password;

var CloudController = require("../../../../lib/model/cloudcontroller/CloudController");
var CloudFoundryUsersUAA = require("../../../../lib/model/uaa/UsersUAA");
var CloudFoundryStacks = require("../../../../lib/model/cloudcontroller/Stacks");
CloudController = new CloudController();
CloudFoundryUsersUAA = new CloudFoundryUsersUAA();
CloudFoundryStacks = new CloudFoundryStacks();

describe("Cloud foundry Stacks", function () {
    "use strict";

    var authorization_endpoint = null;
    var token_endpoint = null;
    var token_type = null;
    var access_token = null;

    before(function () {
        // this.timeout(15000);

        CloudController.setEndPoint(testEnv.cf_api_url);
        CloudFoundryStacks.setEndPoint(testEnv.cf_api_url);

        return CloudController.getInfo().then(function (result) {
            authorization_endpoint = result.authorization_endpoint;            
            token_endpoint = result.token_endpoint;
            CloudFoundryUsersUAA.setEndPoint(authorization_endpoint);
            return CloudFoundryUsersUAA.login(testEnv.username, testEnv.password);
        }).then(function (result) {
            CloudFoundryStacks.setToken(result);
        });

    });

    it("The platform returns Stacks installed", function () {
        // this.timeout(3000);

        return CloudFoundryStacks.getStacks().then(function (result) {
            expect(result.total_results).is.a("number");
        });
    });

});
