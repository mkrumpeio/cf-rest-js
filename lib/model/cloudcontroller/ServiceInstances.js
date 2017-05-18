'use strict';
var config = require('../../../config');

const CloudControllerBase = require('./CloudControllerBase');
class ServiceInstances extends CloudControllerBase {

  constructor(endPoint) {
    super(endPoint);
  }

// https://apidocs.cloudfoundry.org/226/service_instances/list_all_service_instances.html}
  getInstances(filter) {

    const url = `${config.cloudUrl}/v2/service_instances`;
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

// https://apidocs.cloudfoundry.org/226/service_instances/retrieve_a_particular_service_instance.html}
  getInstance(guid) {

    const url = `${config.cloudUrl}/v2/service_instances/${guid}`;
    const options = {
      method: 'GET',
      url: url,
      headers: {
        Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`,
      },
    };

    return this.REST.request(options, this.HttpStatus.OK, true);
  }

// https://apidocs.cloudfoundry.org/226/service_instances/retrieving_permissions_on_a_service_instance.html}
  getInstancePermissions(guid) {

    const url = `${config.cloudUrl}/v2/service_instances/${guid}/permissions`;
    const options = {
      method: 'GET',
      url: url,
      headers: {
        Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`,
      },
    };

    return this.REST.request(options, this.HttpStatus.OK, true);
  }

// https://apidocs.cloudfoundry.org/226/service_instances/list_all_service_bindings_for_the_service_instance.html}
  getInstanceBindings(guid) {

    const url = `${config.cloudUrl}/v2/service_instances/${guid}/service_bindings`;
    const options = {
      method: 'GET',
      url: url,
      headers: {
        Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`,
      },
    };

    return this.REST.request(options, this.HttpStatus.OK, true);
  }

// https://apidocs.cloudfoundry.org/226/service_instances/list_all_routes_for_the_service_instance.html}
  getInstanceRoutes(guid) {

    const url = `${config.cloudUrl}/v2/service_instances/${guid}/routes`;
    const options = {
      method: 'GET',
      url: url,
      headers: {
        Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`,
      },
    };

    return this.REST.request(options, this.HttpStatus.OK, true);
  }

// https://apidocs.cloudfoundry.org/226/service_instances/creating_a_service_instance.html}
  create(appOptions) {

    const url = `${config.cloudUrl}/v2/service_instances`;
    const options = {
      method: 'POST',
      url: url,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`,
      },
      form: JSON.stringify(appOptions),
    };

    return this.REST.request(options, this.HttpStatus.CREATED, true);
  }

// https://apidocs.cloudfoundry.org/226/service_instances/delete_a_service_instance.html}
  remove(guid) {

    const url = `${config.cloudUrl}/v2/service_instances/${guid}`;
    const options = {
      method: 'DELETE',
      url: url,
      headers: {
        Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`,
      },
    };

    return this.REST.request(options, this.HttpStatus.NO_CONTENT, false);
  }

// https://apidocs.cloudfoundry.org/226/service_instances/update_a_service_instance.html}
  update(serviceInstanceGuid, serviceInstanceOptions) {

    const url = `${config.cloudUrl}/v2/service_instances/${serviceInstanceGuid}`;
    const options = {
      method: 'PUT',
      url: url,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`,
      },
      form: JSON.stringify(serviceInstanceOptions),
    };

    return this.REST.request(options, this.HttpStatus.CREATED, true);
  }

}

module.exports = ServiceInstances;
