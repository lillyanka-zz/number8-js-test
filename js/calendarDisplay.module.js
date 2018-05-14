$(function() {
 
    (function($, window, undefined) {
           
            "use strict";

            APP.Modules.CalendarDisplay = (function() {

                    var calendar = [];

                    //calculate the number of days in each month
                    function getDaysInMonthArray(userInputResults, monthNumber, trimStart, trimEnd) {

                        var startYear = moment(userInputResults.startDate).format('YYYY');
                        var endYear = moment(userInputResults.endDate).format('YYYY');
                        var daysInMonth = moment().month(monthNumber).daysInMonth();
                        var arrDays = [];

                        while (daysInMonth) {

                            arrDays.push({
                                dayPosition: parseInt(moment([startYear, monthNumber, daysInMonth]).format('d'), 0),
                                dayNumber: parseInt(moment([startYear, monthNumber, daysInMonth]).format('D'), 0),
                                dayFull: moment([startYear, monthNumber, daysInMonth]).format('MM-DD'),
                                exclude: false
                            });

                            daysInMonth--;

                        }

                        arrDays = arrDays.reverse();


                        //gray out the days before the start date and after the end date
                        if (trimStart) {

                            var subtract = moment(userInputResults.startDate).diff(moment([startYear, monthNumber]).startOf('month'), 'days');
                            
                            for (var i = 0; i < subtract; i++) {

                                arrDays[i].exclude = true;

                            }

                        }

                        if (trimEnd) {

                            var subtract = moment(moment([endYear, monthNumber]).endOf('month')).diff(userInputResults.endDate, 'days');

                            for (var i = arrDays.length - 1; i >= (arrDays.length - subtract); i--) {
                                arrDays[i].exclude = true;
                            }

                        }

                        arrDays = insertHolidays(arrDays, userInputResults.countryCode);

                        return arrDays;

                    }

                    function insertHolidays(arrDays, countryCode) {

                        var holidays = APP.Main.getHolidays(countryCode);

                        arrDays.forEach(function (day, index) {

                            arrDays[index].holiday = holidays[day.dayFull];

                        });

                        return arrDays;

                    }

                    /**
                     * @scope APP.Modules.CalendarDisplay
                     */
                    return {

                        init: (function() {

                            console.log('Calendar Display Module has been initialized!');

                        })(),

                        //apply classes to cells to assign background
                        getDayCellClass: function(day) {

                            if (day.exclude) {

                                return 'gray';

                            }

                            if (day.dayPosition === 0 || day.dayPosition === 6) {

                                if (day.holiday) {

                                    return 'orange pointer';

                                } else {

                                    return 'yellow';

                                }

                            } else {

                              if (day.holiday) {

                                return 'orange pointer';

                              } else {

                                return 'green';

                              }

                            }

                        },

                        renderCalendar: function(userInputResults) {

                            calendar = [];

                            var startMonth = moment(userInputResults.startDate).startOf('month').month();
                            var endMonth = moment(userInputResults.endDate).endOf('month').month();
                            var startYear = moment(userInputResults.startDate).year();
                            var endYear = moment(userInputResults.endDate).year();

                            for (var month = startMonth; month <= endMonth; month++) {

                                calendar.push({
                                    name: moment().month(month).format('MMMM'),
                                    monthNumber: month,
                                    year: startYear
                                });

                            }

                            calendar.forEach(function(month, monthIndex) {

                                var daysInMonth = getDaysInMonthArray(
                                                    userInputResults, 
                                                    month.monthNumber,
                                                    monthIndex === 0 ? true : false,
                                                    monthIndex === calendar.length - 1 ? true : false 
                                                );

                                console.log(daysInMonth);
                                
                                calendar[monthIndex].weeks = Array(6);

                                for (var i = 0; i < 6; i++) {

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

                            $('#calendarDisplay').html('');
                            $.tmpl($('#calendarTemplate'), calendar).appendTo('#calendarDisplay');

                            $('[data-toggle="popover"]').popover({
                              trigger: 'hover'
                            });

                            $('#calendarDisplay').removeClass('d-none');

                        }

                    };

            }());

    })(jQuery, window);

});