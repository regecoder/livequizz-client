(function(){
    'use strict';

    // Les constantes dont la valeur est 'config.json' sont définies
    // à partir de ce fichier en appelant config.service.js
    angular
        .module('myApp')
        .constant('configConstant', {
            appName        : 'livequizz',
            appVersion     : '0.1',
            apiServerUrl   : 'config.json',
            socketServerUrl: 'config.json'
        });
})();
