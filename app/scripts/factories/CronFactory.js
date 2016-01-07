"use strict";

/* globals later */

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

        function hideOldDonePostsJob() {
            //acá iría código que invoca a función del PostsFactory
            console.log("$$ cron ejecutado!");
        }
    }

}());
