(function(){

    'use strict';

    const minute = 60;
    const hour = minute * 60;
    const day = hour * 24;
    const week = day * 7;

    angular.module('warehouse.filters.relativeDate', [])
		   .filter('relative', RelativeFilter);

    RelativeFilter.$inject = ['dateFilter'];
	function RelativeFilter(dateFilter) {
        var formatDate = function(date) {
            date = Date.parse(date);
            var diff = dateDiffInSeconds(new Date(), date);

            switch (true) {
                case (diff < minute):
                    return 'just now';

                case (diff < hour):
                    return pluralizeText(diff, 'minute', minute);

                case (diff < day):
                    return pluralizeText(diff, 'hour', hour);

                case (diff < week):
                    return pluralizeText(diff, 'day', day);

                default:
                    return dateFilter(date, 'fullDate');
            };
        }

        var dateDiffInSeconds = function(now, date) {
            return Math.ceil(Math.abs(now - date) / 1000);
        };

        var pluralizeText = function(diff, name, div) {
            var total = Math.ceil(diff / div);
            return [total, (total === 1 ? name : name + 's'), 'ago'].join(' ');
        };

        return formatDate;
	}

})();
