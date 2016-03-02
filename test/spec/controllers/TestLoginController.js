"use strict";

describe('Controller: LoginController', function () {

    var controller, scope, localStorageService;

    // Initialize the controller and scope
    beforeEach(function () {

        // load the controller's module
        module('webApp.controllers');
        module('mock.login');
        module('mock.localStorage');

        inject(function ($controller, $rootScope, _$log_, _localStorageService_, _LoginFactory_) {
            scope = $rootScope.$new();
            localStorageService = _localStorageService_;
            controller = $controller("LoginController", {
                $scope: scope,
                $log: _$log_,
                localStorageService: localStorageService,
                LoginFactory: _LoginFactory_
            });
        });
    });

    it("should start with an empty user", function () {
        expect(scope.user).toBeDefined();
        expect(scope.user).toBe(false);
    });

    it("should have a user with some properties after activate is called", function () {
        expect(scope.user).toBe(false);

        // Resuelve la promesa del activate
        scope.$apply();

        expect(scope.user).not.toBe(false);
        expect(scope.user.name).toBeDefined();
        expect(scope.user.name).toBe("Mock User");
   });

    it("should have an empty user after logout is called", function () {
        // Resuelve la promesa del activate
        scope.$apply();

        scope.logout();

        expect(scope.user).toBe(false);
    });

    it("should have a logged in user after facebookLogin is called", function () {
        // Resuelve la promesa del activate
        scope.$apply();

        // Deja el usuario limpio
        scope.logout();

        // Ejecuta el login y resuelve la promesa
        scope.facebookLogin();
        scope.$apply();

        expect(scope.user).not.toBe(false);
        expect(scope.user.name).toBeDefined();
        expect(scope.user.image).toBeDefined();
        expect(scope.user.facebookId).toBeDefined();
    });

});
