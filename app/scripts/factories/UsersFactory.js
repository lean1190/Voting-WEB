"use strict";

/* globals Firebase, utils, console */

(function () {

    angular
        .module("webApp.factories")
        .factory("UsersFactory", UsersFactory);

    UsersFactory.$inject = ["$q", "$firebaseObject", "FirebaseUrl"];

    function UsersFactory($q, $firebaseObject, FirebaseUrl) {

        var firebaseConnectionUrl = FirebaseUrl + "Users/";

        var service = {
            createOrRetrieveUser: createOrRetrieveUser,
            addUser: addUser,
            updateUser: updateUser
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
         * Agrega un usuario nuevo a la base
         * @param   {string} facebookId el id de facebook recuperado desde el authData, que será usado como key en la base
         * @param   {object} newUser    el objeto con las propiedades del usuario
         * @returns {Promise} una promesa cuando el usuario se guardó correctamente
         */
        function addUser(facebookId, newUser) {
            var userRef = getFirebaseObj(facebookId);

            return $q(function (resolve, reject) {
                userRef.set(newUser, function (error) {
                    if (error) {
                        console.log('Ocurrió un error al guardar el usuario =/', error);
                        reject(error);
                    } else {
                        console.log('### Se guardo el usuario :)');
                        resolve();
                    }
                });
            });
        }

        /**
         * Actualiza un usuario de la base
         * @param   {string} facebookId  el id de facebook recuperado desde el authData, el usuario será buscado por este valor
         * @param   {object} updatedUser el objeto con las propiedades actualizadas del usuario.
         *                               Si una propiedad no está presente, no se actualizará
         * @returns {Promise} una promesa cuando se terminen de actualizar los usuarios
         */
        function updateUser(facebookId, updatedUser) {
            var retrievedUser = $firebaseObject(getFirebaseObj(facebookId));

            return retrievedUser.$loaded().then(function() {
                retrievedUser.name = updatedUser.name || retrievedUser.name;
                retrievedUser.image = updatedUser.image || retrievedUser.image;
                retrievedUser.$save();
            });

        }

        /**
         * En base a un id busca un usuario en la base, si no lo encuentra lo crea
         * @param   {object}  facebookUser un usuario de facebook recuperado desde el authData de Firebase
         * @returns {Promise} una promesa con el usuario recuperado o creado
         */
        function createOrRetrieveUser(facebookUser) {
            var facebookId = facebookUser.id,
                facebookDisplayName = facebookUser.displayName,
                facebookProfileImageUrl = facebookUser.profileImageURL,
                ref = getFirebaseObj(facebookId),
                self = service;

            return $q(function (resolve) {
                ref.once("value", function (result) {
                    var retrievedUser = result.val(),
                        userObject = {
                            name: facebookDisplayName,
                            image: facebookProfileImageUrl
                        },
                        returnedUser = {};

                    // Acomoda el objeto que será devuelto
                    returnedUser[facebookId] = userObject;

                    // Si no se encontró el usuario
                    if (utils.isEmpty(retrievedUser)) {
                        console.log("El usuario no existe en la base, se crea uno nuevo");
                        self.addUser(facebookId, userObject);
                    } else {
                        console.log("El usuario ya existe en la base! Se actualizan los datos de nombre e imagen");
                        // Actualiza los valores para el objeto de la base
                        self.updateUser(facebookId, userObject);
                    }

                    resolve(returnedUser);
                });
            });
        }

    }

}());
