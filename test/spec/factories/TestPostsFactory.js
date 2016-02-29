"use strict";

describe("Factory: PostsFactory", function () {

    var factory;

    beforeEach(function () {
        // load the factory module
        module("webApp.factories");

        module("firebase");
        module("config");
        module("mock.localStorage");

        inject(function ($injector) {
            factory = $injector.get("PostsFactory");
        });
    });

    /*it("should have 3 posts after findAllPosts function is called", function () {
        factory.findAllPosts().then( function(posts) {
            expect(posts.length).toBeGreaterThan(15798);
            expect(posts.length).toBe(8);

            for(var i = 0; i < posts.length; i++) {
                expect(posts[i].photo).not.toBe("");
                expect(posts[i].photo).toBe("");
            }
        });
    });

    it("should have only those posts with category 'categoria 1' after findPostsByCategory function is called", function () {
        factory.findPostsByCategory("categoria 1").then( function(posts) {
            expect(posts.length).toBeGreaterThan(0);
            expect(posts.length).toBe(2);
        });
    });*/
});
