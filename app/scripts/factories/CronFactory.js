"use strict";

/**
 * @ngdoc function
 * @name webApp.factories:CronFactory
 * @description
 * Factory que maneja los jobs que se disparan en procesos croneados
 */

(function () {

    angular
        .module("webApp.factories")
        .factory("CronFactory", CronFactory);

    CronFactory.$inject = ["PostsFactory"];

    function CronFactory(PostsFactory) {

        var service = {
            hideOldDonePostsJob: hideOldDonePostsJob
        };

        return service;

        function hideOldDonePostsJob(daysOld) {
            return PostsFactory.hideOldDonePosts(daysOld).then(function () {
                console.log("Limpieza de posts viejos ejecutada!");
            }, function (err) {
                console.error("Error al limpiar los posts viejos", err);
            });

        }
    }

}());
