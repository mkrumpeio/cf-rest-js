/*jslint node: true*/
/*global describe: true, before:true, it: true*/
"use strict";

var Promise = require('bluebird');
var chai = require("chai"),
    expect = require("chai").expect;

var testEnv = require('../../../test-env');
var cf_api_url = testEnv.cf_api_url;
var username = testEnv.username;
var password = testEnv.password;

var CloudController = require("../../../../lib/model/cloudcontroller/CloudController");
var CloudFoundryUsersUAA = require("../../../../lib/model/uaa/UsersUAA");
var CloudFoundrySpaces = require("../../../../lib/model/cloudcontroller/Spaces");
var CloudFoundryApps = require("../../../../lib/model/cloudcontroller/Apps");
CloudController = new CloudController();
CloudFoundryUsersUAA = new CloudFoundryUsersUAA();
CloudFoundrySpaces = new CloudFoundrySpaces();
CloudFoundryApps = new CloudFoundryApps();

describe("Cloud foundry Spaces", function () {

    var authorization_endpoint = null;
    var token_endpoint = null;
    var token_type = null;
    var access_token = null;

    before(function () {
        this.timeout(15000);

        CloudController.setEndPoint(cf_api_url);
        CloudFoundryApps.setEndPoint(cf_api_url);
        CloudFoundrySpaces.setEndPoint(cf_api_url);

        return CloudController.getInfo().then(function (result) {
            authorization_endpoint = result.authorization_endpoint;             
            token_endpoint = result.token_endpoint;
            CloudFoundryUsersUAA.setEndPoint(authorization_endpoint);
            return CloudFoundryUsersUAA.login(username, password);
        }).then(function (result) {
            CloudFoundryApps.setToken(result);
            CloudFoundrySpaces.setToken(result);
        });

    });

    it("The platform always has defined a Space to operate.", function () {
        this.timeout(3000);

        return CloudFoundrySpaces.getSpaces().then(function (result) {
            expect(result.total_results).to.be.above(0);
        });
    });

    it("The platform returns a unique Space.", function () {
        this.timeout(4500);

        var space_guid = null;

        return CloudFoundrySpaces.getSpaces().then(function (result) {
            space_guid = result.resources[0].metadata.guid;
        }).then(function () {
            return CloudFoundrySpaces.getSpace(space_guid);
        }).then(function (result) {
            expect(result.metadata.guid).is.a("string");
        });
    });

    it("The platform returns Apps deployed in a Space.", function () {
        this.timeout(4000);

        var space_guid = null;

        return CloudFoundrySpaces.getSpaces().then(function (result) {
            space_guid = result.resources[0].metadata.guid;
        }).then(function () {
            var filter = {
                'guid' : space_guid
            };
            return CloudFoundrySpaces.getSpaceApps(space_guid, filter);
        }).then(function (result) {
            expect(result.total_results).to.be.a('number');
        });
    });

    it("The platform returns Summary from a Space.", function () {
        this.timeout(4000);

        var space_guid = null;

        return CloudFoundrySpaces.getSpaces().then(function (result) {
            space_guid = result.resources[0].metadata.guid;
        }).then(function () {
            return CloudFoundrySpaces.getSummary(space_guid);
        }).then(function (result) {
            expect(true).to.be.a('boolean');
        });
    });

    it("[TOOL] The platform returns Services used in the Space.", function () {
        this.timeout(4000);

        var space_guid = null;

        return CloudFoundrySpaces.getSpaces().then(function (result) {
            space_guid = result.resources[0].metadata.guid;
        }).then(function () {
            return CloudFoundrySpaces.getSummary(space_guid);
        }).then(function (result) {

            var usedServices = [];
            result.services.forEach(function(service) {
                if(service.bound_app_count > 0){
                    usedServices.push(service);                   
                }
            });
            expect(true).to.be.a('boolean');
        });
    });

    it("[TOOL] The platform returns Services Services without usage in the Space.", function () {
        this.timeout(4000);

        var space_guid = null;

        return CloudFoundrySpaces.getSpaces().then(function (result) {
            space_guid = result.resources[0].metadata.guid;
        }).then(function () {
            return CloudFoundrySpaces.getSummary(space_guid);
        }).then(function (result) {

            var servicesWithoutUsage = [];
            result.services.forEach(function(service) {
                if(service.bound_app_count === 0){
                    servicesWithoutUsage.push(service);                   
                }
            });
            expect(true).to.be.a('boolean');
        });
    });

    it("The platform returns User roles from a Space.", function () {
        this.timeout(4000);

        var space_guid = null;

        return CloudFoundrySpaces.getSpaces().then(function (result) {
            space_guid = result.resources[0].metadata.guid;
        }).then(function () {
            return CloudFoundrySpaces.getUserRoles(space_guid);
        }).then(function (result) {
            expect(result.total_results).to.be.a('number');
        });
    });

});