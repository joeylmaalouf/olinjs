var setOutOfStock = function (id) {
  $.post("/setOutOfStock", {
    id: id
  }).done(function (data, status) {
    var row = $("#" + data);
    var listing = row.find("td:nth-child(1)");
    var button = row.find("td:nth-child(2)").find("input");
    listing.css("text-decoration", "line-through");
    button.val("Mark as out-of-stock");
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
    var button = row.find("td:nth-child(2)").find("input");
    listing.css("text-decoration", "");
    button.val("Mark as in-stock");
  }).error(function (data, status) {
    console.log("Error: " + data);
  });
};
