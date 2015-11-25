"use strict";

(function () {

    angular
        .module("webApp.controllers")
        .controller("LoginController", LoginController)
        .factory("Auth", Auth);

    LoginController.$inject = ["$scope", "Auth"];
    Auth.$inject = ["$firebaseAuth"];

    function LoginController($scope, Auth) {
        //login con Facebook
        $scope.log = function () {
            var fb = new Firebase("https://voting-web.firebaseio.com");
            $scope.auth = Auth;
            fb.authWithOAuthPopup("facebook", function (error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                } else {
                    console.log("Authenticated successfully with payload:", authData);
                    $scope.auth.$onAuth(function(authData) {
                        $scope.authData = authData;
                    });
                }
            });
        }
    }

    function Auth($firebaseAuth) {
        var ref = new Firebase("https://voting-web.firebaseio.com");
        return $firebaseAuth(ref);
    }
}());
