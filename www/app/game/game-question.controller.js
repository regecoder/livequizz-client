(function(){
    'use strict';

    angular
        .module('myApp')
        .controller('GameQuestionController', GameQuestionController);

    GameQuestionController.$inject = ['$state'];

    function GameQuestionController($state) {

        var vm = this;

        vm.onClickAnswer1Button = function() {
            $state.go('game-results');

        };

        vm.onClickAnswer2Button = function() {
        };

        vm.onClickAnswer3Button = function() {
        };

        vm.onClickAnswer4Button = function() {
        };
    }
})();
