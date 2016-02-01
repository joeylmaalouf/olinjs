var home = function (req, res) {
  res.render("home", {"links": [
    "/cats",
    "/cats/new",
    "/cats/delete/old",
    "/cats/bycolor/black",
    "/cats/bycolor/gray",
    "/cats/bycolor/white",
    "/cats/bycolor/orange",
    "/cats/between/4/10"
  ]});
};

module.exports.home = home;
