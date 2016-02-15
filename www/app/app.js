(function() {
    'use strict';

    angular
        .module('myApp', [
            'onsen',
            'ui.router',
            'ngCordova',
            'ngResource',
            'LocalStorageModule',
            'btford.socket-io'
        ])
        .config(config)
        .run(run);

    run.$inject = ['configService'];

    function run(configService) {
        console.log('run: ' + $('#wrapper').data('context'));

        var appContext = $('#wrapper').data('context');

        configService.setAppContext(appContext);
        configService.loadConfigJson();
    }

    config.$inject = [
        '$stateProvider',
        '$urlRouterProvider',
        'localStorageServiceProvider',
        'configConstant'
    ];

    function config($stateProvider, $urlRouterProvider, localStorageServiceProvider, configConstant) {
        console.log('config');

        localStorageServiceProvider
            .setPrefix(configConstant.appName);
    
        $urlRouterProvider.otherwise('init-page');

        $stateProvider
            .state('init-page', {
                url: '',
                templateUrl: 'app/components/init-page/init-page.html'
            });

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

        $stateProvider
            .state('game-join', {
                url: '/game-join',
                params: {
                    mainPage: 'app/game/game-join.html'
                },
                templateUrl: 'app/components/sliding-menu-page/sliding-menu-page.html'
            });

        $stateProvider
            .state('game-players', {
                url: '/game-players',
                params: {
                    mainPage: 'app/game/game-players.html',
                    gameId: null,
                    ownerUser: null
                },
                templateUrl: 'app/components/sliding-menu-page/sliding-menu-page.html'
            });

        $stateProvider
            .state('game-themes', {
                url: '/game-themes',
                templateUrl: 'app/game/game-themes.html'
            });

        $stateProvider
            .state('game-question', {
                url: '/game-question',
                templateUrl: 'app/game/game-question.html'
            });

        $stateProvider
            .state('game-results', {
                url: '/game-results',
                templateUrl: 'app/game/game-results.html'
            });
    }
})();
