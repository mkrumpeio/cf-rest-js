'use strict';

var config = require('../../../config');

const CloudControllerBase = require('./CloudControllerBase');

class CloudController extends CloudControllerBase {

  constructor(endPoint) {
    super(endPoint);
  }

// http://apidocs.cloudfoundry.org/214/info/get_info.html}
  getInfo() {

    const url = `${config.cloudUrl}/v2/info`;
    const options = {
      method: 'GET',
      url: url,
    };

    return this.REST.request(options, this.HttpStatus.OK, true);
  }

// http://apidocs.cloudfoundry.org/214/feature_flags/get_all_feature_flags.html}
  getFeaturedFlags() {

    const url = `${config.cloudUrl}/v2/config/feature_flags`;
    const options = {
      method: 'GET',
      url: url,
      headers: {
        Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`,
      },
    };

    return this.REST.request(options, this.HttpStatus.OK, true);
  }

// http://apidocs.cloudfoundry.org/214/feature_flags/get_the_diego_docker_feature_flag.html}
  getFeaturedFlag(flag) {

    const url = `${config.cloudUrl}/v2/config/feature_flags/${flag}`;
    const options = {
      method: 'GET',
      url: url,
      headers: {
        Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`,
      },
    };

    return this.REST.request(options, this.HttpStatus.OK, true);
  }

// http://apidocs.cloudfoundry.org/214/feature_flags/set_a_feature_flag.html }
  setFeaturedFlag(flag) {

    const url = `${config.cloudUrl}/v2/config/feature_flags/${flag}`;
    const options = {
      method: 'PUT',
      url: url,
      headers: {
        Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`,
      },
    };

    return this.REST.request(options, this.HttpStatus.OK, true);
  }

}

module.exports = CloudController;
