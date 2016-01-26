var home = function(req, res) {
  var d = new Date();
  var answer = (d.getMonth() == 11 && d.getDate() == 25) ? "YES" : "NO";
  res.render("index", {"answer": answer});
};

module.exports.home = home;
