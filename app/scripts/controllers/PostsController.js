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
            return PostsFactory.addPost($scope.article.title, $scope.article.post, $scope.user.facebookId).then(function() {
                console.log("### Post guardado correctamente!");
                $scope.article.title="";
                $scope.article.post="";
            });
        };

        $scope.addLike = function (id) {
            return PostsFactory.addLike(id).then(function() {
                console.log("### Post con un like más!");
            });
        };

        $scope.deletePost = function (postId, postOwner) {
            return PostsFactory.deletePost(postId, postOwner).then(function() {
                console.log("### Post eliminado correctamente!");
            }, function(error) {
                console.log("No se pudo eliminar el post", error);
            });
        };

        $scope.markDone = function (postId, postOwner) {
            return PostsFactory.markDone(postId, postOwner).then(function() {
                console.log("### Post marcado como realizado!");
            });
        };

        $scope.markNotDone = function (postId, postOwner) {
            return PostsFactory.markNotDone(postId, postOwner).then(function() {
                console.log("### Post marcado como pendiente!");
            });
        };

        $scope.getPostOwnerPhoto = function (postOwner) {
            var ref = new Firebase("https://voting-web.firebaseio.com/Users/" + postOwner);

            ref.once("value", function (result) {
                var retrievedUser = result.val();
                console.log("retrievedUser", retrievedUser);
                return retrievedUser.image;
            });
        };
    }

}());
