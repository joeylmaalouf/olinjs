var mongoose = require("mongoose");

var twoteSchema = mongoose.Schema({
  author: String,
  text: String,
  date: Date
});

// is there a reason you are explicitly stating the colletion
module.exports = mongoose.model("Twote", twoteSchema, "twotes");
