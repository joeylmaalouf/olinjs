var express = require("express");
var exphbs = require("express-handlebars");
var path = require("path");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

var index = require("./routes/index");

var PORT = process.env.PORT || 3000;
var MONGOURI = process.env.MONGOURI || "mongodb://localhost/test";

var app = express();

mongoose.connect(MONGOURI);

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", index.home);

app.post("/logIn", index.logIn);
app.post("/logOut", index.logOut);
app.post("/makeTwote", index.makeTwote);
app.post("/deleteTwote", index.deleteTwote);

app.listen(PORT, function() {
  console.log("Application running on port: " + PORT);
});
