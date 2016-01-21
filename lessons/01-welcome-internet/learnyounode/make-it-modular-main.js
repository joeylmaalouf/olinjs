var filteredList = require("./make-it-modular-module.js");
var printFiltered = function (error, data) {
  if (error)
    console.log("Error!");
  else
    data.forEach(function (name) { console.log(name); });
}
filteredList(process.argv[2], process.argv[3], printFiltered);
