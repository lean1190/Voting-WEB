"use strict";

describe('Controller: PostsController', function () {

    var controller,
        scope;

    // load the controller's module
    beforeEach(module('webApp.controllers'));

    // include previous module containing mocked factory
    beforeEach(module('mock.posts'));

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, _$log_, _MockPostsFactory_) {
        scope = $rootScope.$new();
        controller = $controller("PostsController", {
            $scope: scope,
            $log: _$log_,
            PostsFactory: _MockPostsFactory_
        });
    }));

    it("should start with pagination settings greater than 0", function () {
        expect(scope.pageSize).toBeDefined();
        expect(scope.pageSize).toBeGreaterThan(0);
        expect(scope.currentPage).toBeDefined();
        expect(scope.currentPage).toBeGreaterThan(0);
    });

    it("should have 3 posts after findAllPosts function is called", function () {
        expect(scope.articles).toBeDefined();
        expect(scope.articles.length).toBe(0);
        scope.findAllPosts();
        scope.$apply();
        expect(scope.articles.length).toBe(3);
    });

    it("should have 1 more post after addPost function is called", function () {
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
    });

    it("should have only those posts with category 'two' after findPosts function is called", function () {
        var category = "two";

        scope.findPosts(category);
        scope.$apply();

        for(var i = 0; i < scope.articles.length; i++) {
            expect(scope.articles[i].category).toBe(category);
        }

        expect(scope.articles.length).toBe(2);
    });

});

/**
 * Mock para el factory de posts
 * Simplemente crea una respuesta a un requirimiento como si lo resolviera el factory real.
 */
angular.module('mock.posts', []).factory('MockPostsFactory', function ($q) {
    var postsFactory = {};

    postsFactory.posts = [
        {
            title: "one title",
            post: "one content",
            category: "one",
            owner: 19024871057
        },
        {
            title: "two title",
            post: "two content",
            category: "two",
            owner: 25525235231902487
        },
        {
            title: "three title",
            post: "three content",
            category: "two",
            owner: 6373737373321
        }
    ];

    postsFactory.addPost = function (title, post, category, facebookId) {
        this.posts.push({
            title: title,
            post: post,
            category: category,
            owner: facebookId
        });

        return $q.when();
    };

    postsFactory.findAllPosts = function () {
        return $q.when(this.posts);
    };

    postsFactory.findPostsByCategory = function (category) {
        return $q.when(this.posts.filter(function(currentPost) {
            return currentPost.category === category;
        }));
    };

    return postsFactory;
});
