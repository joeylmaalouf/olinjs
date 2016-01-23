var express = require("express");
var index = require("./routes/index");
var app = express();

app.get("/", index.home);
app.get("/greet/:person", index.greet);

app.listen(3000);
