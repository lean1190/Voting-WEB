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

    CronFactory.$inject = ["$log", "PostsFactory"];

    function CronFactory($log, PostsFactory) {

        var service = {
            hideOldDonePostsJob: hideOldDonePostsJob
        };

        return service;

        function hideOldDonePostsJob(daysOld) {
            return PostsFactory.hideOldDonePosts(daysOld).then(function () {
                $log.info("Limpieza de posts viejos ejecutada!");
            }, function (err) {
                $log.error("Error al limpiar los posts viejos", err);
            });

        }
    }

}());
