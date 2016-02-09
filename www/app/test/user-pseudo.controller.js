(function(){
    'use strict';

    angular
        .module('myApp')
        .controller('UserPseudoController', UserPseudoController);

    UserPseudoController.$inject = ['$scope', 'quizService'];

    function UserPseudoController($scope, quizService) {

        var myQuiz;

        myQuiz = quizService.get({id: 2}, function() {
        // $scope.pseudo = 'regis';
        });
        $scope.pseudo = myQuiz.name;

        // console.log(myQuiz);

        $scope.quiz = myQuiz;

        $scope.title = 'Samuel';
        // $scope.pseudo = myQuiz.length;

        $scope.onSubmit = function() {
            onsNavigator.resetToPage('app/user/user1.html');
        };
    }
})();
