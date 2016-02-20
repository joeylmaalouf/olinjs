var app = angular.module("todo-list", ["ngRoute"]);

app.config(function ($routeProvider, $locationProvider) {
  $routeProvider.when("/", {
      templateUrl : "../views/hello.html",
      controller: "mainController"
    });
    $locationProvider.html5Mode(true);
});

app.controller("mainController", function ($scope, $http, $location) {
  $scope.helloMessage = "Hello, world!";
  $scope.aLink = true;
});
