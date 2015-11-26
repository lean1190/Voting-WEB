"use strict";

/* globals Firebase */

(function () {

    angular
        .module("webApp.factories")
        .factory("LoginFactory", LoginFactory);

    LoginFactory.$inject = ["$firebaseAuth"];

    function LoginFactory($firebaseAuth) {

        var service = {
            facebookLogin: facebookLogin
        };

        return service;

        function facebookLogin() {
            var firebaseObject = new Firebase("https://voting-web.firebaseio.com"),
                authConnection = $firebaseAuth(firebaseObject);

            return new Promise(function (resolve, reject) {
                firebaseObject.authWithOAuthPopup("facebook", function (error) {
                    if (error) {
                        reject(error);
                    }
                });

                authConnection.$onAuth(function (authData) {
                    resolve(authData);
                });
            });
        }
    }

}());
