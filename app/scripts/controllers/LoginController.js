"use strict";

/* globals*/

(function () {

    angular
        .module("webApp.controllers")
        .controller("LoginController", LoginController);

    LoginController.$inject = ["$scope", "LoginFactory", "localStorageService"];

    function LoginController($scope, LoginFactory, localStorageService) {

        activate();

        function activate() {
            //Se lee el local storage para ver si hay una sesión activa
            var login=localStorageService.get('login');
            if(login!=null){
                $scope.user=login;
            }
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
