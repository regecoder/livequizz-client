(function(){
    'use strict';

    angular
        .module('myApp')
        .factory('configService', configService);

    configService.$inject = ['$http', '$log', 'configConstant'];

    function configService($http, $log, configConstant) {

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
            configConstant.apiUrl = data.apiUrl;
        }
    }
})();
