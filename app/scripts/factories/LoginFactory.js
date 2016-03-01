"use strict";

/* globals Firebase */

/**
 * @ngdoc function
 * @name webApp.factories:LoginFactory
 * @description
 * Factory que maneja la interacción con la api de facebook para el login,
 * y maneja el usuario de la sesión
 */

(function () {

    angular
        .module("webApp.factories")
        .factory("LoginFactory", LoginFactory);

    LoginFactory.$inject = ["$q", "$log", "$firebaseAuth", "localStorageService", "utils", "UsersFactory", "ENV"];

    function LoginFactory($q, $log, $firebaseAuth, localStorageService, utils, UsersFactory, ENV) {

        var service = {
            facebookLogin: facebookLogin,
            logout: logout,
            isLoggedInUser: isLoggedInUser
        };

        return service;

        /**
         * Loguea un usuario con facebook y guarda en el localStorage los datos del mismo
         * @returns {Promise} una promesa cuando se terminó de recuperar el usuario
         */
        function facebookLogin() {
            var firebaseObject = new Firebase(ENV.apiEndpoint);

            return $q(function (resolve, reject) {
                firebaseObject.authWithOAuthPopup("facebook", function (error, authData) {
                    if (error) {
                        reject(error);
                    } else {
                        UsersFactory.createOrRetrieveUser(authData.facebook).then(function (user) {
                            var facebookId = Object.keys(user)[0],
                                loginUser = user[facebookId];

                            loginUser.facebookId = facebookId;
                            localStorageService.set('loginUser', loginUser);

                            resolve(loginUser);
                        }, function (err) {
                            $log.error("No se pudo recuperar el usuario", err);
                        });
                    }
                });
            });
        }

        function isLoggedInUser() {
            return $q(function (resolve, reject) {
                var loginUser = localStorageService.get('loginUser');
                if (!utils.isEmpty(loginUser)) {
                    resolve(loginUser);
                } else {
                    reject("No se encontró ningún usuario logueado");
                }
            });
        }

        /**
         * Desloguea un usuario, borrando las credenciales en firebase y el localStorage
         */
        function logout() {
            var firebaseObject = new Firebase(ENV.apiEndpoint);
            firebaseObject.unauth();
            //limpia el local storage
            localStorageService.clearAll();
        }

    }

}());
