(function(){
    'use strict';

    angular
        .module('myApp')
        .controller('GameResultsController', GameResultsController);

    GameResultsController.$inject = ['$state', '$stateParams', 'socket'];


    function GameResultsController($state, $stateParams, socket) {

        var vm = this;

        vm.gameId = $stateParams.game.id;
        vm.isBusy = false;
        vm.roundIndex = $stateParams.game.roundIndex;

        vm.players = $stateParams.game.rounds[$stateParams.game.roundIndex].users;

        socket.on('gameQuit', gameQuit);
        socket.on('gameContinued', gameContinued);

        vm.displayPoints = function(points) {
            var displayPoints = '';
            if (_.isNumber(points)) {
                displayPoints = points + ' Point';
                if (points > 1) {
                    displayPoints += 's';
                }
            }
            return displayPoints;
        };

        vm.winnerText = function() {
            
            var myWinner,
                winnerCount,
                myText,
                i;

            myWinner = $stateParams.winner;
            winnerCount = myWinner.length;
            if (myWinner.length === 1) {
                myText = myWinner[0].pseudo + ' a gagné';
            } else {
                for (i = 0; i < winnerCount; i++) {
                    switch (i) {
                        case 0:
                            myText = myWinner[i];
                            break;
                        case (winnerCount - 1):
                            myText += ' et ' + myWinner[i];
                            break;
                        default:
                            myText += ', ' + myWinner[i];
                            break;
                    }
                }
                myText += ' ont gagné ex aequo'; 
            }
            myText += ' avec ' + myWinner[0].points + ' points !';

            return myText;
        };

        vm.questionNumber = function() {
            return $stateParams.game.roundIndex + 1;
        };

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
