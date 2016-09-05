(function(){
	'use strict';

	var application;

	application = angular.module("atividade",[
    'ngRoute',
    'restangular'
  ]);

	application.config(['$routeProvider','$locationProvider',
	  function($routeProvider, $locationProvider) {
	    $routeProvider
	      .when('/', {
	        templateUrl: "partials/index.html",
	        controller : "IndexController",
            controllerAs: "index"
	        })
	      .otherwise({
	        redirectTo : '/'
        });
	  }]);

  application.config(function(RestangularProvider){
    RestangularProvider.setBaseUrl("http://api.openweathermap.org/data/");
    RestangularProvider.setDefaultRequestParams('get', {appid: "f8546ab984a4ad0c1a03876375c87951"});
  });

})();