"use strict";

/* globals Firebase */

(function () {

    angular
        .module("webApp.factories")
        .factory("FirebaseFactory", FirebaseFactory);

    FirebaseFactory.$inject = ["$firebaseObject, $firebaseAuth"];

    function FirebaseFactory($firebaseObject, $firebaseAuth) {

        var firebaseConnectionUrl = "https://voting-web.firebaseio.com";

        var service = {
            getFirebaseObject: getFirebaseObject,
            getOAuthConnection: getOAuthConnection,
            getPostsFirebaseObject: getPostsFirebaseObject
        };

        return service;

        /**
         * Devuelve un firebaseObj con los parámetros encadenados
         * @param {String} params el string con el parámetro a agregar después de la url básica
         * @returns {Firebase} el objeto para interactuar con firebase
         */
        function getFirebaseObject(params) {
            // Si no hay parámetros, lo setea en blanco
            params = params || "";

            return new Firebase(firebaseConnectionUrl + params);
        }

        /**
         * Devuelve un firebaseAuth para interactuar con la API de OAuth
         * @param {Firebase} un objeto firebase
         * @returns {FirebaseAuth (ponele)} el objeto para interactuar con la api de oauth
         */
        function getOAuthConnection(firebaseObj) {
            // Si no se le pasa ninguno, crea uno nuevo
            firebaseObj = firebaseObj || getFirebaseObject();

            return $firebaseAuth(firebaseObj);
        }

        function getPostsFirebaseObject(params) {
            return getFirebaseObject("/Posts/" + params);
        }

    }

}());
