'use strict';
var config = require('../../../config');

const CloudControllerBase = require('./CloudControllerBase');

class SpacesQuota extends CloudControllerBase {

  constructor(endPoint) {
    super(endPoint);
  }

// http://apidocs.cloudfoundry.org/214/space_quota_definitions/list_all_space_quota_definitions.html}
  getQuotaDefinitions() {

    const url = `${config.cloudUrl}/v2/space_quota_definitions`;
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

module.exports = SpacesQuota;
