/*jslint node: true*/
/*global Promise:true, describe: true, before: true, it: true*/
"use strict";

// // var Promise = require('bluebird');
var chai = require("chai"),
    expect = require("chai").expect;
var randomWords = require('random-words');
var testEnv = require('../../../test-env');

var CloudController = require("../../../../lib/model/cloudcontroller/CloudController");
var CloudFoundryUsersUAA = require("../../../../lib/model/uaa/UsersUAA");
var CloudFoundryApps = require("../../../../lib/model/cloudcontroller/Apps");
var CloudFoundryRoutes = require("../../../../lib/model/cloudcontroller/Routes");
var CloudFoundryDomains = require("../../../../lib/model/cloudcontroller/Domains");
var CloudFoundrySpaces = require("../../../../lib/model/cloudcontroller/Spaces");
CloudController = new CloudController();
CloudFoundryUsersUAA = new CloudFoundryUsersUAA();
CloudFoundryApps = new CloudFoundryApps();
CloudFoundryRoutes = new CloudFoundryRoutes();
CloudFoundryDomains = new CloudFoundryDomains();
CloudFoundrySpaces = new CloudFoundrySpaces();

function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

describe("Cloud Foundry Routes", function () {

    var authorization_endpoint = null;
    var token_endpoint = null;
    var token_type = null;
    var access_token = null;
    var domain_guid = null;
    var space_guid = null;

    function randomInt(low, high) {
        return Math.floor(Math.random() * (high - low) + low);
    }

    before(function () {

        CloudController.setEndPoint(testEnv.cf_api_url);
        CloudFoundryApps.setEndPoint(testEnv.cf_api_url);
        CloudFoundryRoutes.setEndPoint(testEnv.cf_api_url);
        CloudFoundryDomains.setEndPoint(testEnv.cf_api_url);
        CloudFoundrySpaces.setEndPoint(testEnv.cf_api_url);
      
        return CloudController.getInfo().then(function (result) {
            authorization_endpoint = result.authorization_endpoint;            
            token_endpoint = result.token_endpoint;
            CloudFoundryUsersUAA.setEndPoint(authorization_endpoint);
            return CloudFoundryUsersUAA.login(testEnv.username, testEnv.password);
        }).then(function (result) {
            CloudFoundryApps.setToken(result);
            CloudFoundrySpaces.setToken(result);
            CloudFoundryDomains.setToken(result);
            CloudFoundryRoutes.setToken(result);           
            return CloudFoundryDomains.getDomains();
        }).then(function (result) {
            domain_guid = result.resources[0].metadata.guid;
            return CloudFoundrySpaces.getSpaces();
        }).then(function (result) {
            space_guid = result.resources[0].metadata.guid;
        });

    });

    it("The platform returns Routes", function () {
        return CloudFoundryRoutes.getRoutes().then(function (result) {
            expect(result.total_results).is.a("number");
        });
    });


    it("The platform returns an unique Route", function () {
        var filter = {
             'page': 1,
             'results-per-page': 50
        }        
        var route_guid = null;
        var ERROR_MESSAGE_NO_ROUTE = "No Route";
        return CloudFoundryRoutes.getRoutes(filter).then(function (result) {
            return new Promise(function (resolve, reject) {
                if (result.resources.length === 0) {
                    return reject(ERROR_MESSAGE_NO_ROUTE);
                }
                route_guid = result.resources[0].metadata.guid;
                return resolve();
            });
        }).then(function () {
            return CloudFoundryRoutes.getRoute(route_guid);
        }).then(function (result) {
            expect(result.metadata.guid).is.a("string");
        }).catch(function (reason) {
            expect(reason).to.equal(ERROR_MESSAGE_NO_ROUTE);
        });

    });

    it("Create & Remove a Route", function () {
        var route_guid = null;
        var initial_route_count = 0;
        var filter = {
             'page': 1,
             'results-per-page': 50
        }  
        var routeName = "RouteToRemove" +  + randomInt(1, 100000);
        var routeOptions = {
            'domain_guid' : domain_guid,
            'space_guid' : space_guid,
            'host' : routeName
        };        

        return CloudFoundryRoutes.getRoutes(filter).then(function (result) {
            initial_route_count = result.total_results;
            return CloudFoundryRoutes.add(routeOptions);
        }).then(function (result) {
            route_guid = result.metadata.guid;
            return CloudFoundryRoutes.getRoutes(filter);
        }).then(function (result) {
            expect(result.total_results).to.equal(initial_route_count + 1);
            return CloudFoundryRoutes.remove(route_guid);
        }).then(function () {
            return CloudFoundryRoutes.getRoutes(filter);
        }).then(function (result) {
            expect(result.total_results).to.equal(initial_route_count);
        });
    });

    it("Search a impossible route", function () {
        var routeName = "noroute";
        var filter = {
            'q': 'host:' + routeName + ';domain_guid:' + domain_guid
        };
        return CloudFoundryRoutes.getRoutes(filter).then(function (result) {
            expect(result.total_results).to.equal(0);
        });
    });

    it("Search and get several routes", function () {
        var routeName = "noroute";
        var filter = {
            'q': 'domain_guid:' + domain_guid,
            'results-per-page': 100
        };
        return CloudFoundryRoutes.getRoutes(filter).then(function (result) {
            expect(result.total_results).to.be.below(1001)
        });
    });    

    //Inner function used to check when an application run in the system.
    function recursiveGetRoutes() {

        var iterationLimit = 50;
        var counter = 1;       
        var filter = {
             'page': counter,
             'results-per-page': 50
        }
        var arrayRouteList = [];
        return new Promise(function check(resolve, reject) {
            CloudFoundryRoutes.getRoutes(filter).then(function (result) {
                var i = 0;
                for (i = 0; i < result.resources.length; i++) {
                    arrayRouteList.push(result.resources[i].metadata.guid);
                }
                if (result.total_pages === counter) {
                    resolve(arrayRouteList);
                } else if (counter === iterationLimit) {
                    reject(new Error("Timeout recursiveGetRoutes"));
                } else {
                    counter += 1;
                    setTimeout(check, 1000, resolve, reject);
                }
            }, reject); //Catch any check exceptions;
        });
    }

    it("Paginate routes", function () {
        return recursiveGetRoutes().then(function (result) {
            expect(true).to.equal(true);
        }).catch(function (reason) {
            expect(reason).to.equal("Timeout");
        });
    });

    it("Get total of routes", function () {
        var page = 1;
        return CloudFoundryRoutes.getRoutes(page).then(function (result) {
            expect(result.total_results).to.be.below(1001);
        });
    });   
});
