/*jslint node: true*/
/*global describe: true, before: true, it: true*/

var chai = require("chai"),
    expect = require("chai").expect;

var testEnv = require('../../../test-env');
var cf_api_url = testEnv.cf_api_url;
// var username = testEnv.username;
// var password = testEnv.password;

var CloudController = require("../../../../lib/model/cloudcontroller/CloudController");
var CloudFoundryUsersUAA = require("../../../../lib/model/uaa/UsersUAA");
var CloudFoundryEvents = require("../../../../lib/model/cloudcontroller/Events");
CloudController = new CloudController();
CloudFoundryUsersUAA = new CloudFoundryUsersUAA();
CloudFoundryEvents = new CloudFoundryEvents();

describe("Cloud foundry Events", function () {
    "use strict";
    var authorization_endpoint = null;
    var token_endpoint = null;
    var token_type = null;
    var access_token = null;

    before(function () {
        // this.timeout(15000);

        CloudController.setEndPoint(testEnv.cf_api_url);
        CloudFoundryEvents.setEndPoint(testEnv.cf_api_url);

        return CloudController.getInfo().then(function (result) {
            authorization_endpoint = result.authorization_endpoint;
            token_endpoint = result.token_endpoint;
            CloudFoundryUsersUAA.setEndPoint(authorization_endpoint);
            return CloudFoundryUsersUAA.login(testEnv.username, testEnv.password);
        }).then(function (result) {
            CloudFoundryEvents.setToken(result);
        });
    });

    //TODO: This component has some performance problems in Pivotal systems.
    it.skip("The platform returns the Events", function () {
        // this.timeout(150000);

        return CloudFoundryEvents.getEvents().then(function (result) {
            expect(result.total_results).is.a("number");
        });
    });

    it("The platform returns the Events With Optional Query String Parameters", function () {
        // this.timeout(150000);

        var resultsPerPage = 20;
        var filter = {
            q: ['timestamp>=' + "2015-12-10T00:00:00Z"],
            'results-per-page': resultsPerPage
        };         

        return CloudFoundryEvents.getEvents(filter).then(function (result) {
            expect(result.total_results).is.a("number");
            //Sometimes, system returns less than 20.
            //expect(result.resources.length).to.equal(20);
            expect(result.resources.length).to.be.below(resultsPerPage + 1);
        });
    });

    it("Events in 2016", function () {
        // this.timeout(150000);
        
        var resultsPerPage = 20;
        var filter = {
            q: ['timestamp>=' + "2016-01-01T00:00:00Z"],
            'results-per-page': resultsPerPage
        };         

        return CloudFoundryEvents.getEvents(filter).then(function (result) {
            expect(result.total_results).is.a("number");
            //Sometimes, system returns less than 20.
            //expect(result.resources.length).to.equal(20);
            expect(result.resources.length).to.be.below(resultsPerPage + 1);
        });
    });

    it("Apps crashed in 2016", function () {
        // this.timeout(150000);
        
        var resultsPerPage = 20;      
        var filter = {
            q: ['timestamp>=' + "2016-01-01T00:00:00Z", 'type:' + "app.crash"],
            'results-per-page': resultsPerPage
        };
        return CloudFoundryEvents.getEvents(filter).then(function (result) {
            expect(result.total_results).is.a("number");
            //Sometimes, system returns less than 20.
            //expect(result.resources.length).to.equal(20);
            expect(result.resources.length).to.be.below(resultsPerPage + 1);
        });
    });

    it.skip("[TOOL] Events from an App in 2016", function () {
        // this.timeout(150000);
        
        var resultsPerPage = 20;
        var filter = {
            q: ['timestamp>=' + "2016-01-01T00:00:00Z", 'actee:' + "b3daddcd-eb94-43fe-9975-e424364c6afb"],
            'results-per-page': resultsPerPage
        };

        return CloudFoundryEvents.getEvents(filter).then(function (result) {
            //console.log(result.resources);
            expect(result.total_results).is.a("number");
            //Sometimes, system returns less than 20.
            //expect(result.resources.length).to.equal(20);
            expect(result.resources.length).to.be.below(resultsPerPage + 1);
        });
    });
});
