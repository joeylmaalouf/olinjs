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

/* This looks structurally good to me! I like that your describe(...) includes an it(...)
   for adding an object and an it(...) for removing the same object... it's generally good practice
   for a test to "clean up after itself" -- leave the database unmodified.

   With that in mind -- I think I might not have picked "patty" as the name of the ingredient
   to try saving... seems reasonably likely that an ingredient by that name might already
   exist in whatever database you're hooked up to, and you might end up deleting both the existing one
   and the new one with your Ingredient.remove(...) call. Fortunately it doesn't really matter whether the name
   of the ingredient you're trying to save makes semantic sense in the context of a burger restaurant or not...
   so, here's what I've seen people do in cases like this: come up with some long, fairly-likely-to-be-unique
   string using the current unix epoch time, or a random number generator, or both combined. Not a big deal in
   this context, but safer in production.
*/
