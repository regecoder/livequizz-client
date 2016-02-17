(function(){
    'use strict';

    angular
        .module('myApp')
        .controller('GameQuestionController', GameQuestionController);

    GameQuestionController.$inject = ['$state', '$stateParams', 'socket'];

    function GameQuestionController($state, $stateParams, socket) {

        var vm = this;

        vm.gameId = -1;
        vm.userPseudo = $stateParams.user.pseudo;
        vm.quizName = '';
        vm.questionIndex = -1;
        vm.question = {};
        vm.time = '';

        vm.questionNumber = function() {
            return vm.questionIndex + 1;
        };

        socket.on('quizQuestionStarted', quizQuestionStarted);
        socket.on('quizQuestionTETick', quizQuestionTETick);


        vm.onClickAnswer1Button = function() {
            $state.go('game-results');

        };

        vm.onClickAnswer2Button = function() {
        };

        vm.onClickAnswer3Button = function() {
        };

        vm.onClickAnswer4Button = function() {
        };

        function quizQuestionStarted(data) {
            console.log('quizQuestionStarted:' + data.questionIndex);

            var myRoundClone = data.gameClone.rounds[data.gameClone.roundIndex]; 

            vm.gameId = data.gameClone.gameId;
            vm.quizName = myRoundClone.quiz.theme;
            vm.questionIndex = data.questionIndex;
            vm.question = myRoundClone.quiz.questions[data.questionIndex].question;
        }   

        function quizQuestionTETick(data) {
            vm.time = data.currentTime;   
        }
    }
})();
