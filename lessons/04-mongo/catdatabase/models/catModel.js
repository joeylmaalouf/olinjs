var mongoose = require("mongoose");

var catSchema = mongoose.Schema({
  name: String,
  age: Number,
  colors: [String]
});

module.exports = mongoose.model("Cat", catSchema, "cats"); //cats is unnecessary as the collection name will be the pluralized lowercase first paramater. 
