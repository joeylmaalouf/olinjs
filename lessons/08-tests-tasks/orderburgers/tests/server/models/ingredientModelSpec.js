require("./../../../app");
var expect = require("chai").expect;
var Ingredient = require("./../../../models/ingredientModel");

describe("The ingredient model", function() {
  it("should be able to create ingredients", function (done) {
    var ingredient = new Ingredient({
      name: "patty",
      price: 5,
      inStock: true
    });
    ingredient.save(function (err) {
      if (err) {
        return done(err);
      }
      done();
    });
  });

  it("should be able to remove ingredients", function(done) {
    Ingredient.remove({ name: "patty" }, function(err) {
      if (err) {
        return done(err);
      }
      done();
    });
  });

});
