(function(){
    'use strict';

    angular
        .module('myApp')
        .controller('GamePlayersController', GamePlayersController);

    GamePlayersController.$inject = ['$state', '$stateParams', 'socket'];

    function GamePlayersController($state, $stateParams, socket) {

        var vm = this;

        var userIsOwner;

        vm.game = $stateParams.game;
        vm.user = $stateParams.user;

        // BUG: $stateParams.game.getUsersOfRound is not a function
        // vm.players = $stateParams.game.getUsersOfRound($stateParams.roundIndex);
        vm.players = $stateParams.game.rounds[$stateParams.roundIndex].users;

        vm.time = '';

        socket.on('gameUserJoined', gameUserJoined);
        socket.on('gameUserQuit', gameUserQuit);
        socket.on('gameStarted', gameStarted);
        socket.on('roundStarted', roundStarted);
        socket.on('autostartRoundTick', autostartRoundTick);

        vm.onShowWaitingMessage = onShowWaitingMessage;
        vm.onShowStartButton = onShowStartButton;
        vm.onClickStartButton = onClickStartButton;

        userIsOwner = (vm.game.ownerUser.socketId === vm.user.socketId);

        function gameUserJoined(data) {
            // vm.players = data.game.getUsersOfRound(data.roundIndex);
            vm.players = data.game.rounds[data.roundIndex].users;
            if (data.roundIndex > 0) {
                checkAutostart(data);
            }
        }

        function gameUserQuit(data) {
            checkAutostart(data);
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
            return (userIsOwner === false || $stateParams.roundIndex > 0);
        }

        function onShowStartButton() {
            return (userIsOwner === true && $stateParams.roundIndex === 0);
        }

        function onClickStartButton() {
            socket.emit('startGame', vm.game.id);
        }

        function checkAutostart(data) {
            var myRound = data.game.rounds[data.roundIndex];
            if (myRound.usersCount >= myRound.usersWaited) {
                socket.emit('autostartRound', data);
            }
        }

        function autostartRoundTick(data) {
            vm.time = data.currentTime;   
        }
    }
})();
