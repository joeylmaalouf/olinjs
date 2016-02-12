var formatDate = function (timestamp) {
  timestamp = new Date(timestamp);
  return timestamp.toDateString() + " " + timestamp.toTimeString();
};

var logIn = function () {
  $("div#logIn").hide();
  $("div#logOut").show();
  $("div#logOut span#username").html($("div#logIn input#username").val());
  $("div#makeTwote").show();
};

var logOut = function () {
  $("div#logIn").show();
  $("div#logOut").hide();
  $("div#makeTwote").hide();
};

var makeTwote = function () {
  $.post("/makeTwote", {
    "author": $("div#logOut span#username").html(),
    "text": $("div#makeTwote textarea#twote").val(),
    "date": new Date()
  }).done(function (data, status) {
    $("table#twotes tbody").prepend(
      "      <tr id=\"" + data._id + "\">\n" +
      "        <td>\n" +
      "          <span id=\"author\" onclick=\"filterTwotes('" + data.author + "');\">" + data.author + "</span>, <span id=\"date\">" + formatDate(data.date) + "</span>:\n" +
      "          <input type=\"button\" value=\"X\" onclick=\"deleteTwote('" + data._id + "');\"><br>\n" +
      "          <span id=\"text\">" + data.text + "</span><br>\n" +
      "        </td>\n" +
      "      </tr>"
    );
    $("ul#users li#" + data.author).remove();
    $("ul#users").prepend("<li id=\"" + data.author + "\">" + data.author + "</li>");
  }).error(function (data, status) {
    console.log("Error: " + data);
  });
};

var deleteTwote = function (id) {
  $.post("/deleteTwote", {
    "id": id,
    "username": $("div#logOut span#username").html()
  }).done(function (data, status) {
    if ($("#" + data.id + " td span#author").html() === data.username) {
      $("#" + data.id).remove();
    }
  }).error(function (data, status) {
    console.log("Error: " + data);
  });
};

var filterTwotes = function (author, reset) {
  $("table#twotes tbody tr").each(function (index, element) {
    element = $(element);
    if (reset || element.find("td span#author").html() === author) {
      element.show();
    }
    else {
      element.hide();
    }
  });
};
