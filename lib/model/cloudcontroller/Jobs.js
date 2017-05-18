'use strict';
var config = require('../../../config');

const CloudControllerBase = require('./CloudControllerBase');

class Jobs extends CloudControllerBase {

  constructor(endPoint) {
    super(endPoint);
  }

// http://apidocs.cloudfoundry.org/214/jobs/retrieve_job_that_is_queued.html}
  getJob(guid) {

    const url = `${config.cloudUrl}/v2/jobs/${guid}`;
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

module.exports = Jobs;
