require("./../../../app");
var expect = require("chai").expect;
var Order = require("./../../../models/orderModel");

describe("The order model", function() {
  it("should be able to create orders", function (done) {
    var order = new Order({
      name: "Joey",
      ingredients: ["buns", "patty", "pickles"],
      price: 9
    });
    order.save(function (err) {
      if (err) {
        return done(err);
      }
      done();
    });
  });

  it("should be able to remove orders", function(done) {
    Order.remove({ name: "Joey" }, function(err) {
      if (err) {
        return done(err);
      }
      done();
    });
  });

});
