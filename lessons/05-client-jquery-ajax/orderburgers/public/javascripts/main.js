var setOutOfStock = function (id) {
  $.post("/setOutOfStock", {
    id: id
  }).done(function (data, status) {
    var row = $("#" + data);
    var listing = row.find("td:nth-child(1)");
    var button = row.find("td:nth-child(2)").find("input:nth-child(1)");
    console.log(listing);
    console.log(button);
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
    var row = $("#" + data);
    var listing = row.find("td:nth-child(1)");
    var button = row.find("td:nth-child(2)").find("input:nth-child(1)");
    console.log(listing);
    console.log(button);
    listing.css("text-decoration", "");
    button.attr("value", "Mark as out-of-stock");
    button.attr("onclick", "setOutOfStock('" + id + "');");
  }).error(function (data, status) {
    console.log("Error: " + data);
  });
};
