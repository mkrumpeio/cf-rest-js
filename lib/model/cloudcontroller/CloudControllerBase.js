'use strict';

const HttpUtils = require('../../utils/HttpUtils');
const HttpStatus = require('../../utils/HttpStatus');

class CloudControllerBase {

  constructor(endPoint) {

    this.API_URL = endPoint;
    this.REST = new HttpUtils();
    this.HttpStatus = HttpStatus;
  }

  setEndPoint(endPoint) {
    console.log('CloudControllerBase.setEndPoint:',endPoint);
    this.API_URL = endPoint;
  }

  setToken(token) {
    console.log('CloudControllerBase.setToken:',token);
    this.UAA_TOKEN = token;
  }

  setCustomRequestObject(requestObj){
    console.log('setCustomRequestObject.setCustomRequestObject:',requestObj);
    this.REST.setCustomRequestObject(requestObj);
  }
}

module.exports = CloudControllerBase;
