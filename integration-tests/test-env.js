

var args = require('minimist')(process.argv.slice(2));
var cf_api_url = args.PREDIX_URL || process.env.PREDIX_URL || 'https://api.system.aws-usw02-pr.ice.predix.io';
var username = args.USERNAME || process.env.USERNAME;
var password = args.PASSWORD || process.env.PASSWORD || 'secret';

// console.log('cf_api_url:',cf_api_url);
// console.log('username:',username);
// console.log('password:',password);

module.exports = {
  cf_api_url,
  username,
  password,
};