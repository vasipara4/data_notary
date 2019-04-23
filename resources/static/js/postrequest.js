$(document).ready(function() {
  // SUBMIT FORM
  $("#userForm").submit(function(event) {
    // Prevent the form from submitting via the browser.
    event.preventDefault();
    var elementLoading = document.getElementById("insertLoading");
    var measurement_val = $("#measurement").val();
    var id_val = $("#id").val();
    contract.methods
      .dataExists($("#id").val())
      .call({ from: account })
      .then(function(result) {
        if (result == false) {
          elementLoading.classList.add("running");
          contract.methods
            .dataWrite(measurement_val, id_val)
            .send({ from: account })
            .then(function(result) {
              contract.methods
                .getTimestamp(id_val)
                .call({ from: account })
                .then(function(setTimestamp) {
                  ajaxPost(setTimestamp, result.gasUsed);
                });
              console.log(result);
              elementLoading.classList.remove("running");
            })
            .catch(function(error) {
              elementLoading.classList.remove("running");
              alert(error);
            });
        } else {
          console.log("Id already exists");
          alert("ID already exists");
        }
      });
  });

  function ajaxPost(timestamp, gasUsed) {
    // PREPARE FORM DATA
    var formData = {
      measurement: $("#measurement").val(),
      id: $("#id").val(),
      timestamp: timestamp,
      submitter: account,
      gasUsed: gasUsed
      // TODO: create timestamp variable all over the function
    };
    console.log(timestamp);

    // DO POST
    $.ajax({
      type: "POST",
      contentType: "application/json",
      url: window.location + "api/users/save",
      data: JSON.stringify(formData),
      dataType: "json",
      success: function(user) {
        //  console.log(contract);
        $("#postResultDiv").html(
          "<p>" +
          "Post Successfully!" /* <br>" +
            "--> Measurement: " +
            user.measurement +
            " ,ID: " +
            user.id +
            " ,Time: " +
            user.timestamp*/ +
            "</p>"
        );
      },
      error: function(e) {
        alert("Error!");
        console.log("ERROR: ", e);
      }
    });

    // Reset FormData after Posting
    resetData();
  }

  function resetData() {
    $("#measurement").val("");
    $("#id").val("");
  }
});
