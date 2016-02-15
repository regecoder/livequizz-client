(function(){
    'use strict';

    angular
        .module('myApp')
        .controller('GamePlayersController', GamePlayersController);

    GamePlayersController.$inject = ['$state', '$stateParams'];

    function GamePlayersController($state, $stateParams) {
        // console.log('GamePlayersController: ' +$stateParams.gameId);
        // console.log($stateParams.ownerUser.pseudo);

        var vm = this;

        vm.gameId = $stateParams.gameId;

        vm.players = [$stateParams.ownerUser];

        var newUser = {
            socketId: -1,
            pseudo: 'samuel'
        }; 
        addPlayer(newUser); 

        vm.onClickStartButton = onClickStartButton;

        function onClickStartButton() {
            // $state.go('game-themes');
        }

        function addPlayer(newUser) {
            vm.players.unshift(newUser);
        }
    }
})();
