var fs = require("fs");
var printLines = function (error, data) {
  console.log(data.toString().split("\n").length - 1);
};
fs.readFile(process.argv[2], printLines)
