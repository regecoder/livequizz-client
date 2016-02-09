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
                templateUrl: 'app/user/user-login.html'
            });

        $stateProvider
            .state('user-choose-game', {
                url: '/user-choose-game',
                templateUrl: 'app/user/user-choose-game.html'
            });
    }
})();
