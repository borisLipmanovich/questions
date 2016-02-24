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
.controller("QuestionsController", QuestionsController)
.controller("QuestionController", QuestionController)
.factory("QuestionProcessor", questionFactory);