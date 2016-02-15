(function(){
    'use strict';

    angular
        .module('myApp')
        .controller('GameThemesController', GameThemesController);

    GameThemesController.$inject = ['$state'];

    function GameThemesController($state) {

        var vm = this;

        vm.onClickTheme1Button = function() {
            $state.go('game-question');
        };

        vm.onClickTheme2Button = function() {
            $state.go('game-question');
        };
    }
})();
