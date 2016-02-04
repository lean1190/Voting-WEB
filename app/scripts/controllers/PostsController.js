"use strict";

/**
 * @ngdoc function
 * @name webApp.controller:PostsController
 * @description
 * Controlador principal de la aplicación, maneja todo lo relacionado a
 * operaciones con posts, agregar, +1, borrado, etc.
 */

(function () {

    angular
        .module("webApp.controllers")
        .controller("PostsController", PostsController);

    PostsController.$inject = ["$scope", "PostsFactory"];

    function PostsController($scope, PostsFactory) {

        // Se ejecuta ni bien se llama al controller
        activate();

        /**
         * Recupera todos los posts y los enchufa en el scope
         */
        function activate() {
            //parámetros de paginación
            $scope.pageSize = 5;
            $scope.currentPage = 1;

            PostsFactory.findAllPosts().then(function (posts) {
                $scope.articles = posts;
            }, function (err) {
                console.log("Algo salió mal =S", err);
            });
        }

        $scope.addPost = function () {
            return PostsFactory.addPost($scope.article.title, $scope.article.post, $scope.user.facebookId).then(function () {
                $scope.article.title = "";
                $scope.article.post = "";
            });
        };

        $scope.addLike = function (id) {
            return PostsFactory.addLike(id).then(function () {
            }, function (error) {
                console.log("No se pudo agregar +1 al post", error);
            });
        };

        $scope.deletePost = function (postId, postOwner) {
            return PostsFactory.deletePost(postId, postOwner).then(function () {
            }, function (error) {
                console.log("No se pudo eliminar el post", error);
            });
        };

        $scope.markDone = function (postId, postOwner) {
            return PostsFactory.markDone(postId, postOwner).then(function () {
            }, function (error) {
                console.log("No se pudo cambiar el estado del post", error);
            });
        };

        $scope.markNotDone = function (postId, postOwner) {
            return PostsFactory.markNotDone(postId, postOwner).then(function () {
            }, function (error) {
                console.log("No se pudo cambiar el estado del post", error);
            });
        };

    }

}());
