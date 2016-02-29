/**
 * @ngdoc provider
 * @name mock.posts:LoginFactory
 * @description
 * Mock para el factory que maneja el login y logout de un usuario
 * Simplemente crea una respuesta a un requirimiento como si lo resolviera el factory real.
 */

angular.module("mock.login", []).provider("LoginFactory", function () {
    "use strict";

    this.$get = function ($q) {
        var loginFactory = {};

        loginFactory.login = function() {

        };

        loginFactory.logout = function() {
            return true;
        };

        /*function facebookLogin() {
            var firebaseObject = new Firebase(ENV.apiEndpoint);

            return $q(function (resolve, reject) {
                firebaseObject.authWithOAuthPopup("facebook", function (error, authData) {
                    if (error) {
                        reject(error);
                    } else {
                        UsersFactory.createOrRetrieveUser(authData.facebook).then(function(user) {
                            var facebookId = Object.keys(user)[0],
                                loginUser = user[facebookId];

                            loginUser.facebookId = facebookId;
                            localStorageService.set('loginUser', loginUser);

                            resolve(loginUser);
                        }, function(err) {
                            $log.error("No se pudo recuperar el usuario", err);
                        });
                    }
                });
            });
        }*/

        return loginFactory;
    };
});
