$(function() {
 
    (function($, window, undefined) {
           
            "use strict";

            APP.Modules.CalendarDisplay = (function() {

                    /**
                     * @scope APP.Modules.CalendarDisplay
                     */
                    return {

                        init: (function() {

                            console.log('Calendar Display Module has been initialized!');

                        })(),

                        renderCalendar: function(userInputResults) {

                            var startMonth = moment(userInputResults.startDate).startOf('month').month();
                            var endMonth = moment(userInputResults.endDate).startOf('month').month();

                            var calendar = [];

                            for (var month = startMonth; month < endMonth; month++) {

                                calendar.push({
                                    name: moment().month(month).format('MMMM'),
                                    weeks: []
                                });

                                var startWeek = moment().month(month).startOf('month').week();
                                var endWeek = moment().month(month).endOf('month').week();

                                for (var week = startWeek; week < endWeek; week++) {
                                
                                    calendar[calendar.length - 1].weeks.push({
                                        full: week,
                                        days: Array(7)
                                                .fill(0)
                                                .map(function(dayNumber, index) {
                                                    return moment().week(week).startOf('week').clone().add(dayNumber + index, 'day')
                                                })
                                    });
                                
                                }

                            }

                            console.log(calendar);

                            $.tmpl($('#calendarTemplate'), calendar).appendTo('#calendarDisplay');
                            $('#calendarDisplay').removeClass('d-none');

                        }

                    };

            }());

    })(jQuery, window);

});