(function(){
    'use strict';

    angular
        .module('myApp')
        .controller('GameJoinController', GameJoinController);

    GameJoinController.$inject = ['$state'];

    function GameJoinController($state) {

        var vm = this;

        vm.onClickJoinButton = function() {
            $state.go('game-players');
        };
    }
})();
