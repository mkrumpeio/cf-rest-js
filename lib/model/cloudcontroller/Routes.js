'use strict';
var config = require('../../../config');

const CloudControllerBase = require('./CloudControllerBase');

class Routes extends CloudControllerBase {

  constructor(endPoint) {
    super(endPoint);
  }

// http://apidocs.cloudfoundry.org/214/routes/list_all_routes.html}
// /v2/routes?order-direction=asc&page=2&results-per-page=50
//   qs: {
//     page: page,
//     'results-per-page': 50
//       }
  getRoutes(filter) {

    const url = `${config.cloudUrl}/v2/routes`;
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

// http://apidocs.cloudfoundry.org/214/routes/retrieve_a_particular_route.html}
  getRoute(guid) {

    const url = `${config.cloudUrl}/v2/routes/${guid}`;
    const options = {
      method: 'GET',
      url: url,
      headers: {
        Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`,
      },
    };

    return this.REST.request(options, this.HttpStatus.OK, true);
  }

// http://apidocs.cloudfoundry.org/213/routes/creating_a_route.html}
  add(routeOptions) {

    const url = `${config.cloudUrl}/v2/routes`;
    const options = {
      method: 'POST',
      url: url,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`,
      },
      form: JSON.stringify(routeOptions),
    };

    return this.REST.request(options, this.HttpStatus.CREATED, true);
  }

// http://apidocs.cloudfoundry.org/214/routes/delete_a_particular_route.html}
  remove(guid) {

    const url = `${config.cloudUrl}/v2/routes/${guid}`;
    const options = {
      method: 'DELETE',
      url: url,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`,
      },
    };

    return this.REST.request(options, this.HttpStatus.NO_CONTENT, false);
  }

// http://apidocs.cloudfoundry.org/214/routes/check_a_route_exists.html}
  exists(domainGuid, hostname) {
    const url = `${config.cloudUrl}/v2/routes/reserved/domain/${domainGuid}/host/${hostname}`;
    const options = {
      method: 'GET',
      url: url,
      headers: {
        Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`,
      },
    };

    return this.REST.request(options, this.HttpStatus.NO_CONTENT, false);
  }

}

module.exports = Routes;
