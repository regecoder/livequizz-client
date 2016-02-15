(function() {
    'use strict';

    jQuery(document).ready(function($) {

        cordovaInit('myApp', 'wrapper');

        function cordovaInit(appName, rootElementId)  {

            if (window.cordova !== undefined) {
                bindEvents();
            } else {
                receivedEvent('browser');
            }

            function bindEvents() {
                document.addEventListener('deviceready', onDeviceReady, false);
            }

            function onDeviceReady() {  
                receivedEvent('cordova');
            }

            function receivedEvent(context)  {

                var rootElement = $('#' + rootElementId);

                rootElement.data('context', context);
                // bootstrap manuel d'Angular qui déclenche son initialisation (app.js)
                angular.bootstrap($(rootElement), [appName]);
            }
        }
    });
})();
