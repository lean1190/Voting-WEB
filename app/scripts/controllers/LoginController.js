"use strict";

(function () {

    angular
        .module("webApp.controllers")
        .controller("LoginController", LoginController);

    LoginController.$inject = ["$scope"];

    function LoginController($scope, $firebaseArray, $location, $firebaseObject) {
        //login con Facebook
        $scope.log = function () {
            var fb = new Firebase("https://voting-web.firebaseio.com");
            fb.authWithOAuthPopup("facebook", function (error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                } else {
                    console.log("Authenticated successfully with payload:", authData);
                }
            });
        }
    }
}());
