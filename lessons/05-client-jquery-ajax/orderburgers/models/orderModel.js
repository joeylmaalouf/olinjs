var mongoose = require("mongoose");

// FYI - Can also specify Array type as [String]
var orderSchema = mongoose.Schema({
  name: String,
  ingredients: Array,
  price: Number
});

module.exports = mongoose.model("Order", orderSchema, "orders");
