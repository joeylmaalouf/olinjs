var app = angular.module("myApp", ["ngRoute"]);

app.config(function ($routeProvider, $locationProvider) {
  $routeProvider.when("/", {
      templateUrl : "../views/hello.html",
      controller: "mainController"
    }).when("/next", {
      templateUrl : "../views/next.html",
      controller : "nextController"
    });
    $locationProvider.html5Mode(true);
});

app.controller("mainController", function ($scope, $http, $location) {
  $scope.helloMessage = "Hello, world!";
  $scope.nextButton = true;
  $scope.backButton = false;
});

app.controller("nextController", function ($scope, $http, $location) {
  $scope.helloMessage = "Hello again!";
  $scope.nextButton = false;
  $scope.backButton = true;
});
