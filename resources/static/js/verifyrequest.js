$( document ).ready(function() {

    // GET REQUEST
    $("#verifyForm").submit(function(event) {
      event.preventDefault();
      //var hashInEthereum;
      var verifyHtml = "False";
      var testingData = $("#verify_measurement").val();
      var testingId = $("#verify_id").val();
      contract.methods.verifyHash(testingData,testingId).call({from : account}).then(function(result){
        console.log(result);
        if (result) {
          contract.methods.getDataDetails(testingId).call({from: account}).then(function(result){
            console.log(response);
            verifyHtml = "True" +"<br>Account: " + result[0] + "<br>Hash: " + result[1] + "<br>Unix Date: " + result[2];
          });
        }
         $("#getVerifyDiv").html("Verification: " + verifyHtml);
      });

    });

  })
