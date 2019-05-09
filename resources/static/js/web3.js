window.addEventListener("load", () => {
  var account;
  const desiredNetwork = 3;
  var networkVersion;
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== "undefined") {
    web3 = new Web3(web3.currentProvider);
    var accountsPromise = web3.eth.getAccounts();
    var networkIdPromise = web3.eth.net.getId(); // web3.version.network;
    Promise.all([networkIdPromise, accountsPromise])
      .then(function(result) {
        //console.log(result[0]);
        networkVersion = result[0];
        var accounts = result[1];
        account = accounts[0];
        if (networkVersion != desiredNetwork) {
          alert("Please switch to ropsten network.");
        }
      })
      .catch(console.error);
  } else {
    if (
      window.confirm(
        "No web3 detected! You should consider trying MetaMask!\nRedirect to their website?"
      )
    ) {
      window.location.href = "https://metamask.io/";
    }
    // fallback
    web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:8545"));
  }

  //console.log(web3.eth.net.getId());

  /*web3.eth.getAccounts().then((f) => {
    account = f[0];
   });*/

  const contract = new web3.eth.Contract(
    [
      {
        constant: true,
        inputs: [
          {
            name: "_data",
            type: "string"
          },
          {
            name: "__id",
            type: "int256"
          }
        ],
        name: "verifyHash",
        outputs: [
          {
            name: "",
            type: "bool"
          }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: false,
        inputs: [
          {
            name: "_data",
            type: "string"
          },
          {
            name: "_id",
            type: "int256"
          }
        ],
        name: "dataWrite",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: true,
        inputs: [
          {
            name: "_id",
            type: "uint256"
          }
        ],
        name: "dataExists",
        outputs: [
          {
            name: "",
            type: "bool"
          }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: true,
        inputs: [
          {
            name: "_id",
            type: "uint256"
          }
        ],
        name: "getTimestamp",
        outputs: [
          {
            name: "",
            type: "uint256"
          }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: true,
        inputs: [
          {
            name: "_id",
            type: "uint256"
          }
        ],
        name: "getDataDetails",
        outputs: [
          {
            name: "",
            type: "address"
          },
          {
            name: "",
            type: "uint256"
          },
          {
            name: "",
            type: "uint256"
          }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
      }
    ],
    "0x797ffb081ef92aaadedba176741884475921d326"
  );

  $("#userForm").submit(function(event) {
    // Prevent the form from submitting via the browser.
    event.preventDefault();
    var elementLoading = document.getElementById("insertLoading");
    var measurement_val = $("#measurement").val();
    var id_val = $("#id").val();
    var txtString = openFile();

    console.log(txtString);

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
                  elementLoading.classList.remove("running");
                });
              console.log(result);
              //elementLoading.classList.remove("running");
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
    var form = $("#userForm")[0];
    var formData = new FormData(form);
    formData.append("timestamp", timestamp);
    formData.append("submitter", account);
    formData.append("gasUsed", gasUsed);

    // DO POST
    $.ajax({
      type: "POST",
      enctype: "multipart/form-data",
      contentType: false, //"application/json",
      url: window.location + "api/users/save",
      data: formData, //JSON.stringify(formData),
      processData: false, //dataType: "json",
      success: function(user) {
        //  console.log(contract);
        $("#postResultDiv").html(
          "<p>" + "Post Successfully!<br>File uploaded!" + "</p>"
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
              "</div><div class='card-body card-6-6'><div class='card-body'><h4>ID: " +
              user.id +
              "</h4><p>Measurement: " +
              user.measurement +
              "</p></div></div><div class='card-footer'>Time & Date: " +
              unixTimeToDate(user.timestamp) +
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
                "<br>Time and Date :<br> " +
                unixTimeToDate(result[2]);
              $("#getVerifyDiv").html("Verification: " + verifyHtml);
            });
        } else $("#getVerifyDiv").html("Verification: " + verifyHtml);
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
      year;
    return formattedTime;
  }
});

async function openFile() {
  var input = document.getElementById("file").files[0];
  var readfile = new Promise((resolve, reject) => {
    let fr = new FileReader();
    fr.onload = x => resolve(fr.result);
    fr.readAsText(input); // or readAsText(file) to get raw content
  });
  var result = await readfile;
  console.log(result);
  setTImeout(function(){},3000);
  return result;
//  return
}

/*function readFile(file) {
  return new Promise((resolve, reject) => {
    let fr = new FileReader();
    fr.onload = x => resolve(fr.result);
    fr.readAsText(file); // or readAsText(file) to get raw content
  });
}*/
