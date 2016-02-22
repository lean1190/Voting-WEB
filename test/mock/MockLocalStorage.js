/**
 * @ngdoc provider
 * @name mock.localStorage:localStorageService
 * @description
 * Mock para el localStorageService
 * Es un mapa que almacena y devuelve key => value
 */

angular.module("mock.localStorage", []).provider("localStorageService", function () {
    "use strict";

    this.$get = function () {
        var store = {};

        store.get = function (key) {
            return store[key];
        };

        store.set = function (key, value) {
            store[key] = value;
        };

        store.clear = function () {
            store = {};
        };

        return store;
    };
});
