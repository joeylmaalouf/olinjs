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
  Ingredient.find({}, null, {"sort": {"price": -1}}, function(err, data) {
    if (err) return console.log(err);
    var processed = [];
    data.forEach(function (element) {
      element = element.toObject();
      element.price = element.price.toFixed(2);
      processed.push(element);
    });
    res.render("ingredients", {
      "ingredients": processed
    });
  });
};

routes.setOutOfStock = function (req, res) {
  Ingredient.update({"_id": req.body.id}, {"inStock": false}, function (err, data) {
    if (err) return console.log(err);
    res.end(req.body.id);
  });
};

routes.setInStock = function (req, res) {
  Ingredient.update({"_id": req.body.id}, {"inStock": true}, function (err, data) {
    if (err) return console.log(err);
    res.end(req.body.id);
  });
};

routes.addIngredient = function (req, res) {
  req.body.inStock = true;
  Ingredient.create(req.body, function (err, data) {
    if (err) return console.log(err);
    res.json(data.toObject());
  });
};

routes.editIngredient = function (req, res) {
  if (req.body.name || req.body.price) {
    Ingredient.findById(req.body.id, function (err, data) {
      if (err) return console.log(err);
      if (req.body.name) {
        data.name = req.body.name;
      }
      if (req.body.price) {
        data.price = req.body.price;
      }
      data.save(function (err) {
        if (err) return console.log(err);
        res.json(data.toObject());
      });
    });
  }
  else {
    res.end("");
  }
};

routes.removeIngredient = function (req, res) {
  Ingredient.remove({"_id": req.body.id}, function (err) {
    if (err) return console.log(err);
    res.end(req.body.id);
  });
};

module.exports = routes;
