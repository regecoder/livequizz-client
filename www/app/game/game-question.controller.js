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
        vm.totalPoints = null;

        vm.questionNumber = function() {
            return vm.questionIndex + 1;
        };

        vm.displayTime = function() {
            return (_.isNumber(vm.time) && vm.time > 0 ? vm.time : '');
        };

        vm.displayPoints = function() {
            var displayPoints = '';
            if (_.isNumber(vm.points)) {
                displayPoints = vm.points + ' Point';
                if (vm.points > 1) {
                    displayPoints += 's';
                }
            }
            return displayPoints;
        };

        socket.on('quizQuestion', quizQuestion);
        socket.on('quizAnswer', quizAnswer);
        socket.on('quizResult', quizAnswer);
        socket.on('quizAnswerTETick', quizAnswerTETick);
        socket.on('quizResult', quizResult);
        socket.on('quizEnd', quizEnd);
        socket.on('pointsScored', pointsScored);

        vm.onClickAnswerButton = function(answerIndex) {

            var clickTime,
                data;

            clickTime = vm.time;
            setDisabledButtons(true);

            vm.answerButtonClicked = answerIndex;

            if (answerIndex === vm.goodAnswerIndex) {
                vm.points = Math.max(clickTime, 1);
            } else {
                vm.points = 0;
            }
            
            data = {
                gameId: vm.gameId,
                questionIndex: vm.questionIndex,
                points: vm.points
            };
            socket.emit('scorePoints', data);

        };

        function pointsScored(data) {
            vm.totalPoints = data.totalPoints;
        }

        vm.onClassAnswerButton = function(answerIndex) {

            var myClass;

            if (answerIndex === vm.answerButtonClicked) {
                if (answerIndex === vm.goodAnswerIndex) {
                    myClass = 'answer-true';
                } else {
                    myClass = 'answer-false';
                }
            } else if (vm.answerButtonClicked > 0 && answerIndex === vm.goodAnswerIndex) {
                myClass = 'answer-true';
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
            vm.points = null;
        }   

        function quizAnswer() {
            vm.showTimer = true;
            vm.showAnswers = true;
        }

        function quizAnswerTETick(data) {
            vm.time = data.currentTime;
            vm.totalTime = data.totalTime;
        }

        function quizEnd(data) {
            $state.go('game-results', data);  
        }

        function quizResult() {
            vm.showTimer = false;
            if (vm.answerButtonClicked === 0) {
                vm.points = 0;
            }
        }

        function setDisabledButtons(isDisabled) {
            answer1Button.setDisabled(isDisabled);
            answer2Button.setDisabled(isDisabled);
            answer3Button.setDisabled(isDisabled);
            answer4Button.setDisabled(isDisabled);
        }
    }
})();
