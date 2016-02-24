function QuestionsController($scope, $http, $location, $ionicModal, $timeout, QuestionProcessor){
    initModalWindow($ionicModal, $scope);
    /**Get List**/
    QuestionProcessor.getList($http, $scope);

    /**Create**/
    $scope.saveModal = function() {
        var data = {
            title: $scope.data.title,
            description: $scope.data.description
        };
        data.id = QuestionProcessor.add($http, $scope, data);
    };
    /**GET**/
    $scope.showQuestion = function (id){
        $location.path("/questions/" + id + "/");
    };
    /**DELETE**/
    $scope.deleteQuestion = function (id){
        var item = $scope.data.splice(id, 1);
        questionProcessor.delete($http, $scope, item[0].id);
    };
}

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