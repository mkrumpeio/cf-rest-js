
# Overview

Use this library to interact with Predix or other Cloud Foundry clouds.

###Methods



[Cloud Controller](http://apidocs.cloudfoundry.org/)
- setEndpoint
- setToken

*Apps*
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

*CloudController*
- [getInfo](http://apidocs.cloudfoundry.org/214/info/get_info.html)
- [getFeaturedFlags](http://apidocs.cloudfoundry.org/214/feature_flags/get_all_feature_flags.html)
- [getFeaturedFlag](http://apidocs.cloudfoundry.org/214/feature_flags/get_the_diego_docker_feature_flag.html)
- [setFeaturedFlag](http://apidocs.cloudfoundry.org/214/feature_flags/set_a_feature_flag.html)

*Domains*
- [getDomains](http://apidocs.cloudfoundry.org/214/domains_(deprecated)/list_all_domains_(deprecated).html)
- [getSharedDomains](http://apidocs.cloudfoundry.org/214/shared_domains/list_all_shared_domains.html)

*Events*
- [getEvents](http://apidocs.cloudfoundry.org/214/events/list_all_events.html)

*Jobs*
- [getJob](http://apidocs.cloudfoundry.org/214/jobs/retrieve_job_that_is_queued.html)

*Organizations*
- [getOrganizations](http://apidocs.cloudfoundry.org/213/organizations/list_all_organizations.html)
- [getMemoryUsage](http://apidocs.cloudfoundry.org/222/organizations/retrieving_organization_memory_usage.html)
- [getOrganization](http://apidocs.cloudfoundry.org/214/organizations/retrieve_a_particular_organization.html)
- [getSummary](http://apidocs.cloudfoundry.org/222/organizations/get_organization_summary.html)
- [getPrivateDomains](http://apidocs.cloudfoundry.org/214/organizations/list_all_private_domains_for_the_organization.html)
- [add](http://apidocs.cloudfoundry.org/222/organizations/creating_an_organization.html)
- [remove](http://apidocs.cloudfoundry.org/222/organizations/delete_a_particular_organization.html)
- [getUsers](http://apidocs.cloudfoundry.org/222/organizations/list_all_users_for_the_organization.html)
- [addUser](http://apidocs.cloudfoundry.org/222/organizations/associate_user_with_the_organization.html)
- [removeUser](http://apidocs.cloudfoundry.org/222/organizations/remove_user_from_the_organization.html)
- [getManagers](http://apidocs.cloudfoundry.org/222/organizations/list_all_managers_for_the_organization.html)
- [addManager](http://apidocs.cloudfoundry.org/222/organizations/associate_manager_with_the_organization.html)
- [removeManager](http://apidocs.cloudfoundry.org/222/organizations/remove_manager_from_the_the_organization.html)

*OrganizationsQuota*
- [getQuotaDefinitions](http://apidocs.cloudfoundry.org/213/organization_quota_definitions/list_all_organization_quota_definitions.html)
- [getQuotaDefinition](http://apidocs.cloudfoundry.org/213/organization_quota_definitions/retrieve_a_particular_organization_quota_definition.html)
- [add](http://apidocs.cloudfoundry.org/222/organization_quota_definitions/creating_a_organization_quota_definition.html)
- [remove](http://apidocs.cloudfoundry.org/222/organization_quota_definitions/delete_a_particular_organization_quota_definition.html)

*Routes*
- [getRoutes](http://apidocs.cloudfoundry.org/214/routes/list_all_routes.html)
- [getRoute](http://apidocs.cloudfoundry.org/214/routes/retrieve_a_particular_route.html)
- [addRoute](http://apidocs.cloudfoundry.org/213/routes/creating_a_route.html)
- [remove](http://apidocs.cloudfoundry.org/214/routes/delete_a_particular_route.html)
- [exists](http://apidocs.cloudfoundry.org/214/routes/check_a_route_exists.html)

*ServiceBindings*
- [getServiceBindings](http://apidocs.cloudfoundry.org/217/service_bindings/list_all_service_bindings.html)
- [getServiceBinding](http://apidocs.cloudfoundry.org/217/service_bindings/retrieve_a_particular_service_binding.html)
- [associateServiceWithApp](http://apidocs.cloudfoundry.org/217/service_bindings/create_a_service_binding.html)
- [remove](http://apidocs.cloudfoundry.org/217/service_bindings/delete_a_particular_service_binding.html)

*ServiceInstances*
- [getInstances](https://apidocs.cloudfoundry.org/226/service_instances/list_all_service_instances.html)
- [getInstance](https://apidocs.cloudfoundry.org/226/service_instances/retrieve_a_particular_service_instance.html)
- [getInstancePermissions](https://apidocs.cloudfoundry.org/226/service_instances/retrieving_permissions_on_a_service_instance.html)
- [getInstanceBindings] (https://apidocs.cloudfoundry.org/226/service_instances
- [getInstanceRoutes](https://apidocs.cloudfoundry.org/226/service_instances/list_all_routes_for_the_service_instance.html)
- [create](https://apidocs.cloudfoundry.org/226/service_instances/creating_a_service_instance.html)
- [remove](https://apidocs.cloudfoundry.org/226/service_instances/delete_a_service_instance.html)
- [update](https://apidocs.cloudfoundry.org/226/service_instances/update_a_service_instance.html)

*ServicePlans*
- [getServicePlans](https://apidocs.cloudfoundry.org/226/service_plans/list_all_service_plans.html)
- [getServicePlan](https://apidocs.cloudfoundry.org/226/service_plans/retrieve_a_particular_service_plan.html)
- [getServicePlanInstances](https://apidocs.cloudfoundry.org/226/service_plans/list_all_service_instances_for_the_service_plan.html)
- [remove](https://apidocs.cloudfoundry.org/226/service_plans/delete_a_particular_service_plans.html)

*Services*
- [](https://apidocs.cloudfoundry.org/226/services/list_all_services.html)
- [](https://apidocs.cloudfoundry.org/226/services/retrieve_a_particular_service.html)
- [](https://apidocs.cloudfoundry.org/226/services/list_all_service_plans_for_the_service.html)
- [](https://apidocs.cloudfoundry.org/226/services/delete_a_particular_service.html)

*Spaces*
- [getSpaces](http://apidocs.cloudfoundry.org/214/spaces/list_all_spaces.html)
- [getSpace](http://apidocs.cloudfoundry.org/214/spaces/retrieve_a_particular_space.html)
- [getSpaceRoutes](http://apidocs.cloudfoundry.org/214/spaces/list_all_routes_for_the_space.html)
- [getSpaceApps](http://apidocs.cloudfoundry.org/214/spaces/list_all_apps_for_the_space.html)
- [getSpaceServices](http://apidocs.cloudfoundry.org/214/spaces/list_all_services_for_the_space.html)
- [getSpaceServiceInstances](http://apidocs.cloudfoundry.org/214/spaces/list_all_service_instances_for_the_space.html)
- [getSummary](http://apidocs.cloudfoundry.org/222/spaces/get_space_summary.html)
- [getUserRoles](http://apidocs.cloudfoundry.org/222/spaces/retrieving_the_roles_of_all_users_in_the_space.html)
- [add](http://apidocs.cloudfoundry.org/222/spaces/creating_a_space.html)
- [update](http://apidocs.cloudfoundry.org/222/spaces/update_a_space.html)
- [remove](http://apidocs.cloudfoundry.org/222/spaces/delete_a_particular_space.html)
- [getManagers](http://apidocs.cloudfoundry.org/222/organizations/list_all_managers_for_the_organization.html)
- [addManager](http://apidocs.cloudfoundry.org/222/spaces/associate_manager_with_the_space.html)
- [removeManager](http://apidocs.cloudfoundry.org/222/spaces/remove_manager_from_the_space.html)
- [getDevelopers](http://apidocs.cloudfoundry.org/222/organizations/list_all_developers_for_the_organization.html)
- [addDeveloper](http://apidocs.cloudfoundry.org/222/spaces/associate_developer_with_the_space.html)
- [removeDeveloper](http://apidocs.cloudfoundry.org/222/spaces/remove_developer_from_the_space.html)

*SpacesQuota*
- [getQuotaDefinitions](http://apidocs.cloudfoundry.org/214/space_quota_definitions/list_all_space_quota_definitions.html)

*Stacks*
- [getStacks](http://apidocs.cloudfoundry.org/214/stacks/list_all_stacks.html)

*UserProvidedServices*
- [getServices](http://apidocs.cloudfoundry.org/217/user_provided_service_instances/list_all_user_provided_service_instances.html)
- [getService](http://apidocs.cloudfoundry.org/217/user_provided_service_instances/retrieve_a_particular_user_provided_service_instance.html)
- [add](http://apidocs.cloudfoundry.org/217/user_provided_service_instances/creating_a_user_provided_service_instance.html)
- [remove](http://apidocs.cloudfoundry.org/217/user_provided_service_instances/delete_a_particular_user_provided_service_instance.html)
- [getServiceBindings](http://apidocs.cloudfoundry.org/221/user_provided_service_instances/list_all_service_bindings_for_the_user_provided_service_instance.html)

*Users*
- [add](http://apidocs.cloudfoundry.org/222/users/creating_a_user.html)
- [remove](http://apidocs.cloudfoundry.org/222/users/delete_a_particular_user.html)
- [getUsers](http://apidocs.cloudfoundry.org/222/users/list_all_users.html)
- [associateSpace](http://apidocs.cloudfoundry.org/222/users/associate_space_with_the_user.html)
- [associateOrganization](http://apidocs.cloudfoundry.org/222/users/associate_organization_with_the_user.html)

*Metrics
- setEndpoint
- setToken
[Metrics](http://apidocs.cloudfoundry.org/)



*Logs*
- setEndpoint
- setToken
- [getRecent](http://docs.run.pivotal.io/devguide/deploy-apps/streaming-logs.html)

[UAA](http://apidocs.cloudfoundry.org/)
*UsersUaa*
- [add](https://github.com/cloudfoundry/uaa/blob/master/docs/UAA-APIs.rst#create-a-user-post-users)
- [updatePassword](TODO)
- [remove](http://www.simplecloud.info/specs/draft-scim-api-01.html#delete-resource)
- [getUsers](http://www.simplecloud.info/specs/draft-scim-api-01.html#get-resources-ops)
- [login](TODO)
- [refreshToken](TODO)
- [decodeAccessToken](TODO)


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
