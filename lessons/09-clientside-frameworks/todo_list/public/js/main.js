var app = angular.module("todo-list", ["ngRoute"]);

app.config(function ($routeProvider, $locationProvider) {
  $routeProvider.when("/", {
      templateUrl : "../views/todo.html",
      controller: "mainController"
    });
    $locationProvider.html5Mode(true);
});

app.controller("mainController", function ($scope, $http) {
  $scope.textInput = "";
  $scope.getTasks = function () {
    $http.get("/getTasks").then(
      function (res) { $scope.tasks = res.data; console.log(res); },
      function (err) { console.log("Error: " + err); }
    );
  };
  $scope.makeTask = function () {
    $http.post("/makeTask", {"text": $scope.textInput}).then(
      function (res) { $scope.getTasks(); },
      function (err) { console.log("Error: " + err); }
    );
  };
  $scope.deleteTask = function (id) {
    $http.post("/deleteTask", {"id": id}).then(
      function (res) { $scope.getTasks(); },
      function (err) { console.log("Error: " + err); }
    );
  };
  $scope.editTask = function (id, text) {
    $http.post("/editTask", {"id": id, "text": text}).then(
      function (res) { $scope.getTasks(); },
      function (err) { console.log("Error: " + err); }
    );
  };
  $scope.setActive = function (id) {
    $http.post("/setActive", {"id": id}).then(
      function (res) { $scope.getTasks(); },
      function (err) { console.log("Error: " + err); }
    );
  };
  $scope.setDone = function (id) {
    $http.post("/setDone", {"id": id}).then(
      function (res) { $scope.getTasks(); },
      function (err) { console.log("Error: " + err); }
    );
  };
  $scope.getTasks();
});
