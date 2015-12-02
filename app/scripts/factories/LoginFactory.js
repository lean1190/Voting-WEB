"use strict";

/* globals Firebase */

(function () {

    angular
        .module("webApp.factories")
        .factory("LoginFactory", LoginFactory);

    LoginFactory.$inject = ["$firebaseAuth", "localStorageService"];

    function LoginFactory($firebaseAuth, localStorageService) {

        var service = {
            facebookLogin: facebookLogin,
            logout: logout
        };

        return service;

        function facebookLogin() {
            var firebaseObject = new Firebase("https://voting-web.firebaseio.com"),
                authConnection = $firebaseAuth(firebaseObject);

            return new Promise(function (resolve, reject) {
                firebaseObject.authWithOAuthPopup("facebook", function (error) {
                    if (error) {
                        reject(error);
                    } else {
                        authConnection.$onAuth(function (authData) {
                            //Se escribe la sesión en el local storage
                            localStorageService.set('login', authData);
                            resolve(authData);
                        });
                    }
                });
            });
        }

        function logout() {
            var firebaseObject = new Firebase("https://voting-web.firebaseio.com");
            firebaseObject.unauth();
            //limpia el local storage
            localStorageService.clearAll();
        }
    }

}());
