var express = require("express");
var exphbs = require("express-handlebars");
var path = require("path");
var mongoose = require("mongoose");
var index = require("./routes/index");
var cats = require("./routes/cats");

var app = express();

var PORT = process.env.PORT || 3000;

mongoose.connect("mongodb://localhost/test");

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", index.home);
app.get("/cats", cats.list);
app.get("/cats/new", cats.new);
app.get("/cats/delete/old", cats.delete);
app.get("/cats/bycolor/:color", cats.list);
app.get("/cats/between/:age1/:age2", cats.list);

app.listen(PORT, function() {
  console.log("Application running on port:", PORT);
});
