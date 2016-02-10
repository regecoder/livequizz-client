(function(){
    'use strict';

    angular
        .module('myApp')
        .controller('SlidingMenuPageController', SlidingMenuPageController);

    SlidingMenuPageController.$inject = ['$rootScope', '$stateParams'];

    function SlidingMenuPageController($rootScope, $stateParams) {

        var vm = this;

        var mainPage,
            slidingMenuSetMainPageOptions;

        mainPage  = $stateParams.mainPage;
        slidingMenuSetMainPageOptions = {
            callback: slidingMenuSetMainPageCallback
        };
        $rootScope.onsSlidingMenu.setMainPage(mainPage, slidingMenuSetMainPageOptions);

        // Le swip du menu est désactivé pendant l'affichage des pages accessibles par le menu.
        // Il provoque un bug sur le bouton back quand il est utilisé plusieurs fois
        // pendant la consultation de ces pages.
        // Le navigateur onsen ne permet pas de supprimer une page dans la stack,
        // fonctionnalité nécessaire ici.

        function slidingMenuSetMainPageCallback() {
            $rootScope.onsNavigator.on('postpop', navigatorOnPostPop);
        }

        function navigatorOnPostPop() {
            $rootScope.onsSlidingMenu.setSwipeable(true);
        }

        vm.navigatorOptions = {
            animation: 'slide'
        };

        vm.onClickMenuItem = function(menuItemName) {

            var pageUrl;

            switch (menuItemName) {
                case 'profile':
                    pageUrl = 'app/user/user-profile.html';
                    break;
            }
            $rootScope.onsSlidingMenu.setSwipeable(false);
            $rootScope.onsSlidingMenu.closeMenu();
            $rootScope.onsNavigator.pushPage(pageUrl, vm.navigatorOptions);
        };
    }
})();
