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
            "<div class='card' style='width: 18rem;'><div class='card-body'> <h5 class='card-title'>ID: " +
              user.id +
              "</h5><h6 class='card-subtitle mb-2 text-muted'>" +
              "Submitter: " +
              user.submitter +
              " Gas: " +
              user.gasUsed +
              "</h6><p class='card-text'>" +
              "Measurement: " +
              user.measurement +
              "</p><span class='card-link'>" +
              "Unix Time: " +
              user.timestamp +
              "</span></div></div>"
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
