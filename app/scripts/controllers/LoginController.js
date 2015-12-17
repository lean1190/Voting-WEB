"use strict";

/* globals*/

(function () {

    angular
        .module("webApp.controllers")
        .controller("LoginController", LoginController);

    LoginController.$inject = ["$scope", "localStorageService", "LoginFactory"];

    function LoginController($scope, localStorageService, LoginFactory) {

        activate();

        function activate() {
            //Se lee el local storage para ver si hay una sesión activa
            var loginUser = localStorageService.get('loginUser');
            if (loginUser !== null) {
                console.log("### Usuario recuperado del local storage!", loginUser);
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
                console.log("### Login OK! ;)", user);

                $scope.safeApply(function () {
                    $scope.user = user;
                });
            }, function (err) {
                console.log("### Error logueandose en facebook :/", err);
            });
        };

        $scope.logout = function () {
            LoginFactory.logout();
            console.log("### Logout OK! Nos vemos! :D");
            $scope.safeApply(function () {
                $scope.user = null;
            });
        };
    }

}());
