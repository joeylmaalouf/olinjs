var express = require("express");
var exphbs = require("express-handlebars");
var path = require("path");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var passport = require("passport");
var GithubStrategy = require("passport-github").Strategy;
var config = require("./oauth.js");
var index = require("./routes/index");

var PORT = process.env.PORT || 3000;
var MONGOURI = process.env.MONGOURI || "mongodb://localhost/test";

var app = express();

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GithubStrategy({
  clientID: config.github.clientID,
  clientSecret: config.github.clientSecret,
  callbackURL: config.github.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));

mongoose.connect(MONGOURI);

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", index.home);

app.post("/makeTwote", index.makeTwote);
app.post("/deleteTwote", index.deleteTwote);

app.get(
  "/auth/github",
  passport.authenticate("github"),
  function (req, res) {}
);
app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  function(req, res) {
    res.redirect("/");
  }
);
app.get(
  "/logout",
  function(req, res) {
    req.logout();
    res.redirect("/");
  }
);

app.listen(PORT, function() {
  console.log("Application running on port: " + PORT);
});
