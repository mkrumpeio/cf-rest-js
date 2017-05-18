'use strict';

var version = require('./package.json').version;
var Apps = require('./lib/model/cloudcontroller/Apps');
var BuildPacks = require('./lib/model/cloudcontroller/BuildPacks');
var CloudController = require('./lib/model/cloudcontroller/CloudController');
var Domains = require('./lib/model/cloudcontroller/Domains');
var Events = require('./lib/model/cloudcontroller/Events');
var Jobs = require('./lib/model/cloudcontroller/Jobs');
var Logs = require('./lib/model/metrics/Logs');
var Organizations = require('./lib/model/cloudcontroller/Organizations');
var OrganizationsQuota = require('./lib/model/cloudcontroller/OrganizationsQuota');
var Routes = require('./lib/model/cloudcontroller/Routes');
var Services = require('./lib/model/cloudcontroller/Services');
var ServiceBindings = require('./lib/model/cloudcontroller/ServiceBindings');
var ServiceInstances = require('./lib/model/cloudcontroller/ServiceInstances');
var ServicePlans = require('./lib/model/cloudcontroller/ServicePlans');
var Spaces = require('./lib/model/cloudcontroller/Spaces');
var SpacesQuota = require('./lib/model/cloudcontroller/SpacesQuota');
var Stacks = require('./lib/model/cloudcontroller/Stacks');
var UserProvidedServices = require('./lib/model/cloudcontroller/UserProvidedServices');
var Users = require('./lib/model/cloudcontroller/Users');
var UsersUAA = require('./lib/model/uaa/UsersUAA');

module.exports = {
  version, Apps, BuildPacks, CloudController, Domains, Events, Jobs, Logs,
  Organizations, OrganizationsQuota, Routes,
  Services, ServiceBindings, ServiceInstances, ServicePlans,
  Spaces, SpacesQuota, Stacks,
  UserProvidedServices, Users, UsersUAA,
};
