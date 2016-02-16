var Twote = require("../models/twoteModel");
var TwoterUser = require("../models/twoterUserModel");

var routes = {};

routes.home = function (req, res) {
  Twote.find({}, null, {"sort": {"date": -1}}, function(err, data) {
    if (err) return console.log(err);
    var users = [];
    data.forEach(function (element) {
      if (users.indexOf(element.author) < 0) {
        users.push(element.author);
      }
    });
    res.render("home", {
      "twotes": data,
      "users": users
    });
  });
};

routes.logIn = function (req, res) {
  TwoterUser.findOne({"username": req.body.username}, function (err, data) {
    if (err) return console.log(err);
    if (data) {
      data.loggedIn = true;
      data.save();
      res.json(data.toObject());
    }
    else {
      TwoterUser.create(req.body, function (err, data) {
        if (err) return console.log(err);
        res.json(data.toObject());
      });
    }
  });
};

routes.logOut = function (req, res) {
  TwoterUser.update({"username": req.body.username}, {"loggedIn": false}, {"multi": true}, function (err, data) {
    if (err) return console.log(err);
    res.end("");
  });
};

routes.makeTwote = function (req, res) {
  Twote.create(req.body, function (err, data) {
    if (err) return console.log(err);
    res.json(data.toObject());
  });
};

routes.deleteTwote = function (req, res) {
  Twote.remove({
    "_id": req.body.id,
    "author": req.body.username
  }, function (err) {
    if (err) return console.log(err);
    res.json(req.body);
  });
};

module.exports = routes;
