var http = require("http");
var url = require("url");
var server = http.createServer(function (request, response) {
  response.writeHead(200, { "Content-Type": "application/json" });
  var urlObj = url.parse(request.url, true);
  var path = urlObj.pathname;
  var time = urlObj.query.iso;
  response.end(JSON.stringify(function () {
    if (path === "/api/parsetime") {
      var date = new Date(time);
      return {
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds()
      };
    }
    else if (path === "/api/unixtime") {
      return {
        unixtime: Date.parse(time)
      };
    }
  }()));
});
server.listen(Number(process.argv[2]));
