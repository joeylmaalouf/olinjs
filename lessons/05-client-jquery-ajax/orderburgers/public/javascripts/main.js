var setOutOfStock = function (id) {
  $.post("/setOutOfStock", {
    id: id
  }).done(function (data, status) {
    var row = $("#" + data);
    var listing = row.find("td:nth-child(1)");
    var button = row.find("td:nth-child(2)").find("input");
    listing.css("text-decoration", "line-through");
    button.attr("value", "Mark as in-stock");
    button.attr("onclick", "setInStock('" + id + "');");
  }).error(function (data, status) {
    console.log("Error: " + data);
  });
};

var setInStock = function (id) {
  $.post("/setInStock", {
    id: id
  }).done(function (data, status) {
    var row = $("#" + id);
    var listing = row.find("td:nth-child(1)");
    var button = row.find("td:nth-child(2)").find("input");
    listing.css("text-decoration", "");
    button.attr("value", "Mark as out-of-stock");
    button.attr("onclick", "setOutOfStock('" + id + "');");
  }).error(function (data, status) {
    console.log("Error: " + data);
  });
};

var editIngredient = function (id) {
  var row = $("#" + id);
  var col = row.find("td:nth-child(3)");
  var name = col.find("#name").val();
  var price = col.find("#price").val();
  $.post("/editIngredient", {
    id: id,
    name: name,
    price: price
  }).done(function (data, status) {
    var listing = row.find("td:nth-child(1)");
    listing.html(data.name + ": $" + data.price.toFixed(2));
  }).error(function (data, status) {
    console.log("Error: " + data);
  });
};
