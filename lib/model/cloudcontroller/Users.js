'use strict';
var config = require('../../../config');

const CloudControllerBase = require('./CloudControllerBase');

class Users extends CloudControllerBase {

  constructor(endPoint) {
    super(endPoint);
  }

// http://apidocs.cloudfoundry.org/222/users/creating_a_user.html}
  add(userOptions) {

    const url = `${config.cloudUrl}/v2/users`;
    const options = {
      method: 'POST',
      url: url,
      headers: {
        Accept: 'application/json',
        Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`,
      },
      form: JSON.stringify(userOptions),
    };

    return this.REST.request(options, this.HttpStatus.CREATED, true);
  }

// http://apidocs.cloudfoundry.org/222/users/delete_a_particular_user.html}
  remove(guid) {

    const url = `${config.cloudUrl}/v2/users/${guid}`;
    const options = {
      method: 'DELETE',
      url: url,
      headers: {
        Accept: 'application/json',
        Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`,
      },
    };

    return this.REST.request(options, this.HttpStatus.NO_CONTENT, false);
  }

// http://apidocs.cloudfoundry.org/222/users/list_all_users.html}
  getUsers() {

    const url = `${config.cloudUrl}/v2/users`;
    const options = {
      method: 'GET',
      url: url,
      headers: {
        Accept: 'application/json',
        Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`,
      },
    };

    return this.REST.request(options, this.HttpStatus.OK, true);
  }

// http://apidocs.cloudfoundry.org/222/users/associate_space_with_the_user.html}
  associateSpace(userGuid, spaceGuid) {

    const url = `${config.cloudUrl}/v2/users/${userGuid}/spaces/${spaceGuid}`;
    const options = {
      method: 'PUT',
      url: url,
      headers: {
        Accept: 'application/json',
        Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`,
      },
    };

    return this.REST.request(options, this.HttpStatus.CREATED, true);
  }

// http://apidocs.cloudfoundry.org/222/users/associate_organization_with_the_user.html}
  associateOrganization(userGuid, orgGuid) {

    const url = `${config.cloudUrl}/v2/users/${userGuid}/organizations/${orgGuid}`;
    const options = {
      method: 'PUT',
      url: url,
      headers: {
        Accept: 'application/json',
        Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`,
      },
    };

    return this.REST.request(options, this.HttpStatus.CREATED, true);
  }

}

module.exports = Users;
