"use strict";

/**
 * @ngdoc overview
 * @name webApp
 * @description
 * Módulo principal de la aplicación, donde se inicializan los componentes
 * y se configuran las rutas de las vistas y controladores
 */

(function () {
    angular
        .module("webApp", [
                "config",
                "ngAnimate",
                "ngCookies",
                "ngResource",
                "ngRoute",
                "ngSanitize",
                "ngTouch",
                "ngMaterial",
                "firebase",
                "LocalStorageModule",
                "webApp.factories",
                "webApp.controllers",
                "webApp.filters",
                "webApp.directives",
                "webApp.utils",
                "angularUtils.directives.dirPagination",
                "infinite-scroll"
        ])
        .config(config);


    // Módulo de factories
    angular.module("webApp.factories", []);

    // Módulo de controllers
    angular.module("webApp.controllers", []);

    // Módulo de filtros
    angular.module("webApp.filters", []);

    // Módulo de directivas
    // Link con ejemplos de uso piola: http://www.sitepoint.com/practical-guide-angularjs-directives/
    angular.module("webApp.directives", []);

    // Módulo de utilidades
    angular.module("webApp.utils", []);

    /**
     * Configuración de las rutas de la aplicación
     * @param {ngRoute} $routeProvider el router de angular
     */
    function config($routeProvider, localStorageServiceProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/main.html",
                controller: "PostsController",
                controllerAs: "main"
            })
            .otherwise({
                redirectTo: "/"
            });

        //local storage
        localStorageServiceProvider.setPrefix('webAppStorage');

        //*******************************************
        //código por si queremos usar la Facebook SDK
        //*******************************************
        /*window.fbAsyncInit = function() {
          FB.init({
            appId      : '393521850855843',
            xfbml      : true,
            version    : 'v2.5'
          });
        };

        (function(d, s, id){
           var js, fjs = d.getElementsByTagName(s)[0];
           if (d.getElementById(id)) {return;}
           js = d.createElement(s); js.id = id;
           js.src = "//connect.facebook.net/en_US/sdk.js";
           fjs.parentNode.insertBefore(js, fjs);
         }(document, 'script', 'facebook-jssdk'));*/

    }

}());
