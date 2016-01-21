var fs = require("fs");
var path = require("path");
var filteredList = function (error, list) {
  list.forEach( function (name) {
    if (path.extname(name) === "." + process.argv[3])
      console.log(name);
  });
};
fs.readdir(process.argv[2], filteredList)
