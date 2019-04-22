$( document ).ready(function() {
  
    // SUBMIT FORM
    $("#userForm").submit(function(event) {
      // Prevent the form from submitting via the browser.
      event.preventDefault();
      var elementLoading = document.getElementById("insertLoading");
      contract.methods.notDuplicates($("#id").val()).call({from: account}).then(function(result){
        if(result == true){
          elementLoading.classList.add("running");
          contract.methods.dataWrite(web3.utils.soliditySha3($("#measurement").val()),$("#id").val()).send({from: account})
    .then(function(result){
      ajaxPost();
      elementLoading.classList.remove("running");
    }
    ).catch(function(error){
      elementLoading.classList.remove("running");
      alert(error);
    });
        }
        else {
          console.log("Id already exists");
alert("ID already exists")
        }
      });
     
    });
      
      
      function ajaxPost(){
        
        // PREPARE FORM DATA
        var formData = {
          measurement : $("#measurement").val(),
          id :  $("#id").val()
        }
        
        // DO POST
        $.ajax({
        type : "POST",
        contentType : "application/json",
        url : window.location + "api/users/save",
        data : JSON.stringify(formData),
        dataType : 'json',
        success : function(user) {
          console.log(contract);
          $("#postResultDiv").html("<p>" + 
            "Post Successfully! <br>" +
            "--> Measurement " + user.measurement + " , ID: " + user.id + "</p>");
        },
        error : function(e) {
          alert("Error!")
          console.log("ERROR: ", e);
        }
      });
        
        // Reset FormData after Posting
        resetData();
   
      }
      
      function resetData(){
        $("#measurement").val("");
        $("#id").val("");
      }
  })