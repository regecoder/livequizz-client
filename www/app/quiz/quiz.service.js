(function(){
    'use strict';

    angular
        .module('myApp')
        .factory('quizService', quizService);

    quizService.$inject = ['$resource', 'configConstant'];

    function quizService($resource, configConstant) {

        var url,
            params,
            actions,
            quizResource;

        url = configConstant.apiServerUrl + '/quiz/:id';
        params = {
            id: '@id'
        };
        actions = {
        };

        quizResource = $resource(url, params, actions);

        return quizResource;
    }
})();
