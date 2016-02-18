(function(){
    'use strict';

    angular
        .module('myApp')
        .controller('GameResultsController', GameResultsController);

    GameResultsController.$inject = ['$state', '$stateParams', 'socket'];

    function GameResultsController($state, $stateParams, socket) {

        var vm = this;

        vm.gameId = $stateParams.gameId;
        vm.isBusy = false;

        socket.on('gameQuit', gameQuit);
        socket.on('gameContinued', gameContinued);

        vm.onClickQuitButton = function() {
            if (vm.isBusy === true) {
                return;
            }
            vm.isBusy = true;
            socket.emit('quitGame', vm.gameId);
        };

        vm.onClickContinueButton = function() {
            if (vm.isBusy === true) {
                return;
            }
            vm.isBusy = true;
            socket.emit('continueGame', vm.gameId);
        };

        function gameQuit() {
            $state.go('user-login');
        }

        function gameContinued(data) {
            $state.go('game-players', data);  
        }
    }
})();
