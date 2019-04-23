$(document).ready(function() {
  // GET REQUEST
  $("#allUsers").click(function(event) {
    event.preventDefault();
    ajaxGet();
  });

  // DO GET
  function ajaxGet() {
    $.ajax({
      type: "GET",
      url: "/api/users/all",
      success: function(result) {
        $("#getResultDiv ul").empty();
        $.each(result, function(i, user) {
          $("#getResultDiv .list-group").append(
            "ID:" +
              user.id +
              " Measurement: " +
              user.measurement +
              " Time: " +
              user.timestamp +
              "<br>Submitter: " +
              user.submitter +
              " Gas Used: " +
              user.gasUsed
          );
        });
        console.log("Success: ", result);
      },
      error: function(e) {
        $("#getResultDiv").html("<strong>Error</strong>");
        console.log("ERROR: ", e);
      }
    });
  }
});
