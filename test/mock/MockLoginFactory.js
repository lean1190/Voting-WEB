/**
 * @ngdoc provider
 * @name mock.posts:LoginFactory
 * @description
 * Mock para el factory que maneja el login y logout de un usuario
 * Simplemente crea una respuesta a un requirimiento como si lo resolviera el factory real.
 */

angular.module("mock.login", []).provider("LoginFactory", function () {
    "use strict";

    this.$get = function ($q) {
        var loginFactory = {};

        loginFactory.facebookLogin = function () {

        };

        loginFactory.logout = function () {
            return true;
        };

        loginFactory.isLoggedInUser = function () {
            return $q(function (resolve) {
                resolve({
                    name: "Mock User",
                    image: "https://s-media-cache-ak0.pinimg.com/236x/76/bc/e5/76bce5f1fe956f10d106a627188900bb.jpg"
                });
            });
        };

        return loginFactory;
    };
});
