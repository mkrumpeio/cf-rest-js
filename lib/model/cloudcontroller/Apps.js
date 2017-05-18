'use strict';

const CloudControllerBase = require('./CloudControllerBase');
const rest = require('restler');// TODO: Analyze a way to remove this dependency
const fs = require('fs');

var config = require('../../../config');

class Apps extends CloudControllerBase {

// http://apidocs.cloudfoundry.org/213/apps/list_all_apps.html}
  getApps(filter) {
    const url = `${config.cloudUrl}/v2/apps`;
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

// http://apidocs.cloudfoundry.org/214/apps/creating_an_app.html}

  add(appOptions) {

    const url = `${config.cloudUrl}/v2/apps`;
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

// http://apidocs.cloudfoundry.org/217/apps/updating_an_app.html}
  update(appGuid, appOptions) {

    const url = `${config.cloudUrl}/v2/apps/${appGuid}`;
    const options = {
      method: 'PUT',
      url: url,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`,
      },
      form: JSON.stringify(appOptions),
    };

    return this.REST.request(options, this.HttpStatus.CREATED, true);
  }

// http://apidocs.cloudfoundry.org/217/apps/updating_an_app.html}
  stop(appGuid) {

    const appOptions = {
      state: 'STOPPED',
    };

    return this.update(appGuid, appOptions);
  }

// http://apidocs.cloudfoundry.org/217/apps/updating_an_app.html}

  start(appGuid) {

    const appOptions = {
      state: 'STARTED',
    };

    return this.update(appGuid, appOptions);
  }

// http://apidocs.cloudfoundry.org/214/apps/retrieve_a_particular_app.html}
  getApp(guid) {

    const url = `${config.cloudUrl}/v2/apps/${guid}`;
    const options = {
      method: 'GET',
      url: url,
      headers: {
        Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`,
      },
    };

    return this.REST.request(options, this.HttpStatus.OK, true);
  }

// http://apidocs.cloudfoundry.org/214/apps/get_app_summary.html}
  getSummary(appGuid) {

    const url = `${config.cloudUrl}/v2/apps/${appGuid}/summary`;
    const options = {
      method: 'GET',
      url: url,
      headers: {
        Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`,
      },
    };

    return this.REST.request(options, this.HttpStatus.OK, true);
  }

// http://apidocs.cloudfoundry.org/214/apps/delete_a_particular_app.html}
  remove(appGuid) {

    const url = `${config.cloudUrl}/v2/apps/${appGuid}`;
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

// http://apidocs.cloudfoundry.org/214/apps/get_detailed_stats_for_a_started_app.html}
  getStats(appGuid) {

    const url = `${config.cloudUrl}/v2/apps/${appGuid}/stats`;
    const options = {
      method: 'GET',
      url: url,
      headers: {
        Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`,
      },
    };

    return this.REST.request(options, this.HttpStatus.OK, true);
  }

// http://apidocs.cloudfoundry.org/214/apps/associate_route_with_the_app.html}
  associateRoute(appGuid, routeGuid) {

    const url = `${config.cloudUrl}/v2/apps/${appGuid}/routes/${routeGuid}`;
    const options = {
      method: 'PUT',
      url: url,
      headers: {
        Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`,
      },
    };

    return this.REST.request(options, this.HttpStatus.CREATED, true);
  }

// http://apidocs.cloudfoundry.org/214/apps/remove_route_from_the_app.html}
  dissociateRoute(appGuid, routeGuid) {

    const url = `${config.cloudUrl}/v2/apps/${appGuid}/routes/${routeGuid}`;
    const options = {
      method: 'DELETE',
      url: url,
      headers: {
        Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`,
      },
    };

    return this.REST.request(options, this.HttpStatus.OK, true);
  }

    /**
     * Check resources
// http://apidocs.cloudfoundry.org/214/resource_match/list_all_matching_resources.html}
// https://github.com/cloudfoundry/cf-release/issues/761#issuecomment-128386896}
     *
     * You only need to call the resources_match endpoint to figure out the correct value
     * to enter in the resources parameter in the app-bits-upload request
     * if you want to take advantage of the optimization of not uploading already-uploaded bits.
     *
     * @param  {String} token_type          [description]
     * @param  {String} access_token        [description]
     * @param  {JSON} zipResources [description]
     * @return {JSON}                     [description]

    Apps.prototype.checkResources = function (token_type, access_token, zipResources) {
        var url = this.API_URL + "/v2/resource_match";
        var options = {
            method: 'PUT',
            url: url,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': token_type + " " + access_token
            },
            form : JSON.stringify(zipResources)
        };

        return this.REST.request(options, "200", false);
    };
     */

    /**
     * Upload source code
// http://apidocs.cloudfoundry.org/214/apps/uploads_the_bits_for_an_app.html}
     *
     * function File(path, filename, fileSize, encoding, contentType)
     * 'application': rest.file(path, null, fileSizeInBytes, null, 'application/zip')
     *
     * @param  {String} appGuid     [App guid]
     * @param  {String} filePath     [file path to upload]
     * @param  {Boolean} async        [Sync/Async]
     * @return {JSON/String}              [{}/Job information]
     */
  upload(appGuid, filePath, async) {

    const url = `${config.cloudUrl}/v2/apps/${appGuid}/bits`;
    const zipResources = [];
    let asyncFlag = false;
    var stats = null;

    if (typeof async === 'boolean') {
      if (async) asyncFlag = true;
    }
    var options = {
      multipart: true,
      accessToken: this.UAA_TOKEN.access_token,
      query: {
        guid: appGuid,
        async: asyncFlag,
      },
      data: {
        resources: JSON.stringify(zipResources),
      },
    };

    if (typeof filePath === 'string') {
      stats = fs.statSync(filePath);
      options.data.application = rest.file(filePath, null, stats.size, null, 'application/zip');
    }
    else options.data.application = rest.data(null, 'application/zip', filePath.toBuffer());

    return this.REST.upload(url, options, this.HttpStatus.CREATED, false);
  }

    /**
     * Upload source code from a ReadableStream
// http://apidocs.cloudfoundry.org/214/apps/uploads_the_bits_for_an_app.html}
     *
     *
     * @param  {String} appGuid                   [App guid]
     * @param  {stream.ReadableStream} stream     [stream to upload]
     * @param  {Boolean} async                    [Sync/Async]
     * @return {JSON/String}                      [{}/Job information]
     */
  uploadFromStream(appGuid, stream, async) {

    const url = `${config.cloudUrl}/v2/apps/${appGuid}/bits`;
    // const zipResources = [];
    let asyncFlag = false;
    // var stats = null;

    if (typeof async === 'boolean') {
      if (async) asyncFlag = true;
    }
    let options = {
      headers: {
        Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`,
      },
      qs: {
        async: asyncFlag,
      },
    };
    return this.REST.uploadStream(url, options, stream, this.HttpStatus.CREATED, false);
  }

// http://apidocs.cloudfoundry.org/215/apps/get_the_instance_information_for_a_started_app.html}
  getInstances(appGuid) {

    const url = `${config.cloudUrl}/v2/apps/${appGuid}/instances`;
    const options = {
      method: 'GET',
      url: url,
      headers: {
        Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`,
      },
    };

    return this.REST.request(options, this.HttpStatus.OK, true);
  }

// http://apidocs.cloudfoundry.org/214/apps/list_all_routes_for_the_app.html}
  getAppRoutes(appGuid) {

    const url = `${config.cloudUrl}/v2/apps/${appGuid}/routes`;
    const options = {
      method: 'GET',
      url: url,
      headers: {
        Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`,
      },
    };

    return this.REST.request(options, this.HttpStatus.OK, true);
  }

// http://apidocs.cloudfoundry.org/221/apps/list_all_service_bindings_for_the_app.html}
  getServiceBindings(appGuid, filter) {

    const url = `${config.cloudUrl}/v2/apps/${appGuid}/service_bindings`;
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

// http://apidocs.cloudfoundry.org/217/service_bindings/delete_a_particular_service_binding.html}
  removeServiceBindings(appGuid, serviceGindingGuid) {

    const url = `${config.cloudUrl}/v2/apps/${appGuid}/service_bindings/${serviceGindingGuid}`;
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


// http://apidocs.cloudfoundry.org/222/apps/get_the_env_for_an_app.html}
  getEnvironmentVariables(appGuid) {

    const url = `${config.cloudUrl}/v2/apps/${appGuid}/env`;
    const options = {
      method: 'GET',
      url: url,
      headers: {
        Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`,
      },
    };

    return this.REST.request(options, this.HttpStatus.OK, true);
  }

// http://apidocs.cloudfoundry.org/222/apps/restage_an_app.html}
  restage(appGuid) {

    const url = `${config.cloudUrl}/v2/apps/${appGuid}/restage`;
    const options = {
      method: 'POST',
      url: url,
      headers: {
        Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`,
      },
    };

    return this.REST.request(options, this.HttpStatus.CREATED, true);
  }

    /**
     * Downloads the bits for an App
     * http://apidocs.cloudfoundry.org/226/apps/downloads_the_bits_for_an_app.html
     *
     * @param  {String} appGuid     [App guid]
     * @return {Bytes[]}              [description]
    downloadBits (appGuid) {

        const url = `${config.cloudUrl}/v2/apps/${appGuid}/download`;
        const options = {
            method: "GET",
            url: url,
            headers: {
                Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`
            }
        };

        return this.REST.request(options, this.HttpStatus.OK, false);
    }
    */

    /**
     * Downloads the staged droplet for an App
     * http://apidocs.cloudfoundry.org/226/apps/downloads_the_staged_droplet_for_an_app.html
     *
     * @param  {String} appGuid     [App guid]
     * @return {Bytes[]}              [description]
    downloadDroplet (appGuid) {

        const url = `${config.cloudUrl}/v2/apps/${appGuid}/droplet/download`;
        const options = {
            method: "GET",
            url: url,
            headers: {
                Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`
            }
        };

        return this.REST.request(options, this.HttpStatus.OK, false);
    }
    */

    /**
     * Get the content of a path or a file deployed in CF.
     * It is necessary that the app is staged and running
// http://apidocs.cloudfoundry.org/226/files/retrieve_file.html}
     *
     * @param  {String} appGuid [App guid]
     * @param  {String} path    [A relative path of a file or folder]
     * @return {String}         [Content of a path or a file]

    getFile (appGuid, path) {

        let url = `${config.cloudUrl}/v2/apps/${appGuid}/instances/0/files/`;

        if (path) {
            url += path;
        }
        const options = {
            method: "GET",
            url: url,
            headers: {
                Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`
            }
        };

        return this.REST.request(options, this.HttpStatus.OK, false);
    }
    */

}

module.exports = Apps;
