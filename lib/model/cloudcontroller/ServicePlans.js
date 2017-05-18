'use strict';
var config = require('../../../config');

const CloudControllerBase = require('./CloudControllerBase');

class ServicePlans extends CloudControllerBase {

  constructor(endPoint) {
    super(endPoint);
  }

// https://apidocs.cloudfoundry.org/226/service_plans/list_all_service_plans.html}
  getServicePlans(filter) {
    const url = `${config.cloudUrl}/v2/service_plans`;
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

// https://apidocs.cloudfoundry.org/226/service_plans/retrieve_a_particular_service_plan.html}
  getServicePlan(guid) {

    const url = `${config.cloudUrl}/v2/service_plans/${guid}`;
    const options = {
      method: 'GET',
      url: url,
      headers: {
        Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`,
      },
    };

    return this.REST.request(options, this.HttpStatus.OK, true);
  }

// https://apidocs.cloudfoundry.org/226/service_plans/list_all_service_instances_for_the_service_plan.html}
  getServicePlanInstances(guid) {

    const url = `${config.cloudUrl}/v2/service_plans/${guid}/service_instances`;
    const options = {
      method: 'GET',
      url: url,
      headers: {
        Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`,
      },
    };

    return this.REST.request(options, this.HttpStatus.OK, true);
  }

// https://apidocs.cloudfoundry.org/226/service_plans/delete_a_particular_service_plans.html}
  remove(guid) {

    const url = `${config.cloudUrl}/v2/service_plans/${guid}`;
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

module.exports = ServicePlans;
