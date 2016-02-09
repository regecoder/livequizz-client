(function(){
    'use strict';

    angular
        .module('myApp')
        .factory('quizService', quizService);

    quizService.$inject = ['$resource', 'config'];

    function quizService($resource, config) {

        var url,
            params,
            actions,
            quizResource;

        url = config.apiUrl + '/quiz/:id';
        params = {
            id: '@id'
        };
        actions = {
        };

        quizResource = $resource(url, params, actions);

        return quizResource;
    }
})();
