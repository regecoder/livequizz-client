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

        socket.on('quizQuestion', quizQuestion);
        socket.on('quizQuestionTETick', quizQuestionTETick);
        socket.on('quizEnd', quizEnd);


        vm.onClickAnswer1Button = function() {
            // $state.go('game-results');
            // console.log('answerButton1');

        };

        vm.onClickAnswer2Button = function() {
            // console.log('answerButton2');
        };

        vm.onClickAnswer3Button = function() {
            // console.log('answerButton3');
        };

        vm.onClickAnswer4Button = function() {
            // console.log('answerButton4');
        };

        function quizQuestion(data) {
            console.log('quizQuestionStarted:' + data.questionIndex);

            var myRoundClone = data.gameClone.rounds[data.gameClone.roundIndex]; 

            vm.gameId = data.gameClone.id;
            vm.quizName = myRoundClone.quiz.theme;
            vm.questionIndex = data.questionIndex;
            vm.question = myRoundClone.quiz.questions[data.questionIndex].question;
        }   

        function quizQuestionTETick(data) {
            vm.time = data.currentTime;
            console.log('currentTime:' + data.currentTime);   
            console.log('totalTime:' + data.totalTime);   
        }

        function quizEnd() {
            var data = {
                gameId: vm.gameId,
                user: $stateParams.user
            };
            $state.go('game-results', data);  
        }
    }
})();
