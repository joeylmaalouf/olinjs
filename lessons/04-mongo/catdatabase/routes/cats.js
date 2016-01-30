var Cat = require("../models/catModel.js");

var colors = ["black", "gray", "white", "orange"];
var names = ["Gizmo", "Mittens", "Lucy", "Bella", "Jasper"];

var cats = {};

var randInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

var randChoice = function (list) {
    return list[randInt(0, list.length - 1)];
};

cats.new = function (req, res) {
  var cat = Cat({
    name: randChoice(names),
    age: randInt(2, 16),
    colors: []
  });
  for (var i = 0; i < randInt(2, 3); ++i) {
    var color = randChoice(colors);
    if (cat.colors.indexOf(color) === -1) {
      cat.colors.push(color);
    }
  }
  cat.save(function (err, cat) {
    if (err) console.log(err);
  });
  res.render("cats", {
    message: "We've adopted a new cat!",
    cats: [cat]
  });
};

cats.delete = function (req, res) {
  Cat.findOneAndRemove({}, {sort: {age: -1}}, function (err, cat) {
    if (err) return console.log(err);
    res.render("cats", {
      message: cat ? "We've lost our oldest cat..." : "There are no cats left...",
      cats: cat ? [cat] : null
    });
  });
};

cats.list = function (req, res) {
  var color;
  if (req.params.color) {
    color = req.params.color.toLowerCase();
    Cat.find({colors: color}).sort({age: -1}).exec(function (err, cats) {
      if (err) return console.log(err);
      res.render("cats", {
        message: "Cats sorted by age, with " + color + " coloring:",
        cats: cats
      });
    });
  }
  else {
    Cat.find({}).sort({age: -1}).exec(function (err, cats) {
      if (err) return console.log(err);
      res.render("cats", {
        message: "Cats sorted by age",
        cats: cats
      });
    });
  }
};

module.exports = cats;
