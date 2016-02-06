var setOutOfStock = function (id) {
  $.post("/setOutOfStock", {
    id: id
  }).done(function (data, status) {
    var row = $("#" + id);
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

var addIngredient = function () {
  var div = $("#addIngredient");
  var name = div.find("#name").val() || "?";
  var price = div.find("#price").val() || "0";
  $.post("/addIngredient", {
    name: name,
    price: Number(price).toFixed(2)
  }).done(function (data, status) {
    var table = $("#ingredients");
    var newRow = "  <tr id=\"" + data._id + "\" class=\"inStock\">\n" +
      "    <td>" + data.name + ": $" + data.price.toFixed(2) + "</td>\n" +
      "    <td><input type=\"button\" value=\"Mark as out-of-stock\" onclick=\"setOutOfStock('" + data._id + "');\"></td>\n" +
      "    <td>\n" +
      "      Name: <input type=\"text\" id=\"name\">\n" +
      "      Price: $<input type=\"text\" id=\"price\">\n" +
      "      <input type=\"button\" value=\"Save edits\" onclick=\"editIngredient('" + data._id + "')\">\n" +
      "      <input type=\"button\" value=\"Delete\" onclick=\"removeIngredient('" + data._id + "')\">\n" +
      "    </td>\n" +
    "  </tr>";
    table.append(newRow);
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
    price: price ? Number(price).toFixed(2) : null
  }).done(function (data, status) {
    if (data) {
      var listing = row.find("td:nth-child(1)");
      listing.html(data.name + ": $" + data.price.toFixed(2));
    }
  }).error(function (data, status) {
    console.log("Error: " + data);
  });
};

var removeIngredient = function (id) {
  $.post("/removeIngredient", {
    id: id
  }).done(function (data, status) {
    $("#" + id).remove();
  }).error(function (data, status) {
    console.log("Error: " + data);
  });
};
