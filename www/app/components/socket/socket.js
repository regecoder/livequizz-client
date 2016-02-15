/*globals io */


(function(){
    'use strict';

    angular
        .module('myApp')
        .factory('socket', socket);

    socket.$inject = ['socketFactory', 'configConstant'];

    function socket(socketFactory, configConstant) {

        var socketServerUrl;

        socketServerUrl = configConstant.socketServerUrl;

        return socketFactory({
            prefix: '',
            ioSocket: io.connect(socketServerUrl)

        });
    }
})();
