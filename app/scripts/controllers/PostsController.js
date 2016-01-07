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

    PostsController.$inject = ["$scope", "$firebaseArray", "$firebaseObject", "PostsFactory", "CronFactory"];

    function PostsController($scope, $firebaseArray, $firebaseObject, PostsFactory, CronFactory) {

        var everyOneMinute = later.parse.text('every 1 min');
        var timer = later.setInterval(CronFunction, everyOneMinute);

        // Se ejecuta ni bien se llama al controller
        activate();

        /**
         * Invocación a función del CronFactory (Lea fijate si querés hacer uso de una promesa o cualquier otro cambio que te parezca como mover este código a otro lado o lo que sea)
         */
        function CronFunction() {
            console.log('va al CronFactory');
            CronFactory.hideOldDonePostsJob();
            console.log('volvió del CronFactory');
        }

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
            return PostsFactory.addPost($scope.article.title, $scope.article.post, $scope.user.facebookId).then(function () {
                console.log("### Post guardado correctamente!");
                $scope.article.title = "";
                $scope.article.post = "";
            });
        };

        $scope.addLike = function (id) {
            return PostsFactory.addLike(id).then(function () {
                console.log("### Post con un like más!");
            });
        };

        $scope.deletePost = function (postId, postOwner) {
            return PostsFactory.deletePost(postId, postOwner).then(function () {
                console.log("### Post eliminado correctamente!");
            }, function (error) {
                console.log("No se pudo eliminar el post", error);
            });
        };

        $scope.markDone = function (postId, postOwner) {
            return PostsFactory.markDone(postId, postOwner).then(function () {
                console.log("### Post marcado como realizado!");
            });
        };

        $scope.markNotDone = function (postId, postOwner) {
            return PostsFactory.markNotDone(postId, postOwner).then(function () {
                console.log("### Post marcado como pendiente!");
            });
        };

        $scope.hideOldDonePosts = function () {
            return PostsFactory.hideOldDonePosts().then(function () {
                console.log("### Los posts viejos ya no se muestran!");
            });
        };
    }

}());
