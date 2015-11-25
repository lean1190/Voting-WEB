"use strict";

/* globals*/

/**
 * @ngdoc function
 * @name webApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webApp
 */

(function () {

    angular
        .module("webApp.controllers")
        .controller("PostsController", PostsController);

    PostsController.$inject = ["$scope", "$firebaseArray", "$firebaseObject", "PostsFactory"];

    function PostsController($scope, $firebaseArray, $firebaseObject, PostsFactory) {

        // Se ejecuta ni bien se llama al controller
        activate();

        /**
         * Recupera todos los posts y los enchufa en el scope
         */
        function activate() {
            PostsFactory.findAllPosts().then(function (posts) {
                $scope.articles = posts;
            }, function (err) {
                console.log("Algo salió mal =S", err);
            });
        }

        $scope.addPost = function () {
            PostsFactory.addPost($scope.article.title, $scope.article.post).then(function() {
                console.log("Post guardado correctamente!");
            });
        };

        $scope.addLike = function (id) {
            PostsFactory.addLike(id).then(function() {
                console.log("Post con un like más!");
            });
        };

        $scope.deletePost = function (id) {
            return PostsFactory.deletePost(id).then(function() {
                console.log("Post eliminado correctamente!");
            });
        };
    }

}());
