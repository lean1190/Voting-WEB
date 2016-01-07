"use strict";

/* globals later */

/**
 * @ngdoc function
 * @name webApp.controller:CronHideOldDonePostsController
 * @description
 * Controlador del cron que oculta los posts viejos que ya están hechos
 */

(function () {

    angular
        .module("webApp.controllers")
        .controller("CronHideOldDonePostsController", CronHideOldDonePostsController);

    CronHideOldDonePostsController.$inject = ["CronFactory"];

    function CronHideOldDonePostsController(CronFactory) {

        /**
         * Cada minuto los domingos oculta los posts
         * en estado done de más de cierta cantidad de días
         */
        var everyMinuteOnSunday = later.parse.text('every 1 min on the first day of the week');
        later.setInterval(activate, everyMinuteOnSunday);

        function activate() {
            CronFactory.hideOldDonePostsJob();
        }

    }

}());
