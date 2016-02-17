var formatDate = function (timestamp) {
  timestamp = new Date(timestamp);
  return timestamp.toDateString() + " " + timestamp.toTimeString();
};

var makeTwote = function () {
  var twote = $("div#makeTwote textarea#twote").val();
  $.post("/makeTwote", {
    "text": twote,
    "date": new Date()
  }).done(function (data, status) {
    $("table#twotes tbody").prepend(
      "      <tr id=\"" + data._id + "\" class=\"content\">\n" +
      "        <td>\n" +
      "          <span id=\"author\" class=\"clickable\" onclick=\"filterTwotes('" + data.author + "');\">" + data.author + "</span>, <span id=\"date\">" + formatDate(data.date) + "</span>:\n" +
      "          <input type=\"button\" value=\"X\" class=\"right\" onclick=\"deleteTwote('" + data._id + "');\"><br>\n" +
      "          <span id=\"text\">" + data.text + "</span><br>\n" +
      "        </td>\n" +
      "      </tr>"
    );
    $("ul#users li#" + data.author).remove();
    $("ul#users").prepend("<li id=\"" + data.author + "\" class=\"clickable\"onclick=\"filterTwotes('" + data.author + "', false);\">" + data.author + "</li>");
  }).error(function (data, status) {
    console.log("Error: " + data);
  });
};

var deleteTwote = function (id) {
  $.post("/deleteTwote", {
    "id": id
  }).done(function (data, status) {
    if (data.successful) {
      $("#" + data.id).remove();
    }
  }).error(function (data, status) {
    console.log("Error: " + data);
  });
};

var filterTwotes = function (author, reset) {
  $("table#twotes tbody tr").each(function (index, element) {
    element = $(element);
    if (reset || element.find("td span#author").html() !== author) {
      element.removeClass("highlighted").addClass("content");
    }
    else {
      element.removeClass("content").addClass("highlighted");
    }
  });
};
