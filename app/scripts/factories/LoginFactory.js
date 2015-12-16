"use strict";

/* globals Firebase */

(function () {

    angular
        .module("webApp.factories")
        .factory("LoginFactory", LoginFactory);

    LoginFactory.$inject = ["$firebaseAuth", "localStorageService", "UsersFactory"];

    function LoginFactory($firebaseAuth, localStorageService, UsersFactory) {

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
                            // El evento basura este se ejecuta tanto en el login como en el logout
                            // Cuando entra por logout, authData tiene null, hay que verificar eso
                            if(authData) {
                                UsersFactory.createOrRetrieveUser(authData.facebook).then(function(user) {
                                    var facebookId = Object.keys(user)[0],
                                        loginUser = user[facebookId];

                                    localStorageService.set('login', loginUser);
                                    localStorageService.set('loginId', facebookId);

                                    resolve(loginUser);
                                }, function(err) {
                                    console.log("No se pudo recuperar el usuario", err);
                                });
                            }
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
