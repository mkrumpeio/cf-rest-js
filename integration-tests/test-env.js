
var config = require('../config');
var args = require('minimist')(process.argv.slice(2));
var cf_api_url = args.PREDIX_URL || process.env.PREDIX_URL || 'https://api.system.aws-usw02-pr.ice.predix.io';
var username = args.USERNAME || process.env.USERNAME;
var password = args.PASSWORD || process.env.PASSWORD || 'secret';

config.user = username;
config.password = password;
config.cloudUrl = cf_api_url;

module.exports = {
  cf_api_url,
  username,
  password,
};