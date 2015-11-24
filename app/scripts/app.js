"use strict";

/**
 * @ngdoc overview
 * @name webApp
 * @description
 * # webApp
 *
 * Main module of the application.
 */

(function () {
    angular
        .module("webApp", [
                "ngAnimate",
                "ngCookies",
                "ngResource",
                "ngRoute",
                "ngSanitize",
                "ngTouch",
                "firebase",
                "webApp.controllers",
                "webApp.filters"
        ])
        .config(config);

    // Módulo de controllers
    angular.module("webApp.controllers", []);
    // Módulo de filtros
    angular.module("webApp.filters", []);

    function config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/main.html",
                controller: "PostsController",
                controllerAs: "main"
            })
            .otherwise({
                redirectTo: "/"
            });
    }

}());
