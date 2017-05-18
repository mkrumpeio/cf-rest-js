'use strict';
var config = require('../../../config');

const CloudControllerBase = require('./CloudControllerBase');

class OrganizationsQuota extends CloudControllerBase {

  constructor(endPoint) {
    super(endPoint);
  }

// http://apidocs.cloudfoundry.org/213/organization_quota_definitions
  getQuotaDefinitions() {

    const url = `${config.cloudUrl}/v2/quota_definitions`;
    const options = {
      method: 'GET',
      url: url,
      headers: {
        Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`,
      },
    };

    return this.REST.request(options, this.HttpStatus.OK, true);
  }

// http://apidocs.cloudfoundry.org/213/organization_quota_definitions
  getQuotaDefinition(guid) {

    const url = `${config.cloudUrl}/v2/quota_definitions/${guid}`;
    const options = {
      method: 'GET',
      url: url,
      headers: {
        Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`,
      },
    };

    return this.REST.request(options, this.HttpStatus.OK, true);
  }

// http://apidocs.cloudfoundry.org/222/organization_quota_definitions
  add(quotaOptions) {

    const url = `${config.cloudUrl}/v2/quota_definitions`;
    const options = {
      method: 'POST',
      url: url,
      headers: {
        Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`,
      },
      form: JSON.stringify(quotaOptions),
    };

    return this.REST.request(options, this.HttpStatus.CREATED, true);
  }

// http://apidocs.cloudfoundry.org/222/organization_quota_definitions
  remove(guid, async) {

    const url = `${config.cloudUrl}/v2/quota_definitions/${guid}`;
    let qs = {};

    if (async) {
      qs = async;
    }
    const options = {
      method: 'DELETE',
      url: url,
      headers: {
        Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`,
      },
      qs: qs,
    };

    return this.REST.request(options, this.HttpStatus.NO_CONTENT, false);
  }

}

module.exports = OrganizationsQuota;
