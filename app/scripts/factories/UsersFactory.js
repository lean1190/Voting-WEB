"use strict";

/* globals Firebase, utils, console */

(function () {

    angular
        .module("webApp.factories")
        .factory("UsersFactory", UsersFactory);

    UsersFactory.$inject = ["$q"];

    function UsersFactory($q) {

        var firebaseConnectionUrl = "https://voting-web.firebaseio.com/Users/";

        var service = {
            createOrRetrieveUser: createOrRetrieveUser
        };

        return service;

        /**
         * Devuelve un firebaseObj con los parámetros encadenados
         * @param {String} params el string con el parámetro a agregar después de la url básica
         */
        function getFirebaseObj(params) {
            // Si no hay parámetros, lo setea en blanco
            params = params || "";

            return new Firebase(firebaseConnectionUrl + params);
        }

        /**
         * En base a un id busca un usuario en la base, si no lo encuentra lo crea
         * @param   {object}  facebookUser un usuario de facebook recuperado desde el authData de Firebase
         * @returns {Promise} una promesa con el usuario recuperado o creado
         */
        function createOrRetrieveUser(facebookUser) {
            var facebookId = facebookUser.id,
                ref = getFirebaseObj(facebookId),
                returnedUser = {};

            return $q(function (resolve, reject) {
                ref.once("value", function (result) {
                    var retrievedUser = result.val();

                    // Si no se encontró el usuario
                    if (utils.isEmpty(retrievedUser)) {
                        console.log("### El usuario no existe en la base, se crea uno nuevo");
                        var newUser = {
                            name: facebookUser.displayName,
                            image: facebookUser.profileImageURL
                        };
                        ref.set(newUser, function (error) {
                            if (error) {
                                reject(error);
                            } else {
                                console.log('### Se guardo el usuario :)');
                                returnedUser[facebookId] = newUser;
                            }
                        });
                    } else {
                        console.log("El usuario ya existe en la base!", retrievedUser);
                        returnedUser[facebookId] = retrievedUser;
                    }

                    resolve(returnedUser);
                });
            });
        }

    }

}());
