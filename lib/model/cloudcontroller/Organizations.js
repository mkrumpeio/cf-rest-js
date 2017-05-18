'use strict';
var config = require('../../../config');

const CloudControllerBase = require('./CloudControllerBase');

class Organizations extends CloudControllerBase {

  constructor(endPoint) {
    super(endPoint);
  }

// http://apidocs.cloudfoundry.org/213/organizations/list_all_organizations.html}
  getOrganizations() {

    const url = `${config.cloudUrl}/v2/organizations`;
    const options = {
      method: 'GET',
      url: url,
      headers: {
        Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`,
      },
    };

    return this.REST.request(options, this.HttpStatus.OK, true);
  }

// http://apidocs.cloudfoundry.org/222/organizations/retrieving_organization_memory_usage.html}
  getMemoryUsage(guid) {

    const url = `${config.cloudUrl}/v2/organizations/${guid}/memory_usage`;
    const options = {
      method: 'GET',
      url: url,
      headers: {
        Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`,
      },
    };

    return this.REST.request(options, this.HttpStatus.OK, true);
  }

// http://apidocs.cloudfoundry.org/214/organizations/retrieve_a_particular_organization.html}
  getOrganization(guid) {

    const url = `${config.cloudUrl}/v2/organizations/${guid}`;
    const options = {
      method: 'GET',
      url: url,
      headers: {
        Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`,
      },
    };

    return this.REST.request(options, this.HttpStatus.OK, true);
  }

// http://apidocs.cloudfoundry.org/222/organizations/get_organization_summary.html}
  getSummary(guid) {

    const url = `${config.cloudUrl}/v2/organizations/${guid}/summary`;
    const options = {
      method: 'GET',
      url: url,
      headers: {
        Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`,
      },
    };

    return this.REST.request(options, this.HttpStatus.OK, true);
  }

// http://apidocs.cloudfoundry.org/214/organizations/list_all_private_domains_for_the_organization.html}
  getPrivateDomains(guid) {

    const url = `${config.cloudUrl}/v2/organizations/${guid}/private_domains`;
    const options = {
      method: 'GET',
      url: url,
      headers: {
        Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`,
      },
    };

    return this.REST.request(options, this.HttpStatus.OK, true);
  }

// http://apidocs.cloudfoundry.org/222/organizations/creating_an_organization.html}
  add(orgOptions) {

    const url = `${config.cloudUrl}/v2/organizations`;
    const options = {
      method: 'POST',
      url: url,
      headers: {
        Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`,
      },
      form: JSON.stringify(orgOptions),
    };

    return this.REST.request(options, this.HttpStatus.CREATED, true);
  }

// http://apidocs.cloudfoundry.org/222/organizations/delete_a_particular_organization.html}
  remove(guid, orgOptions) {
    const url = `${config.cloudUrl}/v2/organizations/${guid}`;
    let qs = {};
    if (orgOptions) qs = orgOptions;
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

// http://apidocs.cloudfoundry.org/222/organizations/list_all_users_for_the_organization.html}
  getUsers(guid, filter) {
    const url = `${config.cloudUrl}/v2/organizations/${guid}/users`;
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

// http://apidocs.cloudfoundry.org/222/organizations/associate_user_with_the_organization.html}
  addUser(guid, userGuid) {
    const url = `${config.cloudUrl}/v2/organizations/${guid}/users/${userGuid}`;

    const options = {
      method: 'PUT',
      url: url,
      headers: {
        Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`,
      },
    };

    return this.REST.request(options, this.HttpStatus.CREATED, true);
  }

// http://apidocs.cloudfoundry.org/222/organizations/remove_user_from_the_organization.html}
  removeUser(guid, userGuid) {
    const url = `${config.cloudUrl}/v2/organizations/${guid}/users/${userGuid}`;

    const options = {
      method: 'DELETE',
      url: url,
      headers: {
        Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`,
      },
    };

    return this.REST.request(options, this.HttpStatus.NO_CONTENT, true);
  }

// http://apidocs.cloudfoundry.org/222/organizations/list_all_managers_for_the_organization.html}
  getManagers(guid, filter) {
    const url = `${config.cloudUrl}/v2/organizations/${guid}/managers`;
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

// http://apidocs.cloudfoundry.org/222/organizations/associate_manager_with_the_organization.html}
  addManager(guid, managerGuid) {
    const url = `${config.cloudUrl}/v2/organizations/${guid}/managers/${managerGuid}`;

    const options = {
      method: 'PUT',
      url: url,
      headers: {
        Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`,
      },
    };

    return this.REST.request(options, this.HttpStatus.CREATED, true);
  }

// http://apidocs.cloudfoundry.org/222/organizations/remove_manager_from_the_the_organization.html}
  removeManager(guid, managerGuid) {
    const url = `${config.cloudUrl}/v2/organizations/${guid}/managers/${managerGuid}`;

    const options = {
      method: 'DELETE',
      url: url,
      headers: {
        Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`,
      },
    };

    return this.REST.request(options, this.HttpStatus.NO_CONTENT, true);
  }

}

module.exports = Organizations;
