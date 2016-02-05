var mongoose = require("mongoose");

var orderSchema = mongoose.Schema({
  name: String,
  ingredients: Array
});

module.exports = mongoose.model("Order", orderSchema, "orders");
