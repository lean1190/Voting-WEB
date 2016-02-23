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

    it("should have 2 posts after findAllPosts function is called", function () {
        factory.findAllPosts().then( function(posts) {
            console.log(posts);
            expect(posts.length).toBeGreaterThan(0);
        });
    });
});
