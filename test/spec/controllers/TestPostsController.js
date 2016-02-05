"use strict";

describe('Controller: PostsController', function () {

    // load the controller's module
    beforeEach(module('webApp.controllers'));

    var PostsController,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        PostsController = $controller("PostsController", {
            $scope: scope
                // place here mocked dependencies
        });
    }));

    it("should attach a list of awesomeThings to the scope", function () {
        expect(PostsController.awesomeThings.length).toBe(3);
    });

});
