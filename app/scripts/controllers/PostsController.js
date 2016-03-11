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

        // Parámetros de paginación
        //$scope.pageSize = 5;
        $scope.currentPage = 1;

        //Posts actuales
        $scope.articles = [];
        //Todos los posts
        $scope.articlesFull = [];

        $scope.busy = false;

        /**
         * Carga más posts a medida que el scroll se va acercando al final de la página
         * InfiniteScroll :)
         */
        $scope.loadMore = function () {
            $scope.busy = true;
            var last = $scope.articles.length - 1;
            if ($scope.articlesFull.length > last) {
                $scope.articles.push($scope.articlesFull[last + 1]);
            }
            $scope.busy = false;
        };

        /**
         * Verifica si un post ya fue likeado por un usuario
         * @param   {object}  post   el post con los likes
         * @param   {number}  userId el id del usuario a verificar si ya dio like
         * @returns {boolean} true si el usuario ya dio like
         */
        $scope.postWasLikedBy = function (post, userId) {
            var wasLiked = false
            angular.forEach(post.whoLikesMe, function (currentLikeUserId) {
                if (currentLikeUserId === userId) {
                    wasLiked = true;
                    return;
                }
            });

            return wasLiked;
        };

        $scope.findAllPosts = function () {
            $scope.busy = true;
            PostsFactory.findAllPosts().then(function (posts) {
                $scope.articles = [];
                $scope.articlesFull = posts;
                var i = 0;
                /*Iniciamos con 8 posts como máximo. Cuando definamos algo en la estructura del post, como ser un atributo after,
                podríamos cambiar la lógica*/
                while (i < $scope.articlesFull.length && i < 8) {
                    $scope.articles.push($scope.articlesFull[i]);
                    i++;
                }
                // console.log('Cargamos los posts iniciales');
                $scope.busy = false;
            }, function (err) {
                $log.error("Algo salió mal al recuperar los posts", err);
            });
        };

        $scope.findPosts = function (category) {
            $scope.busy = false;
            if (category !== "Todos") {
                PostsFactory.findPostsByCategory(category).then(function (posts) {
                    $scope.articles = [];
                    $scope.articlesFull = posts;
                    var i = 0;
                    while (i < $scope.articlesFull.length && i < 8) {
                        $scope.articles.push($scope.articlesFull[i]);
                        i++;
                    }
                    // console.log('Cargamos los posts iniciales');
                }, function (err) {
                    $log.error("Algo salió mal al recuperar los posts", err);
                });
            } else {
                $scope.findAllPosts();
            }
            $scope.busy = false;
        };

        $scope.addPost = function () {
            return PostsFactory.addPost($scope.article.title, $scope.article.post, $scope.article.category, $scope.user.facebookId).then(function () {
                $scope.article.title = "";
                $scope.article.post = "";
                $scope.article.category = "";
            });
        };

        $scope.addLike = function (postId, userId) {
            return PostsFactory.addLike(postId, userId).then(function () {}, function (error) {
                $log.error("No se pudo agregar +1 al post", error);
            });
        };

        $scope.deletePost = function (postId, postOwner) {
            return PostsFactory.deletePost(postId, postOwner).then(function () {}, function (error) {
                $log.error("No se pudo eliminar el post", error);
            });
        };

        $scope.markDone = function (postId, postOwner) {
            return PostsFactory.markDone(postId, postOwner).then(function () {}, function (error) {
                $log.error("No se pudo cambiar el estado del post", error);
            });
        };

        $scope.markNotDone = function (postId, postOwner) {
            return PostsFactory.markNotDone(postId, postOwner).then(function () {}, function (error) {
                $log.error("No se pudo cambiar el estado del post", error);
            });
        };

        $scope.edit = function (postId, post) {
            return PostsFactory.editPost(postId, post).then(function () {}, function (error) {
                $log.error("No se pudo editar el post", error);
            });
        };

        function activate() {
            $scope.findAllPosts();
        }

        // Se ejecuta ni bien se llama al controller
        activate();

    }

}());
