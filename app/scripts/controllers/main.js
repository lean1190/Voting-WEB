'use strict';

/* globals Firebase */

/**
 * @ngdoc function
 * @name webApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webApp
 */
angular.module('webApp')

.controller('MainCtrl', ['$scope', '$firebaseArray', '$location', '$firebaseObject', function ($scope, $firebaseArray, $location, $firebaseObject) {
    var firebaseObj = new Firebase("https://voting-web.firebaseio.com/Posts");
    var sync = $firebaseArray(firebaseObj.startAt($scope.username).endAt($scope.username));
    $scope.articles = sync;

    $scope.AddPost = function () {
        var title = $scope.article.title;
        var post = $scope.article.post;
        //var firebaseObj = new Firebase("https://voting-web.firebaseio.com/Posts");
        var fb = $firebaseArray(firebaseObj);
        fb.$add({
            title: title,
            post: post,
            done: false
        });
    }

      $scope.confirmDelete = function(id) {
        //traigo el post a eliminar
        var fb = new Firebase("https://voting-web.firebaseio.com/Posts/" + id);
        var post = $firebaseObject(fb);
        //guardo en el scope el post a eliminar
        $scope.postToDelete = post;
        //abro ventana modal de confirmación
        $('#deleteModal').modal();
    }

    $scope.deletePost = function() {
        //traigo el post a eliminar
        var fb = new Firebase("https://voting-web.firebaseio.com/Posts/" + $scope.postToDelete.$id);
        var post = $firebaseObject(fb);
        //elimino post y oculto ventana modal
        post.$remove().then(function(ref) {
            $('#deleteModal').modal('hide');
        }, function(error) {
            console.log("Error:", error);
        });
    };
}]);
