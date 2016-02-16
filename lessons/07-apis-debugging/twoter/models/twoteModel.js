var mongoose = require("mongoose");

var twoteSchema = mongoose.Schema({
  author: String,
  text: String,
  date: Date
});

module.exports = mongoose.model("Twote", twoteSchema, "twotes");
