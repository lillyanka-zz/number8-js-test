$(function() {
 
    (function($, window, undefined) {
           
            "use strict";

            APP.Modules.CalendarDisplay = (function() {

                    var calendar = [];

                    function getDaysInMonthArray(startDate, monthNumber) {

                        var startYear = moment(startDate).format('YYYY');
                        var daysInMonth = moment().month(monthNumber).daysInMonth();
                        var arrDays = [];

                        while (daysInMonth) {

                            arrDays.push({
                                dayPosition: parseInt(moment([startYear, monthNumber, daysInMonth]).format('d'), 0),
                                dayNumber: parseInt(moment([startYear, monthNumber, daysInMonth]).format('D'), 0)
                            });

                            daysInMonth--;

                        }

                        return arrDays.reverse();

                    }

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

                            var startOfMonth = moment(userInputResults.startDate).startOf('month').day();
                            var endOfMonth = moment(userInputResults.endDate).startOf('month').day()

                            for (var month = startMonth; month < endMonth; month++) {

                                calendar.push({
                                    name: moment().month(month).format('MMMM'),
                                    monthNumber: month
                                });

                            }

                            calendar.forEach(function(month, monthIndex) {

                                var daysInMonth = getDaysInMonthArray(userInputResults.startDate, month.monthNumber); 
                                
                                calendar[monthIndex].weeks = Array(5);

                                for (var i = 0; i < 5; i++) {

                                    var week = Array(7).fill(false);

                                    week.forEach(function(day, dayPosition) {
    
                                        if (daysInMonth.length && dayPosition === daysInMonth[0].dayPosition) {
    
                                            week[dayPosition] = daysInMonth[0];
                                            daysInMonth.shift();
    
                                        }
    
                                    });
    
                                    calendar[monthIndex].weeks[i] = week;

                                }

                            });

                            console.log(calendar);

                            $.tmpl($('#calendarTemplate'), calendar).appendTo('#calendarDisplay');
                            $('#calendarDisplay').removeClass('d-none');

                        }

                    };

            }());

    })(jQuery, window);

});