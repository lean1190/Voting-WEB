"use strict";

/* globals Firebase, $ */

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
        };
    }

}());
