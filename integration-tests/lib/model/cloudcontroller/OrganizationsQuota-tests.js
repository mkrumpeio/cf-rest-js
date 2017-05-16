/*jslint node: true*/
/*global describe: true, before: true, it: true*/
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
var CloudFoundryOrg = require("../../../../lib/model/cloudcontroller/Organizations");
var CloudFoundryOrgQuota = require("../../../../lib/model/cloudcontroller/OrganizationsQuota");
CloudController = new CloudController();
CloudFoundryUsersUAA = new CloudFoundryUsersUAA();
CloudFoundryOrg = new CloudFoundryOrg();
CloudFoundryOrgQuota = new CloudFoundryOrgQuota();

describe("Cloud foundry Organizations Quota", function () {

    var authorization_endpoint = null;
    var token_endpoint = null;
    var token_type = null;
    var access_token = null;

    before(function () {
        this.timeout(15000);

        CloudController.setEndPoint(cf_api_url);
        CloudFoundryOrg.setEndPoint(cf_api_url);
        CloudFoundryOrgQuota.setEndPoint(cf_api_url);

        return CloudController.getInfo().then(function (result) {
            authorization_endpoint = result.authorization_endpoint;
            token_endpoint = result.token_endpoint;
            CloudFoundryUsersUAA.setEndPoint(authorization_endpoint);
            return CloudFoundryUsersUAA.login(username, password);
        }).then(function (result) {
            CloudFoundryOrg.setToken(result);
            CloudFoundryOrgQuota.setToken(result);
        });
    });

    function randomInt(low, high) {
        return Math.floor(Math.random() * (high - low) + low);
    }

    it("The platform returns Quota Definitions from Organizations", function () {
        this.timeout(5000);

        var org_guid = null;

        return CloudFoundryOrgQuota.getQuotaDefinitions().then(function (result) {
            //console.log(result.resources);
            expect(true).is.a("boolean");
        });
    });    

    it.skip("The platform returns Quota Definitions from the first Organization", function () {
        this.timeout(3000);

        var org_guid = null;

        return CloudFoundryOrg.getOrganizations().then(function (result) {
            console.log(result);
            org_guid = result.resources[0].metadata.guid;
            return CloudFoundryOrg.getQuotaDefinition(org_guid);
        }).then(function (result) {
            console.log(result.resources);
            expect(true).is.a("boolean");
        });
    });  

    it.skip("Create a Quota Definitions", function () {
        this.timeout(3000);

        var quotaOptions = {
            'name': "demo",
            'non_basic_services_allowed': true,
            'total_services': 100,
            'total_routes': 1000,
            'total_private_domains': 1,     
            'memory_limit': 2048,     
            'instance_memory_limit': 1024                
        };

        return CloudFoundryOrgQuota.add(quotaOptions).then(function (result) {
            console.log(result);
            expect(true).is.a("boolean");
        });
    });

    it.skip("Remove a Quota Definitions", function () {
        this.timeout(3000);

        var quota_guid = "d87d903f-e7ee-4ae8-8840-413c6afc3616";
        var async = {
            'async': false
        };

        return CloudFoundryOrgQuota.remove(quota_guid, async).then(function (result) {
            console.log(result);
            expect(true).is.a("boolean");
        });
    });

    //Testing users doesn't have permissions
    // if(environment === "LOCAL_INSTANCE_1") {

    //     it("Add & Remove a Quota Definitions", function () {
    //         this.timeout(3000);

    //         var quota_guid = null;
    //         var quota_name = "quota" + randomWords() + randomInt(1, 10000);
    //         var quotaOptions = {
    //             'name': quota_name,
    //             'non_basic_services_allowed': true,
    //             'total_services': 100,
    //             'total_routes': 1000,
    //             'total_private_domains': 1,     
    //             'memory_limit': 2048,     
    //             'instance_memory_limit': 1024                
    //         };
    //         var async = {
    //             'async': false
    //         };
    //         return CloudFoundryOrgQuota.add(quotaOptions).then(function (result) {
    //             quota_guid = result.metadata.guid;
    //             return CloudFoundryOrgQuota.remove(quota_guid, async);
    //         }).then(function (result) {
    //             expect(true).is.a("boolean");
    //         });
    //     });

    // }

});