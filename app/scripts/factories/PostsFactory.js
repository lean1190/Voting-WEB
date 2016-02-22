"use strict";

/* globals Firebase, utils, moment */

/**
 * @ngdoc function
 * @name webApp.factories:PostsFactory
 * @description
 * Factory que maneja las operaciones CRUD sobre Posts
 */

(function () {

    angular
        .module("webApp.factories")
        .factory("PostsFactory", PostsFactory);

    PostsFactory.$inject = ["$q", "$firebaseArray", "$firebaseObject", "localStorageService", "ENV"];

    function PostsFactory($q, $firebaseArray, $firebaseObject, localStorageService, ENV) {

        var firebaseConnectionUrl = ENV.apiEndpoint + "Posts/";

        var service = {
            findAllPosts: findAllPosts,
            findPostsByCategory: findPostsByCategory,
            findPostsForUser: findPostsForUser,
            addPost: addPost,
            addLike: addLike,
            deletePost: deletePost,
            markDone: markDone,
            markNotDone: markNotDone,
            hidePost: hidePost,
            hideOldDonePosts: hideOldDonePosts
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
         * Devuelve el usuario logueado
         * No sirve guardarlo en una variable porque se evalúa una sola vez,
         * sólo cuando se instancia el factory, si no recuperó el valor, queda en null
         * @returns {object} el usuario logueado o false si no se encuentra
         */
        function getLoginUser() {
            var loginUser = localStorageService.get('loginUser');
            if (loginUser === null) {
                loginUser = false;
            }

            return loginUser;
        }

        /**
         * Cambia el estado DONE de un post según lo que se pase por parámetro
         * @param {Integer} postId el id del post a cambiar el valor de DONE
         * @param {Boolean} done   el valor que tomará el campo DONE
         * @returns {Promise} una promesa cuando se guardaron los cambios en el post
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
         * Llena cada post con los datos del owner
         * @param   {Array}   syncedPosts el arreglo de posts sincronizados
         * @returns {Promise} una promesa cuando se procesaron todos los posts
         */
        function fillUserProperties(syncedPosts) {
            return syncedPosts.$loaded().then(function () {
                angular.forEach(syncedPosts, function (currentPost) {
                    var ownerRef = new Firebase(ENV.apiEndpoint + "Users/" + currentPost.owner);
                    $firebaseObject(ownerRef);
                    ownerRef.once("value", function (ownerResult) {
                        currentPost.photo = ownerResult.val().image;
                    });
                });
            });
        }

        /**
         * Devuelve todos los posts en un arreglo sincronizado
         * @returns {Promise} una promesa con el arreglo sincronizado de posts
         */
        function findAllPosts() {
            return $q(function (resolve) {
                var syncedPosts = $firebaseArray(getFirebaseObj());

                fillUserProperties(syncedPosts).then( function() {
                    resolve(syncedPosts);
                });
            });
        }

        /**
         * Devuelve todos los posts por categoría en un arreglo sincronizado
         * @param   {String} category el nombre de la categoría de los posts a recuperar
         * @returns {Promise} una promesa con el arreglo sincronizado de posts
         */
        function findPostsByCategory(category) {
            return $q(function (resolve) {
                var syncedPosts = $firebaseArray(getFirebaseObj()
                    .orderByChild("category")
                    .startAt(category)
                    .endAt(category)
                );

                fillUserProperties(syncedPosts).then( function() {
                    resolve(syncedPosts);
                });
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
         * @param   {String} category la categoría del post
         * @param   {String} owner el id del creador del post
         * @returns {Promise} una promesa cuando el post se guardó
         */
        function addPost(title, content, category, owner) {
            var syncedPosts = $firebaseArray(getFirebaseObj());

            return syncedPosts.$add({
                title: title,
                post: content,
                category: category,
                owner: owner,
                done: false,
                show: true,
                likes: 0,
                whoLikesMe: false, // No se puede guardar un objeto vacío
                timestamp: moment().format(), // Now!
                photo: getLoginUser().image
            });
        }

        /**
         * Guarda el like en la base
         * @param {object} retrievedPost el $firebaseObject que referencia al post
         * @param {string} userId el id del usuario que le dio el like
         */
        function saveLike(retrievedPost, userId) {
            retrievedPost.whoLikesMe[userId.hashCode()] = userId;

            retrievedPost.likes = retrievedPost.likes + 1;
            retrievedPost.$save();
        }

        /**
         * Agrega un like en un post
         * @param   {Integer} postId el id del post al que se le va a sumar el like
         * @returns {Promise} una promesa cuando al post se le sumó 1 like
         */
        function addLike(postId) {
            // traigo el post a sumar 1 like
            var retrievedPost = $firebaseObject(getFirebaseObj(postId)),
                userId = getLoginUser().facebookId,
                userIdHash = userId.hashCode();

            return retrievedPost.$loaded().then(function () {
                // El post ya tiene algún like
                if (retrievedPost.whoLikesMe !== false) {
                    // Si el usuario actual no está entre los usuarios que pusieron like
                    var likeUserRef = getFirebaseObj(postId + "/whoLikesMe/" + userIdHash);
                    likeUserRef.once("value", function (result) {
                        var userIdResult = result.val();
                        // Si no se encontró una referencia al usuario dentro de los usuarios que dieron like
                        if (utils.isEmpty(userIdResult)) {
                            saveLike(retrievedPost, userId);
                        }
                    });
                } else { // Todavía no tiene ningún like
                    retrievedPost.whoLikesMe = {};
                    saveLike(retrievedPost, userId);
                }
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
            if (postOwner === getLoginUser().facebookId) {
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
            if (postOwner === getLoginUser().facebookId) {
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
            if (postOwner === getLoginUser().facebookId) {
                return setDoneStatus(postId, false);
            }
        }

        /**
         * Cambia el estado de la propiedad show a false, por lo que el post
         * no se mostrará en la vista principal
         * @param {Integer} postId el id del post a ocultar
         */
        function hidePost(postId) {
            var retrievedPost = $firebaseObject(getFirebaseObj(postId));

            return retrievedPost.$loaded().then(function () {
                retrievedPost.show = false;
                retrievedPost.$save();
            });
        }

        /**
         * Oculta los posts con más de cierta cantidad de días que se pasa por parámetro
         * @param   {Integer} [daysOld=7] la cantidad de días que deben haber pasado para ocultar un post
         * @returns {Promise} una promesa con el resultado de la ejecución
         */
        function hideOldDonePosts(daysOld) {
            return $q(function (resolve) {
                var momentDaysBefore = moment(),
                    syncedPosts = $firebaseArray(getFirebaseObj());

                // Por default se ocultan los posts con más de 7 días
                daysOld = daysOld || 7;

                // A la fecha de hoy le resto la cantidad de días pasada por parámetro
                momentDaysBefore.subtract(daysOld, 'days');

                syncedPosts.$loaded().then(function () {
                    angular.forEach(syncedPosts, function (currentPost) {
                        var timestampMoment = moment(currentPost.timestamp);
                        // Si el post está resuelto y la fecha de creación es igual o menor a la fecha de borrado
                        if (currentPost.show && currentPost.done && timestampMoment.isSameOrBefore(momentDaysBefore)) {
                            currentPost.show = false;
                            syncedPosts.$save(currentPost);
                        }
                    });

                    resolve(true);
                });
            });
        }
    }

}());
