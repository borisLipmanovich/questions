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
    /*Get Questions*/
    questionProcessor.getList($http).
    success(function(data) {
      $scope.data = data;
    }).
    error(function() {
      console.log('Can not get the questions from the server');
    });

    modal.init($ionicModal, $scope);
    $scope.saveModal = function() {
      var data = {
        title: $scope.data.title,
        description: $scope.data.description
      };
      questionProcessor.add($http, data).
      success(function () {
        $scope.modal.hide();
        window.location.reload(true)
      }).
      error(function() {
        console.log('Can not add the question');
      });
    };

    $scope.showQuestion = function (id){
      $location.path("/questions/" + id + "/");
    };

    $scope.deleteQuestion = function (id){
      questionProcessor.delete($http, id).
      success(function () {
        $scope.modal.hide();
        window.location.reload(true)
      }).
      error(function() {
        console.log('Can not delete the question');
      });
    };
  })
  .controller("QuestionController", function($scope, $http, $location, $stateParams, $ionicModal) {
    /*Get Question*/
    questionProcessor.get($http, $stateParams.id).
    success(function(data) {
      $scope.data = data;
    }).
    error(function() {
      console.log('Can not get the questions from the server');
    });

    /*Update Question Modal*/
    modal.init($ionicModal, $scope);
    $scope.saveModal = function() {
      questionProcessor.update($http, $scope.data, $stateParams.id).
      success(function(){
          $scope.modal.hide();
        }).
      error(function() {
        console.log('Can not update the question');
      });
    };

    $scope.back = function (){
      $location.path("/questions/");
    };
  });


var modal = {
  init: function ($ionicModal, $scope) {
    $ionicModal.fromTemplateUrl('/templates/modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal
    });
    $scope.openModal = function () {
      $scope.modal.show()
    };
    $scope.closeModal = function () {
      $scope.modal.hide();
    };
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
  }
};

var questionProcessor = {
  url: 'http://ec2-54-191-206-231.us-west-2.compute.amazonaws.com:8000',
  getList: function( $http ) {
    return $http({
      method: 'GET',
      url: this.url + '/questions/',
      headers: {'Content-Type': 'application/json; charset=utf-8'}
    })
  },
  get: function ( $http, id ) {
    return $http({
      method: 'GET',
      url: this.url + '/questions/' + id,
      headers: {'Content-Type': 'application/json; charset=utf-8'}
    })
  },
  add: function ($http, data) {
    return $http({
      method: 'POST',
      data: data,
      url: this.url + '/questions/',
      headers: {'Content-Type': 'application/json; charset=utf-8'}
    })
  },
  delete: function($http, id){
    return $http({
      method: 'DELETE',
      url: this.url + '/questions/' + id + '/',
      headers: {'Content-Type': 'application/json; charset=utf-8'}
    })
  },
  update: function ($http, data, id) {
    return $http({
      method: 'PUT',
      data: data,
      url: this.url + '/questions/' + id + '/',
      headers: {'Content-Type': 'application/json; charset=utf-8'}
    })
  }
};
