(function(){
    'use strict';

    angular
        .module('myApp')
        .controller('InitPageController', InitPageController);

    // InitPageController.$inject = ['$state', '$cordovaNetwork', 'socket', 'onsen'];

    // function InitPageController($state, $cordovaNetwork, socket, ons) {

    InitPageController.$inject = ['$state', 'socket'];

    function InitPageController($state, socket) {

        $state.go('user-login');


        var vm = this;

        // var networkIsOnline = $cordovaNetwork.isOnline();
        // var networkIsOnline = false;\

        // angular.element(document).ready(checkNetworkConnection);


    // ons.ready(function() {
    //   ons.createPopover('menu.html').then(
    //     function(popover) {
    //       $scope.menu = popover;
    //     }
    //   );
    // });




        function checkNetworkConnection() {
            console.log('checkNetworkConnection');

            // var networkIsOnline = $cordovaNetwork.isOnline();
            var networkIsOnline = false;

            if (networkIsOnline === false) {
                // ons.notification.alert({
                //     message: 'Problème de connexion au serveur. Vérifiez la connexion.',
                //     modifier: 'material'
                // });
            }
        }




            // socket.on('connected', function(){console.log('connected');});
            // socket.on('messagereceived', function(){console.log('messagereceived');});

            // socket.on('messagereceived', function(){console.log('messagereceived2');});
            // socket.on('messagereceived', function(){console.log('messagereceived3');});
                

        vm.onClickTempButton = function() {
        // socket.emit('sendmessage', vm.login);
        // console.log('client:emit:' + vm.login);
            $state.go('user-login');
                // ons.notification.alert({
                //     message: 'Problème de connexion au serveur. Vérifiez la connexion.',
                //     modifier: 'material'
                // });



        };
    }
})();
