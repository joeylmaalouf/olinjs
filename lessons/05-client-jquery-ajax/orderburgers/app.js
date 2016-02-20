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
app.get("/ingredients", index.ingredients);
app.get("/order", index.order);
app.get("/kitchen", index.kitchen);

app.post("/setOutOfStock", index.setOutOfStock);
app.post("/setInStock", index.setInStock);
app.post("/addIngredient", index.addIngredient);
app.post("/editIngredient", index.editIngredient);
app.post("/removeIngredient", index.removeIngredient);
app.post("/placeOrder", index.placeOrder);
app.post("/completeOrder", index.completeOrder);

app.listen(PORT, function() {
  console.log("Application running on port: " + PORT);
});


// Notes
// denote that when you place an order with no ingredients in it --> no order is possible to be placed