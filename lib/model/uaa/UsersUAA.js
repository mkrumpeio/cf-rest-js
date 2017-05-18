'use strict';

const HttpUtils = require('../../utils/HttpUtils');
const HttpStatus = require('../../utils/HttpStatus');

class UsersUAA {

  constructor(endPoint) {
    this.UAA_API_URL = endPoint;
    this.REST = new HttpUtils();
    this.HttpStatus = HttpStatus;
  }

  setEndPoint(endPoint) {
    console.log('UsersUAA.setEndPoint:',endPoint);
    this.UAA_API_URL = endPoint;
  }

  setToken(token) {
    console.log('UsersUAA.setToken:',token);
    this.UAA_TOKEN = token;
  }

// https://github.com/cloudfoundry/uaa/blob/master/docs/UAA-APIs.rst#create-a-user-post-users}
// http://www.simplecloud.info/specs/draft-scim-api-01.html#create-resource}
  add(uaaOptions) {

    const url = `${this.UAA_API_URL}/Users`;
    const options = {
      method: 'POST',
      url: url,
      headers: {
        Accept: 'application/json',
        Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`,
      },
      json: uaaOptions,
    };

    return this.REST.request(options, this.HttpStatus.CREATED, false);
  }

// https://github.com/cloudfoundry/uaa/blob/master/docs/UAA-APIs.rst#create-a-user-post-users}
// http://www.simplecloud.info/specs/draft-scim-api-01.html#create-resource}
  updatePassword(uaaGuid, uaaOptions) {

    const url = `${this.UAA_API_URL}/Users/${uaaGuid}/password`;
    const options = {
      method: 'PUT',
      url: url,
      headers: {
        Accept: 'application/json',
        Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`,
      },
      json: uaaOptions,
    };

    return this.REST.request(options, this.HttpStatus.OK, false);
  }

// http://www.simplecloud.info/specs/draft-scim-api-01.html#delete-resource}
  remove(uaaGuid) {

    const url = `${this.UAA_API_URL}/Users/${uaaGuid}`;
    const options = {
      method: 'DELETE',
      url: url,
      headers: {
        Accept: 'application/json',
        Authorization: `${this.UAA_TOKEN.token_type} ${this.UAA_TOKEN.access_token}`,
      },
    };

    return this.REST.request(options, this.HttpStatus.OK, false);
  }

// http://www.simplecloud.info/specs/draft-scim-api-01.html#get-resources-ops}
  getUsers(searchOptions) {

    let url = `${this.UAA_API_URL}/Users`;

    if (searchOptions) {
      url += searchOptions;
    }
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

  login(username, password) {

    const url = `${this.UAA_API_URL}/oauth/token`;
    let options = {
      method: 'POST',
      url: url,
      headers: {
        Authorization: 'Basic Y2Y6',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    if (password !== undefined) {
      options.form = {
        grant_type: 'password',
        client_id: 'cf',
        username: username,
        password: password,
      };
    }
    else {
      options.form = {
        grant_type: 'password',
        client_id: 'cf',
        passcode: username,
      };
    }

    return this.REST.request(options, this.HttpStatus.OK, true);
  }

  refreshToken() {

    const url = `${this.UAA_API_URL}/oauth/token`;
    const options = {
      method: 'POST',
      url: url,
      headers: {
        Accept: 'application/json',
        Authorization: 'Basic Y2Y6',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      form: {
        grant_type: 'refresh_token',
        refresh_token: this.UAA_TOKEN.refresh_token,
      },
    };

    return this.REST.request(options, this.HttpStatus.OK, true);
  }

  decodeAccessToken(accessToken) {
    var tokenString;
    if (typeof accessToken !== 'string') accessToken = accessToken.access_token;
    var bearerTypeAndToken = accessToken.split(' ');
    if (bearerTypeAndToken.length === 2) tokenString = bearerTypeAndToken[1];
    else if (bearerTypeAndToken.length === 1) tokenString = bearerTypeAndToken[0];
    else throw new Error('Invalid token format');

    var tokenParts = tokenString.split('.');
    if (tokenParts.length !== 3) {
      throw new Error('Invalid token format');
    }

    var encodedTokenInfo = tokenParts[1];
    var tokenInfo = {};

    try {
      var buf = new Buffer(encodedTokenInfo, 'base64');
      tokenInfo = JSON.parse(buf.toString('utf8'));
    }
    catch (e) {
      console.log(e);
      throw new Error('Invalid token format');
    }

    return tokenInfo;
  }

}

module.exports = UsersUAA;
