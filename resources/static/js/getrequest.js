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
        $("#getResultDiv").empty();
        $.each(result, function(i, user) {
          $("#getResultDiv").append(
            "<div class='card card-default'><div class='card-header'>Submitter: " +
              user.submitter +
              " Gas:" +
              user.gasUsed +
              "</div><div class='card-body card-6-6'><div class='card-body'><h3>ID: " +
              user.id +
              "</h3><p>Measurement: " +
              user.measurement +
              "</p></div></div><div class='card-footer'>Unix time:" +
              user.timestamp +
              "</div></div>"
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
