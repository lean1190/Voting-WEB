"use strict";

/**
 * @ngdoc function
 * @name webApp.controller:LoginController
 * @description
 * Controlador que maneja el login y la sesión de usuario
 */

(function () {

    angular
        .module("webApp.controllers")
        .controller("LoginController", LoginController);

    LoginController.$inject = ["$scope", "$log", "localStorageService", "LoginFactory"];

    function LoginController($scope, $log, localStorageService, LoginFactory) {

        activate();

        function activate() {
            //Se lee el local storage para ver si hay una sesión activa
            var loginUser = localStorageService.get('loginUser');
            if (loginUser !== null) {
                $scope.user = loginUser;
            }
        }

        //comprueba si apply ya está en uso
        $scope.safeApply = function (fn) {
            var phase = this.$root.$$phase;
            if (phase === '$apply' || phase === '$digest') {
                if (fn && (typeof (fn) === 'function')) {
                    fn();
                }
            } else {
                this.$apply(fn);
            }
        };

        $scope.facebookLogin = function () {
            LoginFactory.facebookLogin().then(function (user) {
                $log.info("Conexión con facebook OK!");

                $scope.safeApply(function () {
                    $scope.user = user;
                });
            }, function (err) {
                $log.error("Error conectando a facebook", err);
            });
        };

        $scope.logout = function () {
            LoginFactory.logout();
            $log.log("Logout OK! Nos vemos! :D");
            $scope.safeApply(function () {
                $scope.user = null;
            });
        };
    }

}());
