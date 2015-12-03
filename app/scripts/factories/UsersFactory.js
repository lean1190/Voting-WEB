"use strict";

/* globals Firebase, moment */

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

        /* ESTAS 2 FUNCIONES HAY Q SACARLAS DE ACA, DSP AGREGO UN MODULITO */

        // Check if the object has a property, if so returns true
        function isEmptyObject(object) {
            for (var property in object) {
                if (object.hasOwnProperty(property)) {
                    return false;
                }
            }

            return true;
        }

        // Check if a variable is empty, null, undefined or blank .
        function isEmpty(variable) {
            return (variable === null || typeof variable === "undefined" || variable === {} || this.isEmptyObject(variable) || variable === "");
        }

        function createOrRetrieveUser(facebookUser) {
            console.log("$$$ llego al createOrRetrieve", facebookUser);
            var ref = getFirebaseObj();

            return new Promise(function (resolve, reject) {
                ref.orderByChild('facebookId').startAt(facebookUser.id).endAt(facebookUser.id).once('value', function (result) {
                    var resultValue = result.val();

                    if (isEmptyObject(resultValue)) {
                        console.log("$$$ El usuario no existe en la base, se crea uno nuevo", resultValue);
                        var syncedUsers = $firebaseArray(ref);

                        syncedUsers.$add({
                            facebookId: facebookUser.id,
                            name: facebookUser.displayName,
                            image: facebookUser.profileImageURL
                        }).then(function (result) {
                            console.log('$$$ Se guardo el usuario :)', result);
                            resolve("$$$ TODO LISO!");
                        }, function (error) {
                            console.error("$$$ Fallo el guardar usuario :(", error);
                            reject("$$$ Se pudrio la momia!");
                        });
                    } else {
                        console.log("$$$ El usuario ya existe en la base!", resultValue);
                        resolve("$$$ TODO LISO!");
                    }
                });
            });
        }
    }

}());
