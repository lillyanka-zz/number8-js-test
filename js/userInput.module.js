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

                    function calculateEndDate() {

                        return moment(startDate).add(addDays, 'days').format();

                    }

                    function calculateMonths() {

                        return moment(endDate).diff(moment(startDate), 'months'); 

                    }

                    function calculateWeeks() {

                        return moment(endDate).diff(moment(startDate), 'weeks');

                    }

                    function calculateInputData() {

                        startDate = $('#startDate').val();
                        addDays = $('#addDays').val();
                        countryCode = $('#countryCode').val();
                        endDate = calculateEndDate();
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