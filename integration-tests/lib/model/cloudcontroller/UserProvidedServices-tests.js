/*jslint node: true*/
/*global describe: true, before:true, it: true*/
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
var CloudFoundrySpaces = require("../../../../lib/model/cloudcontroller/Spaces");
var CloudFoundryUserProvidedServices = require("../../../../lib/model/cloudcontroller/UserProvidedServices");
CloudController = new CloudController(cf_api_url);
CloudFoundryUsersUAA = new CloudFoundryUsersUAA();
CloudFoundrySpaces = new CloudFoundrySpaces(cf_api_url);
CloudFoundryUserProvidedServices = new CloudFoundryUserProvidedServices(cf_api_url);

describe.skip("Cloud foundry User Provided Services", function () {

    var authorization_endpoint = null;
    var token_endpoint = null;
    var token_type = null;
    var access_token = null;
    var space_guid = null;

    before(function () {
        this.timeout(15000);

        CloudController.setEndPoint(cf_api_url);
        CloudFoundrySpaces.setEndPoint(cf_api_url);
        CloudFoundryUserProvidedServices.setEndPoint(cf_api_url);

        return CloudController.getInfo().then(function (result) {
            authorization_endpoint = result.authorization_endpoint;             
            token_endpoint = result.token_endpoint;
            CloudFoundryUsersUAA.setEndPoint(authorization_endpoint);
            return CloudFoundryUsersUAA.login(username, password);
        }).then(function (result) {
            CloudFoundrySpaces.setToken(result);
            CloudFoundryUserProvidedServices.setToken(result);
            return CloudFoundrySpaces.getSpaces();
        }).then(function (result) {
            space_guid = result.resources[0].metadata.guid;
        });

    });

    function randomInt(low, high) {
        return Math.floor(Math.random() * (high - low) + low);
    }

    it("The platform returns a list of User Provided Services", function () {
        this.timeout(10000);

        return CloudFoundryUserProvidedServices.getServices().then(function (result) {
            //console.log(result.resources);
            expect(result.total_results).is.a("number");
        });
    });

    it("The platform returns the first User Provided Service", function () {
        this.timeout(10000);

        var service_guid = null;
        return CloudFoundryUserProvidedServices.getServices().then(function (result) {
            if(result.total_results === 0){
                return new Promise(function (resolve, reject) {
                    return reject("No User Provided Service");
                });                
            }            
            service_guid = result.resources[0].metadata.guid;
            return CloudFoundryUserProvidedServices.getService(service_guid);
        }).then(function (result) {
            expect(result.metadata.guid).is.a("string");
        }).catch(function (reason) {
            //console.error("Error: " + reason);
            expect(reason).to.equal("No User Provided Service");
        });
    });

    it.skip("Create an User Provided Service", function () {
        this.timeout(10000);

        var serviceName = "s" + randomWords() + randomInt(1, 100);
        var service_guid = null;
        var credentials = {
            dbname : "demo",
            host : "8.8.8.8",
            port : "3306", 
            username : "root",
            password : "123456"
        };
        var user_provided_service_options ={
            "space_guid" : space_guid,
            "name" : serviceName,
            "credentials" : credentials
        };

        return CloudFoundryUserProvidedServices.add(user_provided_service_options).then(function (result) {
            expect(result.metadata.guid).is.a("string");
        });
    });

    it("Create & Delete an User Provided Service", function () {
        this.timeout(10000);

        var serviceName = "s" + randomWords() + randomInt(1, 100);
        var service_guid = null;
        var credentials = {
            dbname : "demo",
            host : "8.8.8.8",
            port : "3306", 
            username : "root",
            password : "123456"
        };
        var user_provided_service_options ={
            "space_guid" : space_guid,
            "name" : serviceName,
            "credentials" : credentials
        };        
        return CloudFoundryUserProvidedServices.add(user_provided_service_options).then(function (result) {
            service_guid = result.metadata.guid;
            expect(service_guid).is.a("string");
            return CloudFoundryUserProvidedServices.remove(service_guid);
        }).then(function (result) {
            expect(true).to.equal(true);
        });
    });

    it("Create, Search & Delete an User Provided Service", function () {
        this.timeout(10000);

        var serviceName = "s" + randomWords() + randomInt(1, 100);
        var service_guid = null;
        var credentials = {
            dbname : "demo",
            host : "8.8.8.8",
            port : "3306", 
            username : "root",
            password : "123456"
        };
        var user_provided_service_options ={
            "space_guid" : space_guid,
            "name" : serviceName,
            "credentials" : credentials
        };         
        return CloudFoundryUserProvidedServices.add(user_provided_service_options).then(function (result) {
            service_guid = result.metadata.guid;
            expect(service_guid).is.a("string");
            return CloudFoundryUserProvidedServices.getServiceBindings(service_guid);
        }).then(function (result) {   
            expect(result.total_results).is.a("number"); 
            expect(result.total_results).to.equal(0);     
            return CloudFoundryUserProvidedServices.remove(service_guid);
        }).then(function (result) {
            expect(true).to.equal(true);
        });
    });    

});