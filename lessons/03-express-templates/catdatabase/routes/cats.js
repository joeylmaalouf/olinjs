var db = require("../fakeDatabase");

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
  var cat = {
    name: randChoice(names),
    age: randInt(2, 16),
    colors: []
  };
  for (var i = 0; i < randInt(2, 3); ++i) {
    var color = randChoice(colors);
    if (cat.colors.indexOf(color) === -1) {
      cat.colors.push(color);
    }
  }
  db.add(cat);
  res.render("cats", {
    message: "We've adopted a new cat!",
    cats: [cat]
  });
};

cats.delete = function (req, res) {
  var message;
  var cats;
  if (db.data.length > 0) {
    db.data.sort(function (a, b) {
      return b.age - a.age;
    });
    message = "We've lost our oldest cat..."
    cats = db.remove(0);
  }
  else {
    message = "There are no cats left..."
    cats = null;
  }
  res.render("cats", {
    message: message,
    cats: cats
  });
};

cats.list = function (req, res) {
  var color;
  var message;
  var cats;
  db.data.sort(function (a, b) {
    return b.age - a.age;
  });
  if (req.params.color) {
    color = req.params.color.toLowerCase();
    message = "Cats sorted by age, with " + color + " coloring:";
    cats = db.data.filter(function (val) {
      return val.colors.indexOf(color) !== -1;
    });
  }
  else {
    color = null;
    message = "Cats sorted by age:";
    cats = db.data;
  }
  res.render("cats", {
    message: message,
    cats: cats
  });
};

module.exports = cats;
