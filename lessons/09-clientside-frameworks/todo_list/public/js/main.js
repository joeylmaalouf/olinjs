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
  $scope.filterVal = null;
  $scope.getTasks = function () {
    $http.get("/getTasks").then(
      function (res) { $scope.tasks = res.data; },
      function (err) { console.log("Error: " + err); }
    );
  };
  $scope.makeTask = function () {
    $http.post("/makeTask", {"text": $scope.textInput}).then(
      function (res) { $scope.getTasks(); },
      function (err) { console.log("Error: " + err); }
    );
    $scope.textInput = "";
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
  $scope.toggleTask = function (id) {
    $http.post("/toggleTask", {"id": id}).then(
      function (res) { $scope.getTasks(); },
      function (err) { console.log("Error: " + err); }
    );
  };
  $scope.filterTasks = function (completed, reset) {
    if (reset) { $scope.filterVal = null; }
    else { $scope.filterVal = completed; }
  };
  $scope.getTasks();
});
