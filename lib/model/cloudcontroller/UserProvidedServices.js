'use strict';
var config = require('../../../config');

const CloudControllerBase = require('./CloudControllerBase');

// https://docs.cloudfoundry.org/devguide/services/user-provided.html}

class UserProvidedServices extends CloudControllerBase {

  constructor(endPoint) {
    super(endPoint);
  }

// http://apidocs.cloudfoundry.org/217/user_provided_service_instances/list_all_user_provided_service_instances.html}
  getServices() {

    const url = `${config.cloudUrl}/v2/user_provided_service_instances`;
    const options = {
      method: 'GET',
      url: url,
      headers: {
        Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`,
      },
    };

    return this.REST.request(options, this.HttpStatus.OK, true);
  }

// http://apidocs.cloudfoundry.org/217/user_provided_service_instances/retrieve_a_particular_user_provided_service_instance.html}
  getService(guid) {

    const url = `${config.cloudUrl}/v2/user_provided_service_instances/${guid}`;
    const options = {
      method: 'GET',
      url: url,
      headers: {
        Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`,
      },
    };

    return this.REST.request(options, this.HttpStatus.OK, true);
  }

// http://apidocs.cloudfoundry.org/217/user_provided_service_instances/creating_a_user_provided_service_instance.html}
  add(upsOptions) {

    const url = `${config.cloudUrl}/v2/user_provided_service_instances`;
    const options = {
      method: 'POST',
      url: url,
      headers: {
        Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`,
      },
      form: JSON.stringify(upsOptions),
    };

    return this.REST.request(options, this.HttpStatus.CREATED, true);
  }

// http://apidocs.cloudfoundry.org/217/user_provided_service_instances/delete_a_particular_user_provided_service_instance.html}
  remove(guid) {

    const url = `${config.cloudUrl}/v2/user_provided_service_instances/${guid}`;
    const options = {
      method: 'DELETE',
      url: url,
      headers: {
        Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`,
      },
    };

    return this.REST.request(options, this.HttpStatus.NO_CONTENT, false);
  }

// http://apidocs.cloudfoundry.org/221/user_provided_service_instances/list_all_service_bindings_for_the_user_provided_service_instance.html}
  getServiceBindings(guid, filter) {

    const url = `${config.cloudUrl}/v2/user_provided_service_instances/${guid}/service_bindings`;
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

}

module.exports = UserProvidedServices;
