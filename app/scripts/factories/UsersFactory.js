"use strict";

/* globals Firebase, utils */

(function () {

    angular
        .module("webApp.factories")
        .factory("UsersFactory", UsersFactory);

    UsersFactory.$inject = ["$firebaseArray", "$firebaseObject"];

    function UsersFactory($firebaseArray, $firebaseObject) {

        var firebaseConnectionUrl = "https://voting-web.firebaseio.com/Users";

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
            var ref = getFirebaseObj(facebookUser.id),
                facebookId = facebookUser.id;

            return new Promise(function (resolve, reject) {
                //ref.orderByChild('facebookId').startAt(facebookUser.id).endAt(facebookUser.id).once('value', function (result) {
                //var retrievedUser = result.val();
                //var retrievedUser = ref.child(facebookUser.id);

                ref.once("value", function (snap) {
                    console.log("q joraca vino", snap.val());
                    resolve({
                        "1123126871": {
                            name: "lean",
                            image: "http://kjjlks.com"
                        }
                    });
                });

                if (utils.isEmpty(retrievedUser)) {
                    console.log("$$$ El usuario no existe en la base, se crea uno nuevo");
                    var syncedUsers = $firebaseArray(ref),
                        newUser = {
                            name: facebookUser.displayName,
                            image: facebookUser.profileImageURL
                        };

                    ref.child(facebookId).set(newUser, function (error) {
                        if (error) {
                            reject(error);
                        } else {
                            console.log('$$$ Se guardo el usuario :)');
                            resolve({
                                facebookId: newUser
                            });
                        }
                    });

                } else {
                    console.log("El usuario ya existe en la base!", retrievedUser);
                    resolve({ facebookId : retrievedUser });
                }
                //});
            });
        }
    }

}());
