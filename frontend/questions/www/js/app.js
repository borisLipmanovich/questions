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
    /**Get Questions**/
    questionProcessor.getList($http, $scope);
    modal.init($ionicModal, $scope);

    /**Create**/
    $scope.saveModal = function() {
      var data = {
        title: $scope.data.title,
        description: $scope.data.description
      };
      data.id = questionProcessor.add($http, $scope, data);

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
    /**Get**/
    questionProcessor.get($http, $scope, $stateParams.id);

    /**Update**/
    modal.init($ionicModal, $scope);
    $scope.saveModal = function() {
      questionProcessor.update($http, $scope, $stateParams.id);
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
  //url: 'http://127.0.0.1:8000',
  getList: function ($http, $scope) {
    $http({
      method: 'GET',
      url: this.url + '/questions/',
      headers: {'Content-Type': 'application/json; charset=utf-8'}
    }).
    success(function (data) {
      $scope.data = data;
    }).
    error(function () {
      $scope.status = status;
      console.log('Can not get the questions from the server');
    });
  },
  get: function ($http, $scope, id) {
    return $http({
      method: 'GET',
      url: this.url + '/questions/' + id,
      headers: {'Content-Type': 'application/json; charset=utf-8'}
    }).
    success(function (data) {
      $scope.data = data;
    }).
    error(function () {
      console.log('Can not get the questions from the server');
    });
  },
  add: function ($http, $scope, data) {
    return $http({
      method: 'POST',
      data: data,
      url: this.url + '/questions/',
      headers: {'Content-Type': 'application/json; charset=utf-8'}
    }).
    success(function (data) {
      $scope.data.push(data);
      $scope.modal.hide();
    }).
    error(function () {
      console.log('Can not add the question');
    });
  },
  delete: function ($http, $scope, id) {
    return $http({
      method: 'DELETE',
      url: this.url + '/questions/' + id + '/',
      headers: {'Content-Type': 'application/json; charset=utf-8'}
    }).
    success(function () {
      $scope.modal.hide();
    }).
    error(function () {
      console.log('Can not delete the question');
    });
  },
  update: function ($http, $scope, id) {
    return $http({
      method: 'PUT',
      data: $scope.data,
      url: this.url + '/questions/' + id + '/',
      headers: {'Content-Type': 'application/json; charset=utf-8'}
    }).
    success(function () {
      $scope.modal.hide();
    }).
    error(function () {
      console.log('Can not update the question');
    });
  }
};
