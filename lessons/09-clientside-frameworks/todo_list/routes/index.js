var path = require("path");
var Task = require("../models/taskModel");

var routes = {};

routes.home = function (req, res) {
  res.sendFile("main.html", { "root": path.join(__dirname, "../public") });
};

routes.getTasks = function (req, res) {
  Task.find({}, null, null, function (err, tasks) {
    if (err) return console.log(err);
    res.json(tasks);
  });
};

routes.makeTask = function (req, res) {
  var data = {
    "text": req.body.text,
    "completed": false
  };
  Task.create(data, function (err, task) {
    if (err) return console.log(err);
    res.json(task);
  });
};

routes.deleteTask = function (req, res) {
  Task.findOneAndRemove({"_id": req.body.id}, null, function (err, task) {
    if (err) return console.log(err);
    res.json(req.body);
  });
};

routes.editTask = function (req, res) {
  Task.findOneAndUpdate({"_id": req.body.id}, {"text": req.body.text}, null, function (err, task) {
    if (err) return console.log(err);
    res.json(task);
  });
};

routes.toggleTask = function (req, res) {
  Task.findById(req.body.id, function (err, task) {
    if (err) return console.log(err);
    task.completed = !task.completed;
    task.save(function (err) {
      if (err) return console.log(err);
    });
    res.json(task);
  });
};

module.exports = routes;
