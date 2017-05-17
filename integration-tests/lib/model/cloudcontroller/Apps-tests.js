
"use strict";

var chai = require("chai"),
    chaiAsPromised = require("chai-as-promised"),
    expect = require("chai").expect;
chai.use(chaiAsPromised);
var testEnv = require('../../../test-env');

var CloudController = require("../../../../lib/model/cloudcontroller/CloudController");
var CloudFoundryUsersUAA = require("../../../../lib/model/uaa/UsersUAA");
var CloudFoundryApps = require("../../../../lib/model/cloudcontroller/Apps");
var CloudFoundrySpaces = require("../../../../lib/model/cloudcontroller/Spaces");
CloudController = new CloudController();
CloudFoundryUsersUAA = new CloudFoundryUsersUAA();
CloudFoundryApps = new CloudFoundryApps();
CloudFoundrySpaces = new CloudFoundrySpaces();

describe("Apps:", function () {

    var authorization_endpoint = null;
    var token_endpoint = null;
    var token_type = null;
    var access_token = null;
    var space_guid = null;

    before(function () {
        CloudController.setEndPoint(testEnv.cf_api_url);
        CloudFoundryApps.setEndPoint(testEnv.cf_api_url);
        CloudFoundrySpaces.setEndPoint(testEnv.cf_api_url);
        return CloudController.getInfo().then(function (result) {
            // console.log('info result:',result);
            authorization_endpoint = result.authorization_endpoint;
            token_endpoint = result.token_endpoint;
            CloudFoundryUsersUAA.setEndPoint(authorization_endpoint);
            return CloudFoundryUsersUAA.login(testEnv.username, testEnv.password);
        }).then(function (result) {
            CloudFoundryApps.setToken(result);
            CloudFoundrySpaces.setToken(result);
            return CloudFoundrySpaces.getSpaces();
        }).then(function (result) {
            space_guid = result.resources[0].metadata.guid;
        });
    });

    it("The platform returns Apps:", function () {
        return CloudFoundryApps.getApps().then(function (result) {
            expect(result.total_results).to.be.a('number');
        });
    });

    it("The platform returns Apps with Filter", function () {
        var filter = {
            'q': 'name:' + "demo1",
            'page': 1
        };
        return CloudFoundryApps.getApps(filter).then(function (result) {
            expect(result.total_results).to.be.a('number');
        });
    });

    it("The platform can't find an unknown app", function () {
        var app_guid = null;
        var appToFind = "unknownApp";

        return CloudFoundryApps.getApps().then(function (result) {
            expect(result.total_results).to.be.a('number');
            return new Promise(function (resolve, reject) {
                expect(result.total_results).to.be.a('number');
                for (var i = 0; i < result.resources.length; i++) {
                    if (result.resources[i].entity.name === appToFind) {
                        app_guid = result.resources[i].metadata.guid;
                        return resolve(app_guid);
                    }
                }
                return reject("Not found App.");
            });
        }).then(function () {
            expect(true).to.equal(true);
        }).catch(function (reason) {
            expect(reason).to.equal("Not found App.");
        });
    });

    it("The platform returns a Summary from an App", function () {
        var app_guid = null;
        return CloudFoundryApps.getApps().then(function (result) {
            return new Promise(function (resolve, reject) {
                expect(result.total_results).to.be.a('number');
                if (result.total_results > 0) {
                    app_guid = result.resources[0].metadata.guid;
                    return resolve();
                } else {
                    return reject("Not found App.");
                }
            });
        }).then(function () {
            return CloudFoundryApps.getSummary(app_guid);
        }).then(function () {
            expect(true).to.equal(true);
        }).catch(function (reason) {
            expect(reason).to.equal("Not found App.");
        });
    });

    it.skip("The platform returns Stats from an App", function () {
        var app_guid = null;
        return CloudFoundryApps.getApps().then(function (result) {
            return new Promise(function (resolve, reject) {
                expect(result.total_results).to.be.a('number');
                if (result.total_results > 0) {
                    app_guid = result.resources[0].metadata.guid;
                    return resolve();
                }else {
                    return reject("Not found App.");
                }
            });
        }).then(function () {
            return CloudFoundryApps.getStats(app_guid);
        }).then(function () {
            expect(true).to.equal(true);
        }).catch(function (reason) {
            expect(reason).to.equal("Not found App.");
        });
    });

    it.skip("The platform returns instances from an App", function () {
        var app_guid = null;
        return CloudFoundryApps.getApps().then(function (result) {
            return new Promise(function (resolve, reject) {
                expect(result.total_results).to.be.a('number');
                if (result.total_results > 0) {
                    app_guid = result.resources[0].metadata.guid;
                    return resolve();
                }else {
                    return reject("Not found App.");
                }
            });
        }).then(function () {
            return CloudFoundryApps.getInstances(app_guid);
        }).then(function () {
            expect(true).to.equal(true);
        }).catch(function (reason) {
            expect(reason).to.equal("Not found App.");
        });
    });

    it.skip("Start an App", function () {
        //Inner function used to check when an application run in the system.
        function recursiveCheckApp(app_guid) {
            var iterationLimit = 10;
            var counter = 0;
            return new Promise(function check(resolve, reject) {
                CloudFoundryApps.getInstances(app_guid).then(function () {
                    return CloudFoundryApps.getStats(app_guid);
                }).then(function (result) {
                    console.log(result["0"].state);
                    //console.log(counter);
                    if (result["0"].state === "RUNNING") {
                        resolve(result);
                    } else if (counter === iterationLimit) {
                        reject(new Error("Timeout"));
                    } else {
                        //console.log("next try");
                        counter += 1;
                        setTimeout(check, 1000, resolve, reject);
                    }
                });
            });
        }

        //TODO: Improve Tests to get the first App
        var app_guid = null;
        var filter = {
            'q': 'name:' + "sso",
            'inline-relations-depth': 1
        };
        //var filter = {
        //    'guid' : space_guid
        //}
        return CloudFoundrySpaces.getSpaceApps(space_guid, filter).then(function (result) {
            app_guid = result.resources[0].metadata.guid;
            //console.log(app_guid);
            console.log(result.resources[0].entity.state);
            return CloudFoundryApps.start(app_guid);
        }).then(function () {
            return recursiveCheckApp(app_guid);
        //RESET STATE
        }).then(function () {
            return CloudFoundryApps.stop(app_guid);
        }).then(function (result) {
            console.log(result.entity.state);
            expect(true).to.equal(true);
        }).catch(function (reason) {
            expect(reason).to.equal("Not found App.");
        });
    });

    it("The platform returns Routes from an App", function () {
        function recursiveGetAppRoutes(appRouteGuidList) {

            //Check maybe the limit is short
            var iterationLimit = 50;
            var counter = 0;
            var app_guid = null;
            var appRouteGuidMap = {};

            return new Promise(function check(resolve, reject) {

                app_guid = appRouteGuidList[counter];
                CloudFoundryApps.getAppRoutes(app_guid).then(function (result) {

                    if (result.resources.length > 0) {
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

        var appRouteGuidList = [];
        var ERROR_MESSAGE_NO_APPS = "No App";

        return CloudFoundryApps.getApps().then(function (result) {
            if (result.total_results === 0) {
                return new Promise(function check(resolve, reject) {
                    reject(ERROR_MESSAGE_NO_APPS);
                });
            }
            var i = 0;
            for (i = 0; i < result.resources.length; i++) {
                appRouteGuidList.push(result.resources[i].metadata.guid);
            }
            return recursiveGetAppRoutes(appRouteGuidList);
        }).then(function (result) {
            expect(result).to.be.a('Object');
        }).error(function (reason) {
            expect(reason).to.equal(ERROR_MESSAGE_NO_APPS);
        });
    });

    it("The platform returns Service Bindings from an App", function () {
        var app_guid = null;
        return CloudFoundryApps.getApps().then(function (result) {
            return new Promise(function (resolve, reject) {
                expect(result.total_results).to.be.a('number');
                if (result.total_results > 0) {
                    app_guid = result.resources[0].metadata.guid;
                    return resolve();
                }else {
                    return reject("Not found App.");
                }
            });
        }).then(function () {
            return CloudFoundryApps.getServiceBindings(app_guid);
        }).then(function (result) {
            expect(result.total_results).to.be.a('number');
        }).catch(function (reason) {
            expect(reason).to.equal("Not found App.");
        });
    });

    it("The platform returns Service Bindings from an App with a filter", function () {
        var app_guid = null;
        var filter = {
            'q': 'service_instance_guid:' + "850c8006-d046-483f-b9a5-056d25e8ca0b"
        };
        return CloudFoundryApps.getApps().then(function (result) {
            return new Promise(function (resolve, reject) {
                expect(result.total_results).to.be.a('number');
                if (result.total_results > 0) {
                    app_guid = result.resources[0].metadata.guid;
                    return resolve();
                }else {
                    return reject("Not found App.");
                }
            });
        }).then(function () {
            return CloudFoundryApps.getServiceBindings(app_guid, filter);
        }).then(function (result) {
            //console.log(result);
            expect(result.total_results).to.be.a('number');
        }).catch(function (reason) {
            expect(reason).to.equal("Not found App.");
        });
    });

    it("The platform returns Environment Variables from an App", function () {
        var app_guid = null;
        return CloudFoundryApps.getApps().then(function (result) {
            return new Promise(function (resolve, reject) {
                expect(result.total_results).to.be.a('number');
                if (result.total_results > 0) {
                    app_guid = result.resources[0].metadata.guid;
                    return resolve();
                }else {
                    return reject("Not found App.");
                }
            });
        }).then(function () {
            return CloudFoundryApps.getEnvironmentVariables(app_guid);
        }).then(function (result) {
            //console.log(result);
            expect(true).to.be.a('boolean');
        }).catch(function (reason) {
            expect(reason).to.equal("Not found App.");
        });
    });

    it.skip("Remove app", function () {  // TODO make test to add then remove app
        var app_guid = "c3efd256-1225-4b2a-83ab-453e2f902944";
        return CloudFoundryApps.remove(app_guid).then(function (result) {
            //console.log(result);
            expect(true).to.equal(true);
        });
    });

});
