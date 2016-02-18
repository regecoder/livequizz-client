/*globals joinButton */

(function(){
    'use strict';

    angular
        .module('myApp')
        .controller('GameJoinController', GameJoinController);

    GameJoinController.$inject = ['$state', '$stateParams', 'socket'];

    function GameJoinController($state, $stateParams, socket) {

        var vm = this;

        vm.onChangeGameId = setJoinButtonState;
        vm.onClickJoinButton = onClickJoinButton;

        vm.clientUser = $stateParams.clientUser;
        vm.gameId = '';

        socket.on('gameJoined', gameJoined);

        angular.element(document).ready(initPage);

        function initPage() {
            setJoinButtonState();
        }

        function setJoinButtonState() {
            var isJoinButtonDisabled = (vm.gameId.length !== 4);
            joinButton.setDisabled(isJoinButtonDisabled);
        }

        function onClickJoinButton() {
            socket.emit('joinGame', vm.gameId);
        }

        function gameJoined(data) {
            $state.go('game-players', data);  
        }
    }
})();
