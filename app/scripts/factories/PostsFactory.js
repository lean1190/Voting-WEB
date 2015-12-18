"use strict";

/* globals Firebase, moment */

(function () {

    angular
        .module("webApp.factories")
        .factory("PostsFactory", PostsFactory);

    PostsFactory.$inject = ["$q", "$firebaseArray", "$firebaseObject", "localStorageService", "FirebaseUrl"];

    function PostsFactory($q, $firebaseArray, $firebaseObject, localStorageService, FirebaseUrl) {

        var firebaseConnectionUrl = FirebaseUrl + "Posts/",
            loginUser = localStorageService.get('loginUser');

        var service = {
            findAllPosts: findAllPosts,
            findPostsForUser: findPostsForUser,
            addPost: addPost,
            addLike: addLike,
            deletePost: deletePost,
            markDone: markDone,
            markNotDone: markNotDone
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
         * Cambia el estado DONE de un post según lo que se pase por parámetro
         * @param {Integer} postId el id del post a cambiar el valor de DONE
         * @param {Boolean} done   el valor que tomará el campo DONE
         * @returns {Promise} una promesa
         */
        function setDoneStatus(postId, done) {
            // traigo el post a sumar 1 like
            var retrievedPost = $firebaseObject(getFirebaseObj(postId));
            // hago el update (loaded() + save())
            return retrievedPost.$loaded().then(function () {
                retrievedPost.done = done;
                retrievedPost.$save();
            });
        }

        /**
         * Devuelve todos los posts en un arreglo sincronizado
         * @returns {Promise} una promesa con el arreglo sincronizado de posts
         */
        function findAllPosts() {
            return $q(function (resolve) {
                var syncedPosts = $firebaseArray(getFirebaseObj());

                resolve(syncedPosts);
            });
        }

        /**
         * Devuelve todos los posts para un determinado usuario en un arreglo sincronizado
         * @returns {Promise} una promesa con el arreglo sincronizado de posts
         */
        function findPostsForUser(username) {
            return $q(function (resolve) {
                var syncedPosts = $firebaseArray(getFirebaseObj().startAt(username).endAt(username));

                resolve(syncedPosts);
            });
        }

        /**
         * Crea un post y lo persiste
         * @param   {String} title el título del post
         * @param   {String} content el cuerpo del post
         * @param   {String} owner el id del creador del post
         * @returns {Promise} una promesa cuando el post se guardó
         */
        function addPost(title, content, owner) {
            var syncedPosts = $firebaseArray(getFirebaseObj());

            return syncedPosts.$add({
                title: title,
                post: content,
                owner: owner,
                done: false,
                likes: 0,
                timestamp: moment().format() // Now!
            });
        }

        /**
         * Agrega un like en un post
         * @param   {Integer} postId el id del post al que se le va a sumar el like
         * @returns {Promise} una promesa cuando al post se le sumó 1 like
         */
        function addLike(postId) {
            // traigo el post a sumar 1 like
            var retrievedPost = $firebaseObject(getFirebaseObj(postId));
            // hago el update (loaded() + save())
            return retrievedPost.$loaded().then(function () {
                retrievedPost.likes = retrievedPost.likes + 1;
                retrievedPost.$save();
            });
        }

        /**
         * Elimina físicamente un post
         * @param   {Integer} postId el id del post que se va a eliminar
         * @param   {String} postOwner el id del usuario creador del post
         * @returns {Promise} una promesa cuando al post se borró
         */
        function deletePost(postId, postOwner) {
            // TODO ver si hay alguna forma de sacar esta validación de todos los métodos
            // algo así como un aspecto, o un @CheckUser o como joraca sea, pero para
            // no tener que escribir N veces lo mismo
            if (postOwner === loginUser.facebookId) {
                //traigo el post a eliminar
                var retrievedPost = $firebaseObject(getFirebaseObj(postId));
                //elimino post
                return retrievedPost.$remove();
            }
        }

        /**
         * Cambia el estado DONE de un post a true
         * @param {Integer} postId el id del post a cambiar el valor de DONE
         * @param   {String} postOwner el id del usuario creador del post
         * @returns {Promise} una promesa cuando se actualizó el valor
         */
        function markDone(postId, postOwner) {
            if (postOwner === loginUser.facebookId) {
                return setDoneStatus(postId, true);
            }
        }

        /**
         * Cambia el estado DONE de un post a false
         * @param {Integer} postId el id del post a cambiar el valor de DONE
         * @param   {String} postOwner el id del usuario creador del post
         * @returns {Promise} una promesa cuando se actualizó el valor
         */
        function markNotDone(postId, postOwner) {
            if (postOwner === loginUser.facebookId) {
                return setDoneStatus(postId, false);
            }
        }
    }

}());
