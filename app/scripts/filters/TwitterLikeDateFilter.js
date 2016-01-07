"use strict";

/* globals moment */

/**
 * @ngdoc filter
 * @name webApp.filters:TwitterLikeDateFilter
 * @description
 * Filtro que devuelve la fecha en formato twitter, tipo: 6 days
 *
 * http://momentjs.com/docs/
 * https://github.com/hijonathan/moment.twitter
 */

(function () {

    angular
        .module("webApp.filters")
        .filter("TwitterLikeDate", TwitterLikeDateFilter);

    TwitterLikeDateFilter.$inject = [];

    function TwitterLikeDateFilter() {
        return function (inputDate) {
            return moment(inputDate).twitterLong();
        };
    }
}());
