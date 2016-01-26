var home = function(req, res) {
  res.render("home", {"classes": [
    {name: "Olin.js", teacher: "lots of people"},
    {name: "Discrete", teacher: "Rehana"},
    {name: "Spanish", teacher: "Fernando"},
    {name: "UOCD", teacher: "lots of people"}
  ]});
};

module.exports.home = home;
