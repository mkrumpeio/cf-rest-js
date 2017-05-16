/*jslint node: true*/
/*global describe: true, before: true, it: true*/
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
var CloudFoundryOrg = require("../../../../lib/model/cloudcontroller/Organizations");
var CloudFoundryOrgQuota = require("../../../../lib/model/cloudcontroller/OrganizationsQuota");
var CloudFoundrySpaces = require("../../../../lib/model/cloudcontroller/Spaces");
var CloudFoundryUsers = require("../../../../lib/model/cloudcontroller/Users");
CloudController = new CloudController();
CloudFoundryUsersUAA = new CloudFoundryUsersUAA();
CloudFoundryOrg = new CloudFoundryOrg();
CloudFoundryOrgQuota = new CloudFoundryOrgQuota();
CloudFoundrySpaces = new CloudFoundrySpaces();
CloudFoundryUsers = new CloudFoundryUsers();

describe("Cloud foundry Organizations", function () {

    function randomInt(low, high) {
        return Math.floor(Math.random() * (high - low) + low);
    }

    var authorization_endpoint = null;
    var token_endpoint = null;
    var token_type = null;
    var access_token = null;

    before(function () {
        this.timeout(15000);

        CloudController.setEndPoint(cf_api_url);
        CloudFoundryOrg.setEndPoint(cf_api_url);
        CloudFoundryOrgQuota.setEndPoint(cf_api_url);
        CloudFoundrySpaces.setEndPoint(cf_api_url);
        CloudFoundryUsers.setEndPoint(cf_api_url);

        return CloudController.getInfo().then(function (result) {
            authorization_endpoint = result.authorization_endpoint;
            token_endpoint = result.token_endpoint;
            CloudFoundryUsersUAA.setEndPoint(authorization_endpoint);
            return CloudFoundryUsersUAA.login(username, password);
        }).then(function (result) {
            CloudFoundryOrg.setToken(result);
            CloudFoundryUsersUAA.setToken(result);
            CloudFoundryOrgQuota.setToken(result);
            CloudFoundrySpaces.setToken(result);
            CloudFoundryUsers.setToken(result);
        });
    });

    it("The platform returns the Organizations defined", function () {
        this.timeout(5000);

        return CloudFoundryOrg.getOrganizations().then(function (result) {
            expect(result.total_results).is.a("number");
        });
    });

    it("The platform returns the first organization", function () {
        this.timeout(5000);

        var org_guid = null;

        return CloudFoundryOrg.getOrganizations().then(function (result) {
            org_guid = result.resources[0].metadata.guid;
            expect(result.total_results).is.a("number");
        });
    });

    it("The platform returns the memory usage of an Organization", function () {
        this.timeout(5000);

        var org_guid = null;

        return CloudFoundryOrg.getOrganizations().then(function (result) {
            //console.log(result.resources[0]);
            org_guid = result.resources[0].metadata.guid;
            return CloudFoundryOrg.getMemoryUsage(org_guid);
        }).then(function (result) {
            //console.log(result);
            expect(true).is.a("boolean");
        });
    });

    it("The platform returns users from the first Organization", function () {
        this.timeout(5000);

        var org_guid = null;

        return CloudFoundryOrg.getOrganizations().then(function (result) {
            org_guid = result.resources[0].metadata.guid;
            return CloudFoundryOrg.getUsers(org_guid);
        }).then(function (result) {
            //console.log(result.resources);
            expect(true).is.a("boolean");
        });
    });    

    it("The platform returns the summary from an Organization", function () {
        this.timeout(5000);

        var org_guid = null;

        return CloudFoundryOrg.getOrganizations().then(function (result) {
            org_guid = result.resources[0].metadata.guid;
            return CloudFoundryOrg.getSummary(org_guid);
        }).then(function (result) {
            //console.log(result);
            expect(true).is.a("boolean");
        });
    });

    it("The platform returns the private domains from an Organization", function () {
        this.timeout(5000);

        var org_guid = null;
        return CloudFoundryOrg.getOrganizations().then(function (result) {
            org_guid = result.resources[0].metadata.guid;
            return CloudFoundryOrg.getPrivateDomains(org_guid);
        }).then(function (result) {
            expect(result.total_results).is.a("number");
        });
    });

    it.skip("The platform creates an Organization", function () {
        this.timeout(5000);

        var org_guid = null;
        var orgOptions = {
            'name': "demo"             
        };
        //"quota_definition_guid"
        return CloudFoundryOrg.add(orgOptions).then(function (result) {
            //console.log(result);
            expect(true).is.a("boolean");
        });
    });

    //Testing users doesn't have permissions
    // if(environment === "LOCAL_INSTANCE_1") {

    //     it("The platform Creates & Remove an Organization", function () {
    //         this.timeout(5000);

    //         var org_guid = null;
    //         var orgOptions = {
    //             'name': "demo" + randomInt(1, 10000)             
    //         };
    //         //"quota_definition_guid"
    //         return CloudFoundryOrg.add(orgOptions).then(function (result) {
    //             //console.log(result);
    //             org_guid  = result.metadata.guid;
    //             orgOptions = {
    //                 'recursive': true, 
    //                 'async': false                      
    //             };
    //             return CloudFoundryOrg.remove(org_guid, orgOptions)
    //         }).then(function (result) {            
    //             expect(true).is.a("boolean");
    //         });
    //     });  

    //     it("The platform Creates a Quota for Organization, Organization & Space. After they are removed.", function () {
    //         this.timeout(5000);

    //         var quota_guid = null;
    //         var quotaOptions = {
    //             'name': "demo" + randomInt(1, 10000),
    //             'non_basic_services_allowed': true,
    //             'total_services': 100,
    //             'total_routes': 1000,
    //             'total_private_domains': 1,     
    //             'memory_limit': 2048,     
    //             'instance_memory_limit': 1024                
    //         };
    //         var org_guid = null;
    //         var space_guid = null;

    //         return CloudFoundryOrgQuota.add(quotaOptions).then(function (result) {
    //             quota_guid = result.metadata.guid;
    //             var orgOptions = {
    //                 'name': "demo" + randomInt(1, 10000),
    //                 "quota_definition_guid" : quota_guid     
    //             };
    //             return CloudFoundryOrg.add(orgOptions);
    //         }).then(function (result) {                
    //             //console.log(result);
    //             org_guid  = result.metadata.guid;
    //             var spaceOptions = {
    //                 'name': "demo" + randomInt(1, 10000),
    //                 'organization_guid': org_guid      
    //             };           
    //             return CloudFoundrySpaces.add(spaceOptions);
    //         }).then(function (result) {
    //             space_guid = result.metadata.guid;
    //             var spaceOptions = {
    //                 'recursive': true, 
    //                 'async': false                      
    //             };
    //             return CloudFoundrySpaces.remove(space_guid, spaceOptions);
    //         }).then(function (result) { 
    //             var orgOptions = {
    //                 'recursive': true, 
    //                 'async': false                      
    //             };                           
    //             return CloudFoundryOrg.remove(org_guid, orgOptions)
    //         }).then(function (result) { 
    //             var async = {
    //                 'async': false
    //             };                
    //             return CloudFoundryOrgQuota.remove(quota_guid, async);           
    //         }).then(function (result) {     
    //             expect(true).is.a("boolean");
    //         });
    //     });           

    //     it("The platform Creates a Quota for Organization, Organization, Space & user. After they are removed.", function () {
    //         this.timeout(5000);

    //         var quota_guid = null;
    //         var quotaOptions = {
    //             'name': "demo" + randomInt(1, 10000),
    //             'non_basic_services_allowed': true,
    //             'total_services': 100,
    //             'total_routes': 1000,
    //             'total_private_domains': 1,     
    //             'memory_limit': 2048,     
    //             'instance_memory_limit': 1024                
    //         };
    //         var org_guid = null;
    //         var space_guid = null;
    //         var uaa_guid = null;
    //         var username = "user" + randomInt(1, 10000);
    //         var uaa_options = {
    //             "schemas":["urn:scim:schemas:core:1.0"],
    //             "userName":username,
    //             "emails":[
    //                 {
    //                   "value":"demo@example.com",
    //                   "type":"work"
    //                 }
    //               ],
    //             "password": "123456",
    //         }; 
    //         var searchOptions = "?filter=userName eq '" + username + "'";
    //         var user_guid = null;         

    //         return CloudFoundryOrgQuota.add(quotaOptions).then(function (result) {
    //             quota_guid = result.metadata.guid;
    //             var orgOptions = {
    //                 'name': "demo" + randomInt(1, 10000),
    //                 "quota_definition_guid" : quota_guid     
    //             };
    //             return CloudFoundryOrg.add(orgOptions);
    //         }).then(function (result) {                
    //             //console.log(result);
    //             org_guid  = result.metadata.guid;
    //             var spaceOptions = {
    //                 'name': "demo" + randomInt(1, 10000),
    //                 'organization_guid': org_guid      
    //             };           
    //             return CloudFoundrySpaces.add(spaceOptions);
    //         }).then(function (result) {
    //             space_guid = result.metadata.guid;
    //             return CloudFoundryUsersUAA.add(uaa_options);
    //         }).then(function (result) {                
    //             return CloudFoundryUsersUAA.getUsers(searchOptions);
    //         }).then(function (result) {
    //             if(result.resources.length !== 1){
    //                 return new Promise(function (resolve, reject) {
    //                     return reject("No Users");
    //                 });
    //             }
    //             uaa_guid = result.resources[0].id;
    //             //console.log(uaa_guid)
    //             var userOptions = {
    //                 "guid": uaa_guid,
    //                 "default_space_guid":space_guid
    //             }
    //             return CloudFoundryUsers.add(userOptions);
    //         //Remove elements  
    //         }).then(function (result) {
    //             //console.log(result);
    //             user_guid = result.metadata.guid;
    //             return CloudFoundryUsers.remove(user_guid);
    //         }).then(function (result) {
    //             return CloudFoundryUsersUAA.remove(uaa_guid);
    //         }).then(function (result) {
    //             return CloudFoundryUsersUAA.getUsers(searchOptions);
    //         }).then(function (result) {
    //             if(result.resources.length !== 0){
    //                 return new Promise(function (resolve, reject) {
    //                     return reject("Rare output");
    //                 });
    //             }
    //         }).then(function (result) {

    //             var spaceOptions = {
    //                 'recursive': true, 
    //                 'async': false                      
    //             };
    //             return CloudFoundrySpaces.remove(space_guid, spaceOptions);
    //         }).then(function (result) { 
    //             var orgOptions = {
    //                 'recursive': true, 
    //                 'async': false                      
    //             };                           
    //             return CloudFoundryOrg.remove(org_guid, orgOptions)
    //         }).then(function (result) { 
    //             var async = {
    //                 'async': false
    //             };                
    //             return CloudFoundryOrgQuota.remove(quota_guid, async);           
    //         }).then(function (result) {     
    //             expect(true).is.a("boolean");
    //         });
    //     });

    //     it.skip("[TOOL] The platform Creates a Quota for Organization, Organization, Space & user.", function () {
    //         this.timeout(5000);

    //         var accountPassword = "123456";
    //         var quota_guid = null;
    //         var quotaOptions = {
    //             'name': accountName,
    //             'non_basic_services_allowed': true,
    //             'total_services': 100,
    //             'total_routes': 1000,
    //             'total_private_domains': 1,     
    //             'memory_limit': 2048,     
    //             'instance_memory_limit': 1024                
    //         };
    //         var org_guid = null;        
    //         var space_guid = null;
    //         var uaa_guid = null;
    //         var uaa_options = {
    //             "schemas":["urn:scim:schemas:core:1.0"],
    //             "userName":accountName,
    //             "emails":[
    //                 {
    //                   "value":"demo@example.com",
    //                   "type":"work"
    //                 }
    //               ],
    //             "password": accountPassword,
    //         };
    //         //cf login -a https://api.MY_IP.xip.io -u USERNAME -p PASSWORD --skip-ssl-validation
    //         var searchOptions = "?filter=userName eq '" + accountName + "'";
    //         var user_guid = null;         

    //         return CloudFoundryOrgQuota.add(quotaOptions).then(function (result) {
    //             quota_guid = result.metadata.guid;
    //             var orgOptions = {
    //                 'name': accountName,
    //                 "quota_definition_guid" : quota_guid     
    //             };
    //             return CloudFoundryOrg.add(orgOptions);
    //         }).then(function (result) {                
    //             //console.log(result);
    //             org_guid  = result.metadata.guid;
    //             var spaceOptions = {
    //                 'name': accountName,
    //                 'organization_guid': org_guid      
    //             };           
    //             return CloudFoundrySpaces.add(spaceOptions);
    //         }).then(function (result) {
    //             space_guid = result.metadata.guid;
    //             return CloudFoundryUsersUAA.add(uaa_options);
    //         }).then(function (result) {                
    //             return CloudFoundryUsersUAA.getUsers(searchOptions);
    //         }).then(function (result) {
    //             if(result.resources.length !== 1){
    //                 return new Promise(function (resolve, reject) {
    //                     return reject("No Users");
    //                 });
    //             }
    //             uaa_guid = result.resources[0].id;
    //             //console.log(uaa_guid)
    //             /*
    //             var userOptions = {
    //                 "guid": uaa_guid,
    //                 "default_space_guid":space_guid
    //             }
    //             */
    //             var userOptions = {
    //                 "guid": uaa_guid
    //             }                
    //             return CloudFoundryUsers.add(userOptions);
    //         }).then(function (result) {
    //             user_guid = result.metadata.guid;
    //             return CloudFoundryUsers.associateOrganization(user_guid, org_guid);
    //         }).then(function (result) {
    //             return CloudFoundryUsers.associateSpace(user_guid, space_guid);               
    //         //Test Login with new account
    //         }).then(function (result) {
    //             CloudFoundryUsersUAA.setEndPoint(authorization_endpoint);
    //             return CloudFoundryUsersUAA.login(accountName, accountPassword);
    //         }).then(function (result) {
    //             expect(result.token_type).to.equal("bearer");
    //         });
    //     });

    // }

});