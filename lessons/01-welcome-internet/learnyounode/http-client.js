var http = require("http");
var printData = function (response) {
  response.setEncoding("utf8");
  response.on("data", console.log);
};
http.get(process.argv[2], printData);
