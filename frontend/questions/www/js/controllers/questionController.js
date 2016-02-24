function QuestionController($scope, $http, $stateParams, $ionicModal, $state, QuestionProcessor){
    initModalWindow($ionicModal, $scope);
    /**Get**/
    QuestionProcessor.get($http, $scope, $stateParams.id);
    /**Update**/
    $scope.saveModal = function() {
        QuestionProcessor.update($http, $scope, $stateParams.id);
    };

    /**Go back**/
    $scope.back = function (){
        $state.go("questions");
        //$location.path("/questions/");
        //window.location.reload();
    };
}