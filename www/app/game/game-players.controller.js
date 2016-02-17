(function(){
    'use strict';

    angular
        .module('myApp')
        .controller('GamePlayersController', GamePlayersController);

    GamePlayersController.$inject = ['$state', '$stateParams', 'socket'];

    function GamePlayersController($state, $stateParams, socket) {
        // console.log('GamePlayersController: ' +$stateParams.gameId);
        // console.log($stateParams.ownerUser.pseudo);

        var vm = this;

        var userIsOwner;

        vm.game = $stateParams.game;
        vm.user = $stateParams.user;

        vm.players = $stateParams.game.users;

        socket.on('gameUserJoined', gameUserJoined);
        socket.on('gameStarted', gameStarted);
        socket.on('roundStarted', roundStarted);

        vm.onShowWaitingMessage = onShowWaitingMessage;
        vm.onShowStartButton = onShowStartButton;
        vm.onClickStartButton = onClickStartButton;

        userIsOwner = (vm.game.ownerUser.socketId === vm.user.socketId);

        function gameUserJoined(data) {
            vm.players = data.game.users;
        }

        function gameStarted(game) {
            console.log('gameStarted:' + game.id);
        }

        function roundStarted(game) {
            var data = {
                game: game,
                user: vm.user
            };
            console.log('roundStarted:' + game.id + '/' + game.roundIndex);
            $state.go('game-themes', data);   
        }

        function onShowWaitingMessage() {
            return (userIsOwner === false);
        }

        function onShowStartButton() {
            return (userIsOwner === true);
        }

        function onClickStartButton() {
            socket.emit('startGame', vm.game.id);
        }
    }
})();
    