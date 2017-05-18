'use strict';
var config = require('../../../config');

const CloudControllerBase = require('./CloudControllerBase');

class Domains extends CloudControllerBase {

  constructor(endPoint) {
    super(endPoint);
  }

// http://apidocs.cloudfoundry.org/214/domains_(deprecated)/list_all_domains_(deprecated).html}
  getDomains() {

    const url = `${config.cloudUrl}/v2/domains`;
    const options = {
      method: 'GET',
      url: url,
      headers: {
        Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`,
      },
    };

    return this.REST.request(options, this.HttpStatus.OK, true);
  }

// http://apidocs.cloudfoundry.org/214/shared_domains/list_all_shared_domains.html}
  getSharedDomains() {

    const url = `${config.cloudUrl}/v2/shared_domains`;
    const options = {
      method: 'GET',
      url: url,
      headers: {
        Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`,
      },
    };

    return this.REST.request(options, this.HttpStatus.OK, true);
  }

}

module.exports = Domains;
