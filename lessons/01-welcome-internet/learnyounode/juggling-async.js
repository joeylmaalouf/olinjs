var bl = require("bl");
var http = require("http");
var count = 0;
var strings = [];

var asyncGet = function (i) {
  http.get(process.argv[i], function (response) {
    response.pipe(bl(function (error, data) {
      if (error)
        return console.error(error);
      ++count;
      strings[i] = data.toString();
      if (count == 3)
        for (var j = 2; j < 5; ++j)
          console.log(strings[j]);
    }));
  });
};

for (var i = 2; i < 5; ++i)
  asyncGet(i);
