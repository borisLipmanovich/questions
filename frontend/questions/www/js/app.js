// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var url = 'http://127.0.0.1:8000'; //service url
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
    /*Get Questions*/
    $http({
      method: 'GET',
      url: url + '/questions/',
      headers: {'Content-Type': 'application/json; charset=utf-8'}
    }).
    success(function(data) {
      $scope.data = data;
    }).
    error(function() {
      console.log('Can not get the questions from the server');
    });

    $ionicModal.fromTemplateUrl('templates/modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal
    });

    /*Add Question Modal*/
    $scope.openModal = function() {
      $scope.modal.show()
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    $scope.saveModal = function() {
      console.log($scope.data.newQuestion);
        $http({
          method: 'POST',
          data: $scope.data.newQuestion,
          url: url + '/questions/',
          headers: {'Content-Type': 'application/json; charset=utf-8'}
        }).
        success(function () {
          window.location.reload(true)
        }).
        error(function() {
          console.log('Can not add the question');
        });
      $scope.modal.hide();
    };
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    $scope.showQuestion = function (id){
      $location.path("/questions/" + id + "/");
    };
    $scope.deleteQuestion = function (id){
      $http({
        method: 'DELETE',
        url: url + '/questions/' + id + '/',
        headers: {'Content-Type': 'application/json; charset=utf-8'}
      }).
      success(function () {
        window.location.reload(true)
      }).
      error(function() {
        console.log('Can not delete the question');
      });
      $scope.modal.hide();
    };
  })
  .controller("QuestionController", function($scope, $http, $location, $stateParams, $ionicModal) {
    /*Get Question*/
    $http({
      method: 'GET',
      url:  url + '/questions/' + $stateParams.id + '/',
      headers: {'Content-Type': 'application/json; charset=utf-8'}
    }).
    success(function(data) {
      $scope.data = data;
    }).
    error(function() {
      console.log('Can not get the questions from the server');
    });

    /*Update Question Modal*/
    $ionicModal.fromTemplateUrl('templates/modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal
    });
    $scope.openModal = function() {
      $scope.modal.show()
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    $scope.saveModal = function() {
      $http({
        method: 'PUT',
        data: $scope.data,
        url: url + '/questions/' + $stateParams.id + '/',
        headers: {'Content-Type': 'application/json; charset=utf-8'}
      }).
      error(function() {
        console.log('Can not update the question');
      });
      $scope.modal.hide();
    };
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    $scope.back = function (){
      $location.path("/questions/");
    };
  });

