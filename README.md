
# Overview

Use this library to interact with Predix or other Cloud Foundry clouds.

###Implemented
#####[Cloud Controller](http://apidocs.cloudfoundry.org/)

Apps.js
- [getApps](http://apidocs.cloudfoundry.org/213/apps/list_all_apps.html)
- [add](http://apidocs.cloudfoundry.org/214/apps/creating_an_app.html)
- [update](http://apidocs.cloudfoundry.org/217/apps/updating_an_app.html)
- [stop](http://apidocs.cloudfoundry.org/217/apps/updating_an_app.html)
- [start](http://apidocs.cloudfoundry.org/217/apps/updating_an_app.html)
- [getApp](http://apidocs.cloudfoundry.org/214/apps/retrieve_a_particular_app.html)
- [getSummary](http://apidocs.cloudfoundry.org/214/apps/get_app_summary.html)
- [remove](http://apidocs.cloudfoundry.org/214/apps/delete_a_particular_app.html)
- [getStats](http://apidocs.cloudfoundry.org/214/apps/get_detailed_stats_for_a_started_app.html)
- [associateRoute](http://apidocs.cloudfoundry.org/214/apps/associate_route_with_the_app.html)
- [dissociateRoute](http://apidocs.cloudfoundry.org/214/apps/remove_route_from_the_app.html)
- [upload](http://apidocs.cloudfoundry.org/214/apps/uploads_the_bits_for_an_app.html)
- [uploadFromStream](http://apidocs.cloudfoundry.org/214/apps/uploads_the_bits_for_an_app.html)
- [getInstances](http://apidocs.cloudfoundry.org/215/apps/get_the_instance_information_for_a_started_app.html)
- [getAppRoutse](http://apidocs.cloudfoundry.org/214/apps/list_all_routes_for_the_app.html)
- [getServiceBindings](http://apidocs.cloudfoundry.org/221/apps/list_all_service_bindings_for_the_app.html)
- [removeServiceBindings](http://apidocs.cloudfoundry.org/217/service_bindings/delete_a_particular_service_binding.html)
- [getEnvironmentVariables](http://apidocs.cloudfoundry.org/222/apps/get_the_env_for_an_app.html)
- [restage](http://apidocs.cloudfoundry.org/222/apps/restage_an_app.html)



- []()
- []()
- []()
- []()
- []()
- []()
- []()
- []()
- []()
- []()
- []()
- []()
- []()
- []()
- []()
- []()
- []()


| ****  	| **[UAA](https://github.com/cloudfoundry/uaa)**   	| **Logging & Metrics** 	|
|------------------------ |-----------------------	|------------------------	|
| [Apps](https://doclets.io/IBM-Bluemix/cf-nodejs-client/master#dl-Apps)                    | [Users](https://doclets.io/IBM-Bluemix/cf-nodejs-client/master#dl-UsersUAA)             	    | [Logs](https://doclets.io/IBM-Bluemix/cf-nodejs-client/master#dl-Logs)                   	|
| [Buildpacks](https://doclets.io/IBM-Bluemix/cf-nodejs-client/master#dl-BuildPacks)              |                    	    |                       	|
| [Domains](https://doclets.io/IBM-Bluemix/cf-nodejs-client/master#dl-Domains)                 |                    	    |                       	|
| [Jobs](https://doclets.io/IBM-Bluemix/cf-nodejs-client/master#dl-Jobs)                    |                    	    |                       	|
| [Organizations](https://doclets.io/IBM-Bluemix/cf-nodejs-client/master#dl-Organizations)           |                    	    |                       	|
| [Organizations Quotas](https://doclets.io/IBM-Bluemix/cf-nodejs-client/master#dl-OrganizationsQuota)     |                    	    |                       	|
| [Routes](https://doclets.io/IBM-Bluemix/cf-nodejs-client/master#dl-Routes)                  |                    	    |                       	|
| [Services](https://doclets.io/IBM-Bluemix/cf-nodejs-client/master#dl-Services) | | |
| [Service Bindings](https://doclets.io/IBM-Bluemix/cf-nodejs-client/master#dl-ServiceBindings)        |                    	    |                       	|
| [Service Instances](https://doclets.io/IBM-Bluemix/cf-nodejs-client/master#dl-ServiceInstances) | | |
| [Service Plans](https://doclets.io/IBM-Bluemix/cf-nodejs-client/master#dl-ServicePlans) | | |
| [Spaces](https://doclets.io/IBM-Bluemix/cf-nodejs-client/master#dl-Spaces)                  |                    	    |                       	|
| [Spaces Quotas](https://doclets.io/IBM-Bluemix/cf-nodejs-client/master#dl-SpacesQuota)            |                    	    |                       	|
| [Stacks](https://doclets.io/IBM-Bluemix/cf-nodejs-client/master#dl-Stacks)                  |                    	    |                       	|
| [User provided Services](https://doclets.io/IBM-Bluemix/cf-nodejs-client/master#dl-UserProvidedServices)  |                    	    |                       	|
| [Users](https://doclets.io/IBM-Bluemix/cf-nodejs-client/master#dl-Users)                   |                    	    |                       	|



If something is not implemented and you need it then contact me or raise an issue.


# Getting Started

Look at the integration tests or try this:

```Javascript

const endpoint = 'https://api.system.aws-usw02-pr.ice.predix.io';
const username = 'your-username';
const password = 'your-password';

const CloudController = new (require('cf-script')).CloudController(endpoint);
const UsersUAA = new (require('cf-script')).UsersUAA;
const Apps = new (require('cf-script')).Apps(endpoint);

CloudController.getInfo().then( (result) => {
    UsersUAA.setEndPoint(result.authorization_endpoint);
    return UsersUAA.login(username, password);
}).then( (result) => {
	Apps.setToken(result);
    return Apps.getApps();
}).then( (result) => {
    console.log(result);
}).catch( (reason) => {
    console.error('Error: ' + reason);
});

```

Explore the library and if you like the features, use it on your App:

``` Javascript

npm install cf-client --save

```

# Testing

To run the tests do:
```bash
npm run test -- --USERNAME=<your-username> --PASSWORD=<your-password>
```

**Code coverage:**

``` shell
istanbul cover node_modules/mocha/bin/_mocha -- -R spec

```

# Feature Requests And Issues

[Create an issue](https://github.com/richdost/cf-script/issues)
or email me.

# License

Licensed under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0).

Forked from [IBM-Bluemix/cf-nodejs-client](https://github.com/IBM-Bluemix/cf-nodejs-client) which was in turn forked from [prosociallearnEU/cf-nodejs-client](https://github.com/prosociallearnEU/cf-nodejs-client).

# References

* API Docs: http://apidocs.cloudfoundry.org/
* CF for Beginners: From Zero to Hero http://slides.cf-hero.cloudcredo.io/
