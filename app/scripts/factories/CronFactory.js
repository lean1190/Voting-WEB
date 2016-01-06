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
            var everyTwoMinutos = later.parse.text('every 2 mins'),
                timer = later.setInterval(function() {
                    console.log("$$ cron ejecutado!");
                    // return PostsFactory.hideOldDonePosts();
                }, everyTwoMinutos);
        }
    }

}());
