"use strict";

describe('Controller: PostsController', function () {

    var controller,
        scope;

    // load the controller's module
    beforeEach(module('webApp.controllers'));

    // include module containing mocked factory
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

        for (var i = 0; i < scope.articles.length; i++) {
            expect(scope.articles[i].category).toBe(category);
        }

        expect(scope.articles.length).toBe(2);
    });

    it("should have all posts after findPosts function is called", function () {
        var allCategory = "Todos";

        scope.findPosts(allCategory);
        scope.$apply();

        expect(scope.articles.length).toBe(3);
    });

    it("should have no posts after findPosts function is called", function () {
        var noCategory = "";

        scope.findPosts(noCategory);
        scope.$apply();

        expect(scope.articles.length).toBe(0);
    });

    it("should add a like to a post after addLike function is called", function () {
        scope.findAllPosts();
        scope.$apply();

        var postToLike = scope.articles[0],
            likesCount = 0;

        expect(postToLike.likes).toBe(likesCount);

        scope.addLike(postToLike.$id);
        scope.findAllPosts();
        scope.$apply();

        expect(scope.articles[0].likes).toBe(likesCount + 1);
    });

    it("should have 1 less post after deletePost function is called", function () {
        scope.findAllPosts();
        scope.$apply();

        var postToDelete = scope.articles[0],
            postOwner = postToDelete.owner,
            postsCount = scope.articles.length;

        scope.deletePost(postToDelete.$id, postOwner);
        scope.findAllPosts();
        scope.$apply();

        expect(scope.articles.length).toBe(postsCount - 1);
    });

    it("should mark a post as done after markDone function is called", function () {
        scope.findAllPosts();
        scope.$apply();

        var postToMarkDone = scope.articles[0],
            postOwner = postToMarkDone.owner;

        expect(postToMarkDone.done).toBe(false);

        scope.markDone(postToMarkDone.$id, postOwner);
        scope.findAllPosts();
        scope.$apply();

        expect(scope.articles[0].done).toBe(true);
    });

    it("should mark a post as not done after markNotDone function is called", function () {
        scope.findAllPosts();
        scope.$apply();

        var postToMarkNotDone = scope.articles[scope.articles.length - 1],
            postOwner = postToMarkNotDone.owner;

        expect(postToMarkNotDone.done).toBe(true);

        scope.markNotDone(postToMarkNotDone.$id, postOwner);
        scope.findAllPosts();
        scope.$apply();

        expect(scope.articles[scope.articles.length - 1].done).toBe(false);
    });

});
