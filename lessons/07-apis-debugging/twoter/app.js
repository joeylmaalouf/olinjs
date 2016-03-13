var express = require("express");
var exphbs = require("express-handlebars");
var path = require("path");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var session = require("express-session");
var passport = require("passport");
var GithubStrategy = require("passport-github").Strategy;
var config = require("./oauth.js");
var index = require("./routes/index");

var MONGOURI = process.env.MONGOURI || "mongodb://localhost/test";

var app = express();

passport.serializeUser(function (user, done) {
  // Normally we serialize the user id
  done(null, user);
});
passport.deserializeUser(function (obj, done) {
  // and deserialize it by finding by id
  done(null, obj);
});

passport.use(new GithubStrategy({
  clientID: config.github.clientID,
  clientSecret: config.github.clientSecret,
  callbackURL: config.github.callbackURL
  },
  // You should probably be finding or creating a user here
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
app.use(session({secret: "top secret", resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", index.home);

app.post("/makeTwote", index.makeTwote);
app.post("/deleteTwote", index.deleteTwote);

app.get(
  "/auth/github",
  passport.authenticate("github", {scope: ["user:email"]}),
  function (req, res) {}
);
app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  function (req, res) {
    req.session.username = req.body.name;
    res.redirect("/");
  }
);
app.get(
  "/logout",
  function (req, res) {
    req.logout();
    req.session.destroy();
    res.redirect("/");
  }
);

app.listen(3000);
