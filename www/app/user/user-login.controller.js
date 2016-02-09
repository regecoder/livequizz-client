(function(){
    'use strict';

    angular
        .module('myApp')
        .controller('UserLoginController', UserLoginController);

    UserLoginController.$inject = ['$state'];

    function UserLoginController($state) {

        var vm = this;

        vm.onClickLoginButton = function() {
            console.log('onClickLoginButton');
            $state.go('user-choose-game');
        };
    }
})();
