(function(){
    'use strict';

    angular
        .module('myApp')
        .constant('configConstant', {
            appName: 'Livequizz',
            appVersion: '0.1',
            apiUrl: 'config.json'
        });
})();
