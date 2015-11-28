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

        //comprueba si apply ya está en uso
        $scope.safeApply = function(fn) {
          var phase = this.$root.$$phase;
          if(phase == '$apply' || phase == '$digest') {
            if(fn && (typeof(fn) === 'function')) {
              fn();
            }
          } else {
            this.$apply(fn);
          }
        }

        $scope.facebookLogin = function () {
            LoginFactory.facebookLogin().then(function(user) {
                console.log("### Login OK! ;)", user);
                $scope.safeApply(function() {
                    $scope.user = user;
                });
            }, function(err) {
                console.log("### Error en el login :/", err);
            });
        }

        $scope.logout = function () {
            LoginFactory.logout();
            console.log("### Logout OK! ;)");
            $scope.safeApply(function() {
                $scope.user = null;
            });
        };
    }

}());
