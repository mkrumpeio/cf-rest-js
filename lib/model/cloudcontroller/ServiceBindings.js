'use strict';
var config = require('../../../config');

const CloudControllerBase = require('./CloudControllerBase');

class ServiceBindings extends CloudControllerBase {

  constructor(endPoint) {
    super(endPoint);
  }

// http://apidocs.cloudfoundry.org/217/service_bindings/list_all_service_bindings.html}
  getServiceBindings(filter) {
    const url = `${config.cloudUrl}/v2/service_bindings`;
    let qs = {};
    if (filter) qs = filter;
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

// http://apidocs.cloudfoundry.org/217/service_bindings/retrieve_a_particular_service_binding.html}
  getServiceBinding(guid) {

    const url = `${config.cloudUrl}/v2/service_bindings/${guid}`;
    const options = {
      method: 'GET',
      url: url,
      headers: {
        Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`,
      },
    };

    return this.REST.request(options, this.HttpStatus.OK, true);
  }

// http://apidocs.cloudfoundry.org/217/service_bindings/create_a_service_binding.html}
  associateServiceWithApp(serviceGuid, appGuid) {

    const url = `${config.cloudUrl}/v2/service_bindings`;
    const options = {
      method: 'POST',
      url: url,
      headers: {
        Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`,
      },
      form: JSON.stringify({
        service_instance_guid: serviceGuid,
        app_guid: appGuid,
      }),
    };

    return this.REST.request(options, this.HttpStatus.CREATED, true);
  }

// http://apidocs.cloudfoundry.org/217/service_bindings/delete_a_particular_service_binding.html}
  remove(guid) {

    const url = `${config.cloudUrl}/v2/service_bindings/${guid}`;
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

module.exports = ServiceBindings;
