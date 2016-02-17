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
            $state.go('game-results');

        };

        vm.onClickAnswer2Button = function() {
        };

        vm.onClickAnswer3Button = function() {
        };

        vm.onClickAnswer4Button = function() {
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
