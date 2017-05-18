'use strict';
var config = require('../../../config');

const CloudControllerBase = require('./CloudControllerBase');

class Stacks extends CloudControllerBase {

  constructor(endPoint) {
    super(endPoint);
  }

// http://apidocs.cloudfoundry.org/214/stacks/list_all_stacks.html}
  getStacks() {

    const url = `${config.cloudUrl}/v2/stacks`;
    const options = {
      method: 'GET',
      url: url,
      headers: {
        Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`,
      },
    };

    return this.REST.request(options, this.HttpStatus.OK, true);
  }

}

module.exports = Stacks;
