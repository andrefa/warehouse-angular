(function() {

    'use strict';

    describe('relative date filter unit tests', function() {

        beforeEach(module('warehouse.filters.relativeDate'));

        var dateFilter;
        var relativeFilter;

        beforeEach(inject(function(_dateFilter_, _relativeFilter_){
            dateFilter = _dateFilter_;
            relativeFilter = _relativeFilter_;
        }));

        it('should says just now', function() {
            var offset = 0;
            testForOffset(offset, 'just now');
        });

        it('should says 1 minute ago', function() {
            var offset = 31;
            testForOffset(offset, '1 minute ago');
        });

        it('should says 2 minutes ago', function() {
            var offset = 61;
            testForOffset(offset, '2 minutes ago');
        });

        it('should says 1 hour ago', function() {
            var offset = 60 * 60;
            testForOffset(offset, '1 hour ago');
        });

        it('should says 2 hours ago', function() {
            var offset = 120 * 60;
            testForOffset(offset, '2 hours ago');
        });

        it('should says 1 day ago', function() {
            var offset = 24 * 60 * 60;
            testForOffset(offset, '1 day ago');
        });

        it('should says 2 days ago', function() {
            var offset = 48 * 60 * 60;
            testForOffset(offset, '2 days ago');
        });

        it('should says 1 day ago', function() {
            var offset = 24 * 60 * 60;
            testForOffset(offset, '1 day ago');
        });

        it('should says 6 days ago', function() {
            var offset = 6 * 24 * 60 * 60;
            testForOffset(offset, '6 days ago');
        });

        it('should says full date', function() {
            var offset = 7 * 24 * 60 * 60;
            var dateStr = strDateForOffset(offset);
            expect(relativeFilter(dateStr)).toBe(dateFilter(Date.parse(dateStr), 'fullDate'));
        });

        var strDateForOffset = function(offsetInSecs) {
            var offsetInMilli = offsetInSecs * 1000;
            return String(new Date(new Date().getTime() - offsetInMilli));
        };

        var testForOffset = function(offsetInSecs, result) {
            expect(relativeFilter(strDateForOffset(offsetInSecs))).toBe(result);
        };

    });

})();
