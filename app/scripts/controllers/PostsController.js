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

    PostsController.$inject = ["$scope", "$log", "PostsFactory"];

    function PostsController($scope, $log, PostsFactory) {

        // Se ejecuta ni bien se llama al controller
        activate();

        /**
         * Recupera todos los posts y los enchufa en el scope
         */
        function activate() {
            // Parámetros de paginación
            $scope.pageSize = 5;
            $scope.currentPage = 1;
            findAllPosts();
        }

        function findAllPosts() {
            PostsFactory.findAllPosts().then(function (posts) {
                $scope.articles = posts;
            }, function (err) {
                $log.error("Algo salió mal al recuperar los posts", err);
            });
        }

        $scope.findPosts = function (category) {
            if (category !=="Todos") {
                PostsFactory.findPostsByCategory(category).then(function (posts) {
                    $scope.articles = posts;
                }, function (err) {
                    $log.error("Algo salió mal al recuperar los posts", err);
                });
            }else{
                findAllPosts();
            }
        };

        $scope.addPost = function () {
            return PostsFactory.addPost($scope.article.title, $scope.article.post, $scope.article.category, $scope.user.facebookId).then(function () {
                $scope.article.title = "";
                $scope.article.post = "";
                $scope.article.category = "";
            });
        };

        $scope.addLike = function (id) {
            return PostsFactory.addLike(id).then(function () {
            }, function (error) {
                $log.error("No se pudo agregar +1 al post", error);
            });
        };

        $scope.deletePost = function (postId, postOwner) {
            return PostsFactory.deletePost(postId, postOwner).then(function () {
            }, function (error) {
                $log.error("No se pudo eliminar el post", error);
            });
        };

        $scope.markDone = function (postId, postOwner) {
            return PostsFactory.markDone(postId, postOwner).then(function () {
            }, function (error) {
                $log.error("No se pudo cambiar el estado del post", error);
            });
        };

        $scope.markNotDone = function (postId, postOwner) {
            return PostsFactory.markNotDone(postId, postOwner).then(function () {
            }, function (error) {
                $log.error("No se pudo cambiar el estado del post", error);
            });
        };

        $scope.cargarPostsDeportes = function () {
                $log.error("llegué como un campeón");
        };

    }

}());
