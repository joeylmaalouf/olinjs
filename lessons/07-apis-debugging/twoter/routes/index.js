var Twote = require("../models/twoteModel");
var TwoterUser = require("../models/twoterUserModel");

var routes = {};

routes.home = function (req, res) {
  if (req.session.passport) {
    Twote.find({}, null, {"sort": {"date": -1}}, function (err, twotes) {
      if (err) return console.log(err);
      TwoterUser.find({}, null, {}, function (err, users) {
        if (err) return console.log(err);
        var usernames = [];
        users.forEach(function (element) {
            usernames.push(element.username);
        });
        res.render("home", {
          "loggedIn": true,
          "name": req.session.passport.user.username,
          "twotes": twotes,
          "users": usernames
        });
      });
    });
  }
  else {
    res.render("home", {
      "loggedIn": false,
      "name": "Guest",
      "twotes": [],
      "users": []
    });
  }
};

routes.makeTwote = function (req, res) {
  if (req.session.passport) {
    req.body.author = req.session.passport.user.username;
    TwoterUser.count({"username": req.body.author}, function (err, count) {
      if (!count) {
        TwoterUser.create({
          "username": req.body.author,
          "loggedIn": true
        }, function (err, twoterUser) {
          if (err) return console.log(err);
        });
      }
    });
    Twote.create(req.body, function (err, twote) {
      if (err) return console.log(err);
      res.json(twote.toObject());
    });
  }
};

routes.deleteTwote = function (req, res) {
  Twote.remove({
    "_id": req.body.id,
    "author": req.session.passport.user.username
  }, function (err, obj) {
    if (err) return console.log(err);
    res.json({
      "id": req.body.id,
      "successful": obj.result.n === 1
    });
  });
};

module.exports = routes;
