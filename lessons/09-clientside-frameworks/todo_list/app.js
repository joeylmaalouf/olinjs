var express = require("express");
var path = require("path");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var index = require("./routes/index");

var app = express();

var MONGOURI = process.env.MONGOURI || "mongodb://localhost/test";
var PORT = process.env.PORT || 3000;

mongoose.connect(MONGOURI);

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", index.home);
app.get("/getTasks", index.getTasks);
app.post("/makeTask", index.makeTask);
app.post("/deleteTask", index.deleteTask);
app.post("/editTask", index.editTask);
app.post("/toggleTask", index.toggleTask);

app.listen(PORT, function () {
  console.log("Application running on port:", PORT);
});
