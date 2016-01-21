var bl = require("bl");
var http = require("http");
var collectData = function (response) {
  response.pipe(bl(function (error, data) {
    if (error)
      return console.error(error);
    data = data.toString();
    console.log(data.length);
    console.log(data);
  }));
};
http.get(process.argv[2], collectData);
