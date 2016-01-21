var fs = require("fs");
var path = require("path");
var filteredList = function (directory, extension, callback) {
  fs.readdir(directory, function (error, list) {
    if (error)
      return callback(error);
    list = list.filter( function (name) {
      return path.extname(name) === "." + extension;
    });
    callback(null, list);
  });
};
module.exports = filteredList;
