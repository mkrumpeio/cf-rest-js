'use strict';

    // TODO test this better before publishing - not sure if this really tests

class BuildPacks {


  constructor() {
    this.buildpackMap = {};
    this.buildpackMap.static = 'https://github.com/cloudfoundry/staticfile-buildpack';
    this.buildpackMap.nodejs = 'https://github.com/cloudfoundry/nodejs-buildpack';
    this.buildpackMap.java = 'https://github.com/cloudfoundry/java-buildpack';
    this.buildpackMap.php = 'https://github.com/cloudfoundry/php-buildpack';
    this.buildpackMap.python = 'https://github.com/cloudfoundry/python-buildpack';
  }

    /**
     * Returns the address to use a buildpack
     * @param  {String} key [Buildpack key]
     * @return {String}     [Address about selected buildpack]
     * @throws {Error} This exception is throwed if the key is unknown
     */
  get(key) {

    if (this.buildpackMap[key]) return this.buildpackMap[key];
    throw new Error('This Buildpack is not supported');
  }

}

module.exports = BuildPacks;
