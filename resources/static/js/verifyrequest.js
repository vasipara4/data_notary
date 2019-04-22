$( document ).ready(function() {

    // GET REQUEST
    $("#verifyForm").submit(function(event) {
      event.preventDefault();
      //var hashInEthereum;
      var verifyHtml;
      var testingData = $("#verify_measurement").val();
      var testingId = $("#verify_id").val();
      contract.methods.verifyHash(testingData,testingId).call({from : account}).then(function(result){
        if (result) {
          contract.methods.getDataDetails(testingId).call({from: account}).then(function(results){
            verifyHtml = "True" +"<br>Account: " + results[0] + "<br>Hash: " + results[1] + "<br>Unix Date: " + results[2];
          })
        }
        else {
          verifyHtml = "False";
        }
         $("#getVerifyDiv").html("Verification: " + verifyHtml);
      });

    });

  })
