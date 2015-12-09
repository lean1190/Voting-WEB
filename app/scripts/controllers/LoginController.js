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
                    console.log("Volvio del users factory :)", user);
                }, function(err) {
                    console.log("No se pudo guardar el usuario", err);
                });

                $scope.safeApply(function () {
                    $scope.user = user;
                });
            }, function (err) {
                console.log("### Error logueandose en facebook :/", err);
            });
        }

        $scope.logout = function () {
            LoginFactory.logout();
            console.log("### Logout OK! Nos vemos! :D");
            $scope.safeApply(function () {
                $scope.user = null;
            });
        };
    }

}());
