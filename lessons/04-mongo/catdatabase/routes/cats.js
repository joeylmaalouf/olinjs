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
  /*It is hard to know when to use new. Generally, it is good practice to use it with a constructor.
  Mongoose models are just special constructors, so you should use new. Obviously this didn't cause an error,
  but there might be some small difference between the two that you might see.*/
  var cat = new Cat({
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
  //mongoose method of a model that finds the first one of the model (in this case sorted by age), 
  //deletes it form db, and passes it into the callback.
  Cat.findOneAndRemove({}, {sort: {age: -1}}, function (err, cat) {
    if (err) return console.log(err); //Error handling generally should do more than just log the error. 
    res.render("cats", {
      message: cat ? "We've lost our oldest cat..." : "There are no cats left...",//ternary operator = Nice
      cats: cat ? [cat] : null
    });
  });
};

cats.list = function (req, res) {
  if (req.params.color) {
    var color = req.params.color.toLowerCase();
    Cat.find({colors: color}).sort({age: -1}).exec(function (err, cats) {
      if (err) return console.log(err);
      res.render("cats", {
        message: "Cats sorted by age, with " + color + " coloring:",
        cats: cats
      });
    });
  }
  else if (req.params.age1 && req.params.age2) {
    var age1 = Number(req.params.age1);
    var age2 = Number(req.params.age2);
    Cat.find({age: {$gte: age1, $lte: age2}}).sort({age: -1}).exec(function (err, cats) {
      if (err) return console.log(err);
      res.render("cats", {
        message: "Cats sorted by age, between " + age1 + " and " + age2 + " years old:",
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
