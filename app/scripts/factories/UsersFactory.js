"use strict";

/* globals Firebase, utils */

(function () {

    angular
        .module("webApp.factories")
        .factory("UsersFactory", UsersFactory);

    UsersFactory.$inject = ["$firebaseArray", "$firebaseObject"];

    function UsersFactory($firebaseArray, $firebaseObject) {

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

        function createOrRetrieveUser(facebookUser) {
            var ref = getFirebaseObj();

            return new Promise(function (resolve, reject) {
                ref.orderByChild('facebookId').startAt(facebookUser.id).endAt(facebookUser.id).once('value', function (result) {
                    var retrievedUser = result.val();

                    if (utils.isEmpty(retrievedUser)) {
                        console.log("$$$ El usuario no existe en la base, se crea uno nuevo");
                        var syncedUsers = $firebaseArray(ref),
                            newUser = {
                                facebookId: facebookUser.id,
                                name: facebookUser.displayName,
                                image: facebookUser.profileImageURL
                            };

                        syncedUsers.$add(newUser).then(function (result) {
                            console.log('$$$ Se guardo el usuario :)');
                            resolve(newUser);
                        }, function (error) {
                            reject(error);
                        });
                    } else {
                        console.log("El usuario ya existe en la base!", retrievedUser);
                        // Esto es una bazofia, pero firebase devuelve un objeto { Kyrk123145: Object }
                        // donde el nro raro es el id que usa y el Object es el objeto posta con los
                        // datos del usuario. Si lo necesitamos ese ID podemos cambiar este return
                        // El código recupera ese Object, el value.
                        var user = retrievedUser[Object.keys(retrievedUser)[0]];
                        resolve(user);
                    }
                });
            });
        }
    }

}());
