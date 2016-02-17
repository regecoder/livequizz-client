(function(){
    'use strict';

    angular
        .module('myApp')
        .controller('GameChooseController', GameChooseController);

    GameChooseController.$inject = ['$state', '$stateParams', 'socket'];

    function GameChooseController($state, $stateParams, socket) {

        var vm = this;

        vm.clientUser = $stateParams.clientUser;

        socket.on('gameCreated', gameCreated);
        socket.on('gameOwned', gameOwned);

        vm.onClickCreateButton = onClickCreateButton;
        vm.onClickJoinButton = onClickJoinButton;

        function onClickCreateButton() {
            socket.emit('createGame');
        }

        function onClickJoinButton() {
            var data = {
                clientUser: vm.clientUser
            };
            $state.go('game-join', data);   
        }

        function gameCreated(data) {
            console.log('gameCreated:' + data.game.id);
            $state.go('game-players', data);   
        }

        // TODO
        function gameOwned(gameId) {
            console.log('gameOwned:' + gameId);
            $state.go('game-players');   
        }
    }
})();
