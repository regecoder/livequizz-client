(function(){
    'use strict';

    angular
        .module('myApp')
        .constant('appUrlPrefix', 'app')
        .value('config', {
            appName: 'Livequizz',
            appVersion: '0.1',
            apiUrl: ''
        });
})();
