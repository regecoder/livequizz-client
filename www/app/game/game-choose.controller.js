(function(){
    'use strict';

    angular
        .module('myApp')
        .controller('GameChooseController', GameChooseController);

    GameChooseController.$inject = ['$state'];

    function GameChooseController($state) {

        var vm = this;

        vm.onClickCreateButton = function() {
            console.log('onClickCreateButton');
            // $state.go('');
        };

        vm.onClickJoinButton = function() {
            console.log('onClickJoinButton');
            // $state.go('');
        };
    }
})();
