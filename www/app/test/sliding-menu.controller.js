(function(){
    'use strict';

    angular
        .module('myApp')
        .controller('SlidingMenuController', SlidingMenuController);

    SlidingMenuController.$inject = ['$rootScope', '$stateParams'];

    function SlidingMenuController($rootScope, $stateParams) {

        var vm = this;

        var mainPage;

        mainPage  = $stateParams.mainPage;

    // ons.ready(function() {
        console.log('regis');
      // Actually myNavigator object sits in the root scope
        $rootScope.onsSlidingMenu.setMainPage(mainPage);
    // });




    }
})();
