/*globals answer1Button, answer2Button, answer3Button, answer4Button,  */

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
        vm.questionIndex = '';
        vm.question = {};
        vm.time = '';
        vm.totalTime = '';
        vm.showTimer = false;
        vm.showAnswers = false;
        vm.answerButtonClicked = 0;
        vm.points = null;

        vm.questionNumber = function() {
            return vm.questionIndex + 1;
        };

        socket.on('quizQuestion', quizQuestion);
        socket.on('quizAnswer', quizAnswer);
        socket.on('quizResult', quizAnswer);
        socket.on('quizAnswerTETick', quizAnswerTETick);
        socket.on('quizResult', quizResult);
        socket.on('quizEnd', quizEnd);

        vm.onClickAnswerButton = function(answerIndex) {

            var clickTime = vm.time;
            setDisabledButtons(true);

            vm.answerButtonClicked = answerIndex;


            if (answerIndex === vm.goodAnswerIndex) {
                vm.points = clickTime;
            } else {
                vm.points = 0;
            }
        };

        vm.onClassAnswerButton = function(answerIndex) {

            var myClass;

            if (vm.answerButtonClicked !== answerIndex) {
                myClass = '';
            } else {
                if (answerIndex === vm.goodAnswerIndex) {
                    myClass = 'button-green';
                } else {
                    myClass = 'button-red';
                }
            }

            return myClass;
        };

        function quizQuestion(data) {
            console.log('quizQuestionStarted:' + data.questionIndex);

            var myRoundClone;

            vm.showAnswers = false;
            setDisabledButtons(false);

            myRoundClone = data.gameClone.rounds[data.gameClone.roundIndex]; 

            vm.gameId = data.gameClone.id;
            vm.quizName = myRoundClone.quiz.theme;
            vm.questionIndex = data.questionIndex;
            vm.question = myRoundClone.quiz.questions[data.questionIndex].question;
            vm.goodAnswerIndex = parseInt(vm.question.goodAnswer, 10);
            vm.answerButtonClicked = 0;
        }   

        function quizAnswer() {
            vm.showTimer = true;
            vm.showAnswers = true;
        }

        function quizAnswerTETick(data) {
            vm.time = data.currentTime;
            vm.totalTime = data.totalTime;
        }

        function quizEnd() {
            var data = {
                gameId: vm.gameId,
                user: $stateParams.user
            };
            $state.go('game-results', data);  
        }

        function quizResult() {
            vm.showTimer = false;
        }

        function setDisabledButtons(isDisabled) {
            answer1Button.setDisabled(isDisabled);
            answer2Button.setDisabled(isDisabled);
            answer3Button.setDisabled(isDisabled);
            answer4Button.setDisabled(isDisabled);
        }
    }
})();
