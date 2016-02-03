var path = require("path");

var getCat = function (req, res) {
  var imageLocation;
  var happyCat = "images/cat.jpg";
  var grumpyCat = "images/grumpy.jpeg";
  switch (req.query.mood) {
    case "happy":
      imageLocation = req.xhr ? happyCat: path.join(__dirname,"../public/", happyCat);
      break;
    case "grumpy":
      imageLocation = req.xhr ? grumpyCat: path.join(__dirname, "../public/", grumpyCat);
      break;
  }
  res.send({
    name: req.query.name,
    imgpath: imageLocation
  });
}

module.exports = getCat;
