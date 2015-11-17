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
    var sync = $firebaseObject(firebaseObj.startAt($scope.username).endAt($scope.username));
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
    };
}]);
