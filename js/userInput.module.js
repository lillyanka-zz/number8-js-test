$(function() {
 
    (function($, window, undefined) {
           
            "use strict";

            APP.Modules.UserInput = (function() {

                    var startDate,
                        addDays,
                        endDate,
                        months,
                        weeks,
                        countryCode;

                    function calculateEndDate(addDays) {

                        return moment(startDate).add(addDays, 'days');

                    }

                    function calculateMonths() {

                        var monthsDiff = (moment(endDate).diff(moment(startDate), 'days', true))/30;
                        return monthsDiff; 

                    }

                    function calculateWeeks() {

                        return moment(endDate).diff(moment(startDate), 'weeks', true);

                    }

                    function calculateInputData() {

                        startDate = $('#startDate').val();
                        addDays = $('#addDays').val();
                        countryCode = $('#countryCode').val();
                        endDate = calculateEndDate(addDays);
                        months = calculateMonths();
                        weeks = calculateWeeks();

                    }

                    /**
                     * @scope APP.Modules.UserInput
                     */
                    return {

                        init: (function() {

                            console.log('User Input Module has been initialized!');

                            $('#submitUserInput').click(function(event) {

                                event.preventDefault();
                                calculateInputData();
                                APP.Modules.CalendarDisplay.renderCalendar(
                                    APP.Modules.UserInput.getUserInputResults()
                                );
                                
                            });

                        })(),

                        getUserInputResults: function() {
                            return {
                                startDate: startDate,
                                endDate: endDate,
                                months: months,
                                weeks: weeks,
                                countryCode: countryCode
                            };

                        }

                    };

            }());

    })(jQuery, window);

});