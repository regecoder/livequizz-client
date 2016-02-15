(function(){
    'use strict';

    angular
        .module('myApp')
        .controller('GameResultsController', GameResultsController);

    GameResultsController.$inject = ['$state'];

    function GameResultsController($state) {

        var vm = this;

        vm.onClickQuitButton = function() {
            // $state.go('game-themes');
        };

        vm.onClickContinueButton = function() {
            $state.go('game-themes');
        };
    }
})();
