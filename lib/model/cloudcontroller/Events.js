'use strict';
var config = require('../../../config');

const CloudControllerBase = require('./CloudControllerBase');

class Events extends CloudControllerBase {

  constructor(endPoint) {
    super(endPoint);
  }

// http://apidocs.cloudfoundry.org/214/events/list_all_events.html}
  getEvents(filter) {

    const url = `${config.cloudUrl}/v2/events`;
    let qs = {};

    if (filter) qs = filter;
    const options = {
      method: 'GET',
      url: url,
      headers: {
        Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`,
      },
      qs: qs,
      useQuerystring: true,
    };

    return this.REST.request(options, this.HttpStatus.OK, true);
  }

}

module.exports = Events;
