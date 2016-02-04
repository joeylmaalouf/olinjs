//Ties in modules 
var express = require("express"); //Handles requests, responses, and many other things for us
var exphbs = require("express-handlebars"); //Our templater
var path = require("path"); //Makes it easier to describe location of things
//Ties in your modules
var index = require("./routes/index"); 
var cats = require("./routes/cats");

var app = express(); //Creates server

var PORT = process.env.PORT || 3000; //Use environment variable or 3000
//Set up middleware for express to use. 
app.engine("handlebars", exphbs({defaultLayout: "main"})); //allows us to use our handlebars to template
app.set("view engine", "handlebars"); //render will use handlebars
app.use(express.static(path.join(__dirname, "public"))); //make public file reachable for requests
//The routes your server handles
app.get("/", index.home);
app.get("/cats", cats.list);
app.get("/cats/new", cats.new);
app.get("/cats/delete/old", cats.delete);
app.get("/cats/bycolor/:color", cats.list);

app.listen(PORT, function() {
  console.log("Application running on port:", PORT);
});
