var mongoose = require("mongoose");

var twoterUserSchema = mongoose.Schema({
  username: String,
  loggedIn: Boolean
});

module.exports = mongoose.model("TwoterUser", twoterUserSchema, "twoterUsers");
