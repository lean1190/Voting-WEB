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
        console.log(controller);
        expect(scope.user).toBeDefined();
        expect(scope.user).toBe(false);
    });

    it("should have a user with some properties after activate is called", function () {
        localStorageService.set("loginUser", {
            name: "Mock User",
            image: "https://s-media-cache-ak0.pinimg.com/236x/76/bc/e5/76bce5f1fe956f10d106a627188900bb.jpg"
        });

        expect(scope.user).toBe(false);

        /*expect(scope.articles).toBeDefined();
        expect(scope.articles.length).toBe(0);
        scope.findAllPosts();
        scope.$apply();
        expect(scope.articles.length).toBe(3);*/
    });

    it("should have an empty user after logout is called", function () {
        scope.logout();
        expect(scope.user).toBe(null);
    });

    /*it("should have 1 more post after addPost function is called", function () {
        // Recupera los posts iniciales
        scope.findAllPosts();
        scope.$apply();

        var previousPostsLength = scope.articles.length;

        // Define las propiedades del post nuevo
        scope.article = {
            title: "New title",
            post: "New category",
            category: "New content"
        };

        scope.user = {
            facebookId: Math.floor((Math.random() * 100) + 1)
        };

        // Agrega el post
        scope.addPost();
        scope.$apply();

        expect(scope.article.title).toBe("");
        expect(scope.article.post).toBe("");
        expect(scope.article.category).toBe("");

        // Recuper los posts con el nuevo agregado
        scope.findAllPosts();
        scope.$apply();

        expect(scope.articles.length).toBe(previousPostsLength + 1);
    });*/

});
