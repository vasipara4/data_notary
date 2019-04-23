$(document).ready(function() {
  // VERIFY
  $("#verifyForm").submit(function(event) {
    event.preventDefault();
    //var hashInEthereum;
    var verifyHtml = "False";
    var testingData = $("#verify_measurement").val();
    var testingId = $("#verify_id").val();
    contract.methods
      .verifyHash(testingData, testingId)
      .call({ from: account })
      .then(function(result) {
        //console.log(result);
        if (result) {
          contract.methods
            .getDataDetails(testingId)
            .call({ from: account })
            .then(function(result) {
              //console.log(result[0]);
              verifyHtml =
                "True" +
                "<br>Account: " +
                result[0] +
                "<br><br>Data: " +
                web3.utils.toHex(result[1]) +
                "<br><br>Unix Date: " +
                result[2] +
                "<br>Readable date (hours:min:sec dd:mm:yy) " +
                unixTimeToDate(result[2]);
              $("#getVerifyDiv").html("Verification: " + verifyHtml);
            });
        } else $("#getVerifyDiv").html("Verification: " + verifyHtml);
      });
  });
});

function unixTimeToDate(unix_timestamp) {
  var date = new Date(unix_timestamp * 1000);
  var day = "0" + date.getDate();
  var month = "0" + (date.getMonth() + 1);
  var year = date.getFullYear();

  // Hours part from the timestamp
  var hours = date.getHours();
  // Minutes part from the timestamp
  var minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp
  var seconds = "0" + date.getSeconds();

  // Will display time in 10:30:23 format
  var formattedTime =
    "<br>" +
    hours +
    ":" +
    minutes.substr(-2) +
    ":" +
    seconds.substr(-2) +
    " " +
    day.substr(-2) +
    "/" +
    month.substr(-2) +
    "/" +
    year ;
  return formattedTime;
}
