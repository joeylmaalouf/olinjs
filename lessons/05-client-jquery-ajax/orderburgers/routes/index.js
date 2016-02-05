var mongoose = require("mongoose");
var Ingredient = require("../models/ingredientModel");
var Order = require("../models/orderModel");

var routes = {};

routes.home = function (req, res) {
  res.render("home", {
    "text": "Welcome to Jessica's Burgers!"
  });
};

routes.ingredients = function (req, res) {
  Ingredient.find({}, function(err, data) {
    if (err) return console.log(err);
    var processed = [];
    data.forEach(function (element) {
      element = element.toObject();
      element.price = "$" + (element.price / 100).toFixed(2);
      processed.push(element);
    });
    res.render("ingredients", {
      "ingredients": processed
    });
  });
};

routes.setOutOfStock = function (req, res) {
  Ingredient.update({"_id": req.body.id}, {"inStock": false}, function(err, num, data) {
    res.end(req.body.id);
  });
};

routes.setInStock = function (req, res) {
  Ingredient.update({"_id": req.body.id}, {"inStock": true}, function(err, num, data) {
    res.end(req.body.id);
  });
};

module.exports = routes;
