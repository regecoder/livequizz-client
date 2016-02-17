/*globals theme1Button, theme2Button */

(function(){
    'use strict';

    angular
        .module('myApp')
        .controller('GameThemesController', GameThemesController);

    GameThemesController.$inject = ['$state', '$stateParams', 'socket'];

    function GameThemesController($state, $stateParams, socket) {

        var vm = this;

        // vm.game = $stateParams.game;
        // vm.user = $stateParams.user;

        vm.gameId = $stateParams.game.id;

        vm.userPseudo = $stateParams.user.pseudo;

        vm.theme1Name = $stateParams.game.quizEngine.quizList[0].theme;
        vm.theme2Name = $stateParams.game.quizEngine.quizList[1].theme;

        vm.theme1Vote = 0;
        vm.theme2Vote = 0;

        vm.time = '';

        socket.on('themeVoted', themeVoted);
        socket.on('quizStarted', quizStarted);
        socket.on('quizBeginningTETick', quizBeginningTETick);
        socket.on('quizBeginningTEComplete', quizBeginningTEComplete);


        vm.onClickTheme1Button = function() {
            voteTheme(0);
        };

        vm.onClickTheme2Button = function() {
            voteTheme(1);
        };

        function voteTheme(themeIndex) {
            disableButtons();
            var data = {
                gameId: vm.gameId,
                themeIndex: themeIndex
            };
            socket.emit('voteTheme', data);
        }

        function disableButtons() {
            theme1Button.setDisabled(true);
            theme2Button.setDisabled(true);
        }

        function themeVoted(round) {
            vm.theme1Vote = round.themeVotes[0];
            vm.theme2Vote = round.themeVotes[1];
        }

        function quizStarted() {
            console.log('quizStarted');
        }

        function quizBeginningTETick(data) {
            vm.time = data.currentTime;   
        }

        function quizBeginningTEComplete() {
            var data = {
                user: $stateParams.user
            };
            $state.go('game-question', data);  
        }
    }
})();
