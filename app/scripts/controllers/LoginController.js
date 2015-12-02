"use strict";

/* globals*/

(function () {

    angular
        .module("webApp.controllers")
        .controller("LoginController", LoginController);

    LoginController.$inject = ["$scope", "localStorageService", "LoginFactory", "UsersFactory"];

    function LoginController($scope, localStorageService, LoginFactory, UsersFactory) {

        activate();

        function activate() {
            //Se lee el local storage para ver si hay una sesión activa
            var login = localStorageService.get('login');
            if (login != null) {
                console.log("### Usuario recuperado del local storage!", login);
                $scope.user = login;
            }
        }

        //comprueba si apply ya está en uso
        $scope.safeApply = function (fn) {
            var phase = this.$root.$$phase;
            if (phase == '$apply' || phase == '$digest') {
                if (fn && (typeof (fn) === 'function')) {
                    fn();
                }
            } else {
                this.$apply(fn);
            }
        }

        $scope.facebookLogin = function () {
            LoginFactory.facebookLogin().then(function (user) {
                console.log("### Login OK! ;)", user);

                UsersFactory.createOrRetrieveUser(user.facebook).then(function(user) {
                    console.log("$$$ Okey desde el users factory :)", user);
                }, function(error) {
                    console.log("$$$ Fallo desde el users factory :(");
                });

                $scope.safeApply(function () {
                    $scope.user = user;
                });
            }, function (err) {
                console.log("### Error en el login :/", err);
            });
        }

        $scope.logout = function () {
            LoginFactory.logout();
            console.log("### Logout OK! ;)");
            $scope.safeApply(function () {
                $scope.user = null;
            });
        };
    }

}());
