$(function() {
 
    (function($, window, undefined) {
           
            "use strict";

            /**
             * @name APP
             * @namespace
             * @description APP Global Namespace Definition.
             */
            var APP = window.APP = window.APP || {};
           
            /**
             * @private
             */
            var document = window.document;
           
            /**
             * @namespace
             * @description Holds the developer defined Modules to extend the App.
             */
            APP.Modules = {
                
            };

            /**
             * @namespace
             * @description Holds the developer defined Global App Behavior Methods.
             */
            APP.Main = (function() {

                    var holidays;

                    /**
                     * @scope APP.Main
                     */
                    return {

                        init: (function init(){

                            console.log('App has been initialized!');

                            $.ajax({
                                dataType: 'json',
                                url: 'json/holidays.json',
                                success: function (response) {

                                    holidays = response;

                                }
                            });
                            
                        })(),

                        getHolidays: function (countryCode) {

                            return holidays[countryCode];

                        }

                    };

            }());

    })(jQuery, window);

});