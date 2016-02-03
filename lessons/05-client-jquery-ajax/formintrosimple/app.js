var express = require("express");
var path = require("path");
var exphbs  = require("express-handlebars");
var bodyParser = require("body-parser");

var index = require("./routes/index");
var getCat = require("./routes/getCat.js");

var app = express();

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get("/", index.home);
app.get("/getCat", getCat);

app.listen(3000);
