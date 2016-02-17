'use strict';

describe('Filter: TwitterLikeDateFilter', function () {

    beforeEach(module('webApp.filters'));

    var TwitterLikeDate;

    beforeEach(inject(function ($filter) {
        TwitterLikeDate = $filter("TwitterLikeDate", {});
    }));

    it('should show the date as Twitter does (e.g. 1min ago, or Jan 18 if more than 1 day has passed)', function () {
        expect(TwitterLikeDate("2016-02-03T00:37:01-03:00")).toBe("Feb 3");
    });
});
