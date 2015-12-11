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

    PostsController.$inject = ["$scope", "$firebaseArray", "$firebaseObject", "PostsFactory", "localStorageService"];

    function PostsController($scope, $firebaseArray, $firebaseObject, PostsFactory, localStorageService) {

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
            var photo = localStorageService.get('login').image
            return PostsFactory.addPost($scope.article.title, $scope.article.post, photo).then(function() {
                console.log("Post guardado correctamente!");
                $scope.article.title="";
                $scope.article.post="";
            });
        };

        $scope.addLike = function (id) {
            return PostsFactory.addLike(id).then(function() {
                console.log("Post con un like más!");
            });
        };

        $scope.deletePost = function (id) {
            return PostsFactory.deletePost(id).then(function() {
                console.log("Post eliminado correctamente!");
            });
        };

        $scope.markDone = function (id) {
            return PostsFactory.markDone(id).then(function() {
                console.log("Post marcado como realizado!");
            });
        };

        $scope.markNotDone = function (id) {
            return PostsFactory.markNotDone(id).then(function() {
                console.log("Post marcado como pendiente!");
            });
        };
    }

}());
