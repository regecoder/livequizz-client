(function(){
    'use strict';

    angular
        .module('myApp')
        .controller('GameChooseController', GameChooseController);

    GameChooseController.$inject = ['$state', 'socket'];

    function GameChooseController($state, socket) {

        var vm = this;

        vm.onClickCreateButton = onClickCreateButton;
        vm.onClickJoinButton = onClickJoinButton;

        socket.on('gameCreated', gameCreated);
        socket.on('gameOwned', gameOwned);

        function onClickCreateButton() {
            console.log('createGame');
            socket.emit('createGame');
        }

        function onClickJoinButton() {
            console.log('joinGame');
            socket.emit('joinGame');
        }

        function gameCreated(data) {
            console.log('gameCreated: ' + data.gameId);
            $state.go('game-players', data);   
        }

        function gameOwned(gameId) {
            console.log('gameOwned: ' + gameId);
            $state.go('game-players');   
        }
    }
})();
