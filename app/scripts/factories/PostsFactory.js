"use strict";

/* globals Firebase, moment */

(function () {

    angular
        .module("webApp.factories")
        .factory("PostsFactory", PostsFactory);

    PostsFactory.$inject = ["$firebaseArray", "$firebaseObject"];

    function PostsFactory($firebaseArray, $firebaseObject) {

        var firebaseConnectionUrl = "https://voting-web.firebaseio.com/Posts/";

        var service = {
            findAllPosts: findAllPosts,
            findPostsForUser: findPostsForUser,
            addPost: addPost,
            addLike: addLike
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
         * Devuelve todos los posts en un arreglo sincronizado
         * @returns {Promise} una promesa con el arreglo sincronizado de posts
         */
        function findAllPosts() {
            return new Promise(function (resolve) {
                var syncedPosts = $firebaseArray(getFirebaseObj());

                resolve(syncedPosts);
            });
        }

        /**
         * Devuelve todos los posts para un determinado usuario en un arreglo sincronizado
         * @returns {Promise} una promesa con el arreglo sincronizado de posts
         */
        function findPostsForUser(username) {
            return new Promise(function (resolve) {
                var syncedPosts = $firebaseArray(getFirebaseObj().startAt(username).endAt(username));

                resolve(syncedPosts);
            });
        }

        /**
         * Crea un post y lo persiste
         * @param   {String} title el título del post
         * @param   {String} content el cuerpo del post
         * @returns {Promise} una promesa cuando el post se guardó
         */
        function addPost(title, content) {
            return new Promise(function (resolve) {
                var syncedPosts = $firebaseArray(getFirebaseObj());

                syncedPosts.$add({
                    title: title,
                    post: content,
                    done: false,
                    likes: 0,
                    timestamp: moment().format() // Now!
                });

                resolve();
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

        /*
        $scope.confirmDelete = function (id) {
            //traigo el post a eliminar
            var fb = new Firebase("https://voting-web.firebaseio.com/Posts/" + id);
            var post = $firebaseObject(fb);
            //guardo en el scope el post a eliminar
            $scope.postToDelete = post;
            //abro ventana modal de confirmación
            $('#deleteModal').modal();
        };

        $scope.deletePost = function () {
            //traigo el post a eliminar
            var fb = new Firebase("https://voting-web.firebaseio.com/Posts/" + $scope.postToDelete.$id);
            var post = $firebaseObject(fb);
            //elimino post y oculto ventana modal
            post.$remove().then(function () {
                $('#deleteModal').modal('hide');
            }, function (error) {
                console.log("Error:", error);
            });
        };*/
    }

}());
