var Robot = require("../models/robotModel.js");

var home = function (req, res) {
  Robot.find({}, function(err, robots) {
    if (err) {
      console.log(err);
    }
    else {
      res.render("home", {"robots": robots});
    }
  });
};

module.exports.home = home;
