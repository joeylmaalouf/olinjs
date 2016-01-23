var home = function(req, res) {
  res.send("Welcome home!");
};

var greet = function(req, res) {
  res.send("Hello, " + req.params.person + "!");
};

module.exports.home = home;
module.exports.greet = greet;
