'use strict';
var config = require('../../../config');

const CloudControllerBase = require('./CloudControllerBase');

class Services extends CloudControllerBase {

  constructor(endPoint) {
    super(endPoint);
  }

// https://apidocs.cloudfoundry.org/226/services/list_all_services.html}
  getServices(filter) {

    const url = `${config.cloudUrl}/v2/services`;
    let qs = {};

    if (filter) {
      qs = filter;
    }
    const options = {
      method: 'GET',
      url: url,
      headers: {
        Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`,
      },
      qs: qs,
    };

    return this.REST.request(options, this.HttpStatus.OK, true);
  }

// https://apidocs.cloudfoundry.org/226/services/retrieve_a_particular_service.html}
  getService(guid) {

    const url = `${config.cloudUrl}/v2/services/${guid}`;
    const options = {
      method: 'GET',
      url: url,
      headers: {
        Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`,
      },
    };

    return this.REST.request(options, this.HttpStatus.OK, true);
  }

// https://apidocs.cloudfoundry.org/226/services/list_all_service_plans_for_the_service.html}
  getServicePlans(guid) {

    const url = `${config.cloudUrl}/v2/services/${guid}/service_plans`;
    const options = {
      method: 'GET',
      url: url,
      headers: {
        Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`,
      },
    };

    return this.REST.request(options, this.HttpStatus.OK, true);
  }

// https://apidocs.cloudfoundry.org/226/services/delete_a_particular_service.html}
  remove(guid) {

    const url = `${config.cloudUrl}/v2/services/${guid}`;
    const options = {
      method: 'DELETE',
      url: url,
      headers: {
        Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`,
      },
    };

    return this.REST.request(options, this.HttpStatus.NO_CONTENT, false);
  }

}

module.exports = Services;
