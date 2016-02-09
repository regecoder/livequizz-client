(function(){
    'use strict';

    angular
        .module('myApp')
        .controller('UserChooseGameController', UserChooseGameController);

    UserChooseGameController.$inject = ['$state'];

    function UserChooseGameController($state) {

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
