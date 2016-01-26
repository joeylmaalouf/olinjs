var express = require("express");
var exphbs = require("express-handlebars");
var path = require("path");
var favicon = require("serve-favicon");
var index = require("./routes/index");
var app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.get("/", index.home);

app.listen(3000);
