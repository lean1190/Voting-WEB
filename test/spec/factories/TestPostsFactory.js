"use strict";

describe("Factory: PostsFactory", function () {

    var factory;

    beforeEach(function () {
        // load the factory module
        module("webApp.factories");

        module("firebase");
        module("mock.localStorage");
        module("mock.environment");

        inject(function ($injector) {
            factory = $injector.get("PostsFactory");
        });
    });

    it("should have 2 posts after findAllPosts function is called", function () {
        var all = factory.findAllPosts();
        console.log(all);

        expect(all).toBeGreaterThan(0);
        //factory.getFirebaseObj();
    });
});
