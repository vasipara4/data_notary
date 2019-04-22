$( document ).ready(function() {
  
    // GET REQUEST
    $("#verifyForm").submit(function(event) {
      event.preventDefault();
      var hashInEthereum;
      var testingHash = web3.utils.soliditySha3($("#verify_measurement").val());
      contract.methods.verify(testingHash,$("#verify_id").val()).call({from : account}).then(function(result){
        hashInEthereum = result;
        console.log(hashInEthereum);
        $("#getVerifyDiv").html("Verification:" + hashInEthereum)
      });
       /* if(!err){
          hashInEthereum=result;
        }
        else{
          console.log(err);
          hashInEthereum = "error";
        }
      });*/
      
          
      //ajaxGet();
    });
    
    // DO GET
    function ajaxGet(){
      $.ajax({
        type : "GET",
        url : "/api/users/all",
        success: function(result){
          $('#getResultDiv ul').empty();
          $.each(result, function(i, user){
            $('#getResultDiv .list-group').append(user.firstname + " " + user.lastname + "<br>")
          });
          console.log("Success: ", result);
        },
        error : function(e) {
          $("#getResultDiv").html("<strong>Error</strong>");
          console.log("ERROR: ", e);
        }
      });  
    }
  })