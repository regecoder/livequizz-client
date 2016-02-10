(function(){
    'use strict';

    angular
        .module('myApp', [
            'onsen',
            'ui.router',
            'ngResource',
            'LocalStorageModule',
            'btford.socket-io'
        ])
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
            .state('game-choose', {
                url: '/game-choose',
                params: {
                    mainPage: 'app/game/game-choose.html'
                },
                templateUrl: 'app/components/sliding-menu-page/sliding-menu-page.html'
            });
    }
})();
