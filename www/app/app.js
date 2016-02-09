(function(){
    'use strict';

    angular
        .module('myApp', ['onsen', 'ui.router', 'ngResource'])
        .config(config)
        .run(run);

    run.$inject = ['configService'];

    function run(configService) {
        configService.loadConfig();
    }

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/user-login');

        $stateProvider
            .state('user-login', {
                url: '/user-login',
                params: {
                    mainPage: 'app/test/browsehotels.html'
                },
                // templateUrl: 'app/user/user-login.html'
                templateUrl: 'app/test/menu.html'
            });

        $stateProvider
            .state('user-choose-game', {
                url: '/user-choose-game',
                templateUrl: 'app/user/user-choose-game.html'
            });
    }
})();
