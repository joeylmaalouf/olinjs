var home = function(req, res) {
  res.render("home", {"links": [
    "/cats",
    "/cats/new",
    "/cats/delete/old",
    "/cats/bycolor/black",
    "/cats/bycolor/gray",
    "/cats/bycolor/white",
    "/cats/bycolor/orange"
  ]});
};

module.exports.home = home;
