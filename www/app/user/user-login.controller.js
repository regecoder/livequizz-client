/*globals loginButton */

(function(){
    'use strict';

    angular
        .module('myApp')
        .controller('UserLoginController', UserLoginController);

    UserLoginController.$inject = ['$state', 'socket', 'localStorageService'];

    function UserLoginController($state, socket, localStorageService) {

        var vm = this;

        var user;

        vm.onChangePseudo = setLoginButtonState;
        vm.onClickLoginButton = userLogin;

        user = localStorageService.get('user') || {};
        vm.pseudo = user.pseudo;

        angular.element(document).ready(initPage);

        socket.on('userLogged', userLogged);
        socket.on('userPseudoNotAvailable', userPseudoNotAvailable);

        function initPage() {

            setLoginButtonState();
        }

        function setLoginButtonState() {
            var loginButtonDisabled = (_.isUndefined(vm.pseudo) || _.isEmpty(vm.pseudo));
            loginButton.setDisabled(loginButtonDisabled);
        }

        function userLogin() {
            console.log('userLogin: ' + vm.pseudo);
            
            var data = {
                userPseudo: vm.pseudo
            };
            socket.emit('userLogin', data);
        }

        function userLogged() {

            var user = localStorageService.get('user') || {};
            user.pseudo = vm.pseudo;
            localStorageService.set('user', user);

            $state.go('game-choose');   
        }

        function userPseudoNotAvailable() {
            // TODO
        }
    }
})();
