/*jslint node: true*/
/*global describe: true, it: true*/
"use strict";

var Promise = require('bluebird');
var chai = require("chai"),
    expect = require("chai").expect;

var Buildpacks = require("../../../../lib/model/cloudcontroller/BuildPacks");
Buildpacks = new Buildpacks();

describe("Cloud Foundry Buildpacks", function () {

    it("Exist a support for a Node.js project", function () {
        expect(Buildpacks.get("nodejs")).to.equal("https://github.com/cloudfoundry/nodejs-buildpack");
    });

    it("Exist a support for a Static project", function () {
        expect(Buildpacks.get("static")).to.equal("https://github.com/cloudfoundry/staticfile-buildpack");
    });

    it("Exist a support for a Java project", function () {
        expect(Buildpacks.get("java")).to.equal("https://github.com/cloudfoundry/java-buildpack");
    });

    it("Exist a support for a PHP project", function () {
        expect(Buildpacks.get("php")).to.equal("https://github.com/cloudfoundry/php-buildpack");
    });

    it("Exist a support for a Python project", function () {
        expect(Buildpacks.get("python")).to.equal("https://github.com/cloudfoundry/python-buildpack");
    });



    it("Unknown Buildpacks handling", function () {
        expect(function () {
            Buildpacks.get("Unknown");
        }).to.throw('This Buildpack is not supported');
    });

});