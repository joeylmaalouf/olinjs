var mongoose = require("mongoose");

var taskSchema = mongoose.Schema({
  text: String,
  completed: Boolean
});

module.exports = mongoose.model("Task", taskSchema, "tasks");
