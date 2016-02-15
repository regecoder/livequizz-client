(function(){
    'use strict';

    angular
        .module('myApp')
        .factory('configService', configService);

    configService.$inject = ['$http', '$log', 'configConstant', 'configValue'];

    function configService($http, $log, configConstant, configValue) {

        var configJsonFile = 'app/config/config.json';

        return {
            loadConfigJson: loadConfigJson,
            setAppContext: setAppContext
        };

        function loadConfigJson() {

            $http.get(configJsonFile)
                .then(loadConfigJsonComplete, loadConfigJsonFailed);

            function loadConfigJsonComplete(response) {
                setConfigConstant(response.data);
            }

            function loadConfigJsonFailed(error) {
                $log.error('configService: Failed for loadConfigJson: ' + error.data);
            }
        }

        function setConfigConstant(data) {
            configConstant.apiServerUrl = data.apiServerUrl;
            configConstant.socketServerUrl = data.socketServerUrl;
        }

        function setAppContext(appContext) {
            configValue.appContext = appContext;
        }
    }
})();
