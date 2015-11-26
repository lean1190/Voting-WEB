"use strict";

/* globals*/

(function () {

    angular
        .module("webApp.controllers")
        .controller("LoginController", LoginController);

    LoginController.$inject = ["$scope", "LoginFactory"];

    function LoginController($scope, LoginFactory) {

        activate();

        function activate() {
            // TODO verificar en el localStorage si ya hay una sesion activa!
            // Si la hay, levantar los datos de ahi y meterlos en el scope
        }

        $scope.facebookLogin = function () {
            LoginFactory.facebookLogin().then(function(user) {
                console.log("### Login OK! ;)", user);
                $scope.$apply(function() {
                    $scope.user = user;
                });
            }, function(err) {
                console.log("### Error en el login :/", err);
            });
        };
    }

}());
