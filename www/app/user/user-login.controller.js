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
            var isLoginButtonDisabled = (_.isUndefined(vm.pseudo) || _.isEmpty(vm.pseudo));
            loginButton.setDisabled(isLoginButtonDisabled);
        }

        function userLogin() {
            console.log('userLogin: ' + vm.pseudo);
            
            var data = {
                userPseudo: vm.pseudo
            };
            socket.emit('userLogin', data);
        }

        function userLogged() {

            var clientUser,
                data;

            clientUser = localStorageService.get('user') || {};
            clientUser.pseudo = vm.pseudo;
            localStorageService.set('user', clientUser);

            data = {
                clientUser: clientUser
            };

            $state.go('game-choose', data);   
        }

        function userPseudoNotAvailable() {
            // TODO
        }
    }
})();
