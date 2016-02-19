// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

angular.module('starter', ['ionic'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Stuff in here
  });
})
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('questions', {
      url: '/questions/',
      templateUrl: 'templates/questions.html',
      controller: 'QuestionsController'
    })
    .state('question', {
      url: '/questions/:id/',
      templateUrl: 'templates/question.html',
      controller: 'QuestionController'
    });
  $urlRouterProvider.otherwise('/questions/');
})
.controller("QuestionsController", function($scope, $http, $location, $ionicModal) {
  initModalWindow($ionicModal, $scope);
  /**Get List**/
  questionProcessor.getList($http, $scope);
  /**Create**/
  $scope.saveModal = function() {
    data.id = questionProcessor.add($http, $scope, {
      title: $scope.data.title,
      description: $scope.data.description
    });
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
})
.controller("QuestionController", function($scope, $http, $location, $stateParams, $ionicModal) {
  initModalWindow($ionicModal, $scope);
  /**Get**/
  questionProcessor.get($http, $scope, $stateParams.id);
  /**Update**/
  $scope.saveModal = function() {
    questionProcessor.update($http, $scope, $stateParams.id);
  };
  /**Go back**/
  $scope.back = function (){
    $location.url("/questions/");
  };
});
