/*jslint node: true*/
/*global Promise:true, describe: true, before: true, it: true*/
"use strict";

var Promise = require('bluebird');
var chai = require("chai"),
    expect = require("chai").expect;
var randomWords = require('random-words');


var testEnv = require('../../../test-env');
var cf_api_url = testEnv.cf_api_url;
var username = testEnv.username;
var password = testEnv.password;

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
        this.timeout(25000);

        CloudController.setEndPoint(cf_api_url);
        CloudFoundryApps.setEndPoint(cf_api_url);
        CloudFoundryRoutes.setEndPoint(cf_api_url);
        CloudFoundryDomains.setEndPoint(cf_api_url);
        CloudFoundrySpaces.setEndPoint(cf_api_url);
      
        return CloudController.getInfo().then(function (result) {
            authorization_endpoint = result.authorization_endpoint;            
            token_endpoint = result.token_endpoint;
            CloudFoundryUsersUAA.setEndPoint(authorization_endpoint);
            return CloudFoundryUsersUAA.login(username, password);
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
        this.timeout(3500);

        return CloudFoundryRoutes.getRoutes().then(function (result) {
            expect(result.total_results).is.a("number");
        });

    });


    it("The platform returns an unique Route", function () {
        this.timeout(5000);

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
                //console.log(result.resources[0])
                route_guid = result.resources[0].metadata.guid;
                return resolve();
            });
        }).then(function () {
            return CloudFoundryRoutes.getRoute(route_guid);
        }).then(function (result) {
            expect(result.metadata.guid).is.a("string");
        }).catch(function (reason) {
            console.log(reason);
            expect(reason).to.equal(ERROR_MESSAGE_NO_ROUTE);
        });

    });


    it.skip("Add a Route", function () {
        this.timeout(3500);

        var routeName = randomWords() + randomInt(1, 10);
        var routeOptions = {
            'domain_guid' : domain_guid,
            'space_guid' : space_guid,
            'host' : routeName
        };

        return CloudFoundryRoutes.add(routeOptions).then(function (result) {
            expect(result.metadata.guid).is.a("string");
        });

    });


    it("Create & Remove a Route", function () {
        this.timeout(25000);

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
        this.timeout(5000);

        var routeName = "noroute";
        var filter = {
            'q': 'host:' + routeName + ';domain_guid:' + domain_guid
        };

        return CloudFoundryRoutes.getRoutes(filter).then(function (result) {
            expect(result.total_results).to.equal(0);
        });

    });

    it("Search and get several routes", function () {
        this.timeout(5000);

        var routeName = "noroute";
        var filter = {
            'q': 'domain_guid:' + domain_guid,
            'results-per-page': 100
        };

        return CloudFoundryRoutes.getRoutes(filter).then(function (result) {

/*
            for(var i = 0; i < result.resources.length; i++) {
                console.log(i, result.resources[i].entity.host);
            }
*/
            expect(result.total_results).to.be.below(1001)
        });

    });    

    //Inner function used to check when an application run in the system.
    function recursiveGetRoutes() {

        console.log("Get a array of routes from CF instances");

        var iterationLimit = 50;
        var counter = 1;       
        var filter = {
             'page': counter,
             'results-per-page': 50
        }
        var arrayRouteList = [];

        return new Promise(function check(resolve, reject) {

            CloudFoundryRoutes.getRoutes(filter).then(function (result) {
                console.log(counter);

                //Fill Array
                var i = 0;
                for (i = 0; i < result.resources.length; i++) {
                    arrayRouteList.push(result.resources[i].metadata.guid);
                }

                //Criteria to exit
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
        this.timeout(50000);

        return recursiveGetRoutes().then(function (result) {
            expect(true).to.equal(true);
        }).catch(function (reason) {
            expect(reason).to.equal("Timeout");
        });

    });

    it.skip("[TOOL] Paginate and remove bad routes", function () {
        this.timeout(200000);

        function recursiveGetAppRoutes(appRouteGuidList) {

            console.log("Get routes from current Apps");

            var iterationLimit = 10;
            var counter = 0;
            var app_guid = null;
            var appRouteGuidMap = {};

            return new Promise(function check(resolve, reject) {

                app_guid = appRouteGuidList[counter];
                CloudFoundryApps.getAppRoutes(app_guid).then(function (result) {

                    if (result.resources.length > 0) {
                        if (result.resources.length > 1) {
                            reject(new Error("RARE CASE"));
                        }
                        appRouteGuidMap[result.resources[0].metadata.guid] = result.resources[0].metadata.guid;
                    }

                    //Criteria to exit
                    if (counter === (appRouteGuidList.length - 1)) {
                        resolve(appRouteGuidMap);
                    } else if (counter === iterationLimit) {
                        reject(new Error("Timeout"));
                    } else {
                        counter += 1;
                        setTimeout(check, 1000, resolve, reject);
                    }
                }, reject); //Catch any check exceptions;

            });

        }

        function inferenceBlock(appRouteGuidMap, route_guid) {
            return new Promise(function check(resolve, reject) {
                if (appRouteGuidMap[route_guid] !== undefined) {
                    return resolve(true);
                }
                return resolve(false);
            });
        }

        function recursiveRemoveRoutes(appRouteGuidMap, routeArray) {

            console.log("Remove routes using a route array");

            var iterationLimit = 1500;
            var counter = 0;
            var route_guid = null;
            var isApp = false;

            return new Promise(function check(resolve, reject) {

                route_guid = routeArray[counter];
                inferenceBlock(appRouteGuidMap, route_guid).then(function (result) {
                    isApp = result;
                    if (isApp === false) {
                        return CloudFoundryRoutes.remove(route_guid);
                    }

                    return new Promise(function check(resolve, reject) {
                        return resolve();
                    });
                }).then(function () {
                    console.log(counter, route_guid, isApp);

                    //Criteria to exit
                    if (counter === routeArray.length) {
                        resolve("OK");
                    } else if (counter === iterationLimit) {
                        reject(new Error("Timeout"));
                    } else {
                        counter += 1;
                        setTimeout(check, 1000, resolve, reject);
                    }
                }, reject); //Catch any check exceptions;

            });

        }

        var appRouteGuidList = [];
        var appRouteGuidMap = {};

        return CloudFoundryApps.getApps().then(function (result) {

            if (result.total_results === 0) {
                return new Promise(function check(resolve, reject) {
                    reject(new Error("No App"));
                });
            }

            var i = 0;
            for (i = 0; i < result.resources.length; i++) {
                appRouteGuidList.push(result.resources[i].metadata.guid);
            }

            return recursiveGetAppRoutes(appRouteGuidList);
        }).then(function (result) {
            appRouteGuidMap = result;
            //console.log(appRouteGuidMap);
            return recursiveGetRoutes();
        }).then(function (result) {
            console.log(result.length);

            console.log("Routes to not remove");
            var i = 0;
            for (i = 0; i < result.length; i++) {

                if (appRouteGuidMap[result[i]] !== undefined) {
                    console.log(i + " " + result[i]);
                }

            }

            return recursiveRemoveRoutes(appRouteGuidMap, result);
        }).then(function () {
            expect(true).to.equal(true);
        }).catch(function (reason) {
            expect(reason).to.equal("Timeout");
        });


    });

    it("Get total of routes", function () {
        this.timeout(5000);

        var page = 1;

        return CloudFoundryRoutes.getRoutes(page).then(function (result) {
            console.log(result.total_results);
            expect(result.total_results).to.be.below(1001);
        });

    });   

});
