/**
 * @ngdoc function
 * @name mock.environment:MockEnvironment
 * @description
 * Mock con las variables de environment
 */

angular.module('mock.environment', []).constant('ENV', {
    name: 'testing',
    apiEndpoint: 'ws://test.firebase.localhost:5000/'
});
