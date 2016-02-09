(function(){
    'use strict';

    angular
        .module('myApp')
        .factory('configService', configService);

    configService.$inject = ['$http', '$log', 'config'];

    function configService($http, $log, config) {

        var configFile = 'app/config/config.json';

        return {
            loadConfig: loadConfig
        };

        function loadConfig() {

            $http.get(configFile)
                .then(loadConfigComplete, loadConfigFailed);

            function loadConfigComplete(response) {
                setConfig(response.data);
            }

            function loadConfigFailed(error) {
                $log.error('configService: Failed for loadConfig.' + error.data);
            }
        }

        function setConfig(data) {
            config.apiUrl = data.apiUrl;
        }
    }
})();
