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

window.addEventListener("load", () => {
  var account;
  const desiredNetwork = 3;
  var networkVersion;
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (
    typeof window.ethereum !== "undefined" ||
    typeof window.web3 !== "undefined"
  ) {
    const provider = window["ethereum"] || window.web3.currentProvider;
    web3 = new Web3(provider);
    var accountsPromise = web3.eth.getAccounts();
    var networkIdPromise = web3.eth.net.getId(); // web3.version.network;
    Promise.all([networkIdPromise, accountsPromise])
      .then(function(result) {
        networkVersion = result[0];
        var accounts = result[1];
        account = accounts[0];
        if (networkVersion != desiredNetwork) {
          alert("Please switch to ropsten network.");
        }
        if (web3.currentProvider.isMetaMask) {
          ethereum
            .enable()
            .then(function(accounts) {
              account = accounts[0];
            })
            .catch(function(reason) {
              // Handle error. Likely the user rejected the login:
              console.log(reason === "User rejected provider access");
            });
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
    x = document.getElementById("container");
    x.style.display = "none";
    // fallback
    web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:8545"));
  }

  ethereum.on("accountsChanged", function(accounts) {
    // Time to reload your interface with accounts[0]!
    account = accounts[0];
  });

  const contract = new web3.eth.Contract(
    [
      {
        constant: false,
        inputs: [
          {
            name: "_addressIPFS",
            type: "bytes32[2]"
          },
          {
            name: "_hash",
            type: "uint256"
          }
        ],
        name: "addAddressIPFS",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: false,
        inputs: [
          {
            name: "_hash",
            type: "uint256"
          },
          {
            name: "_valueWei",
            type: "uint256"
          }
        ],
        name: "dataWrite",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: false,
        inputs: [
          {
            name: "_hash",
            type: "uint256"
          }
        ],
        name: "takeCopyrights",
        outputs: [],
        payable: true,
        stateMutability: "payable",
        type: "function"
      },
      {
        constant: false,
        inputs: [
          {
            name: "_hash",
            type: "uint256"
          },
          {
            name: "_valueWei",
            type: "uint256"
          }
        ],
        name: "updateWeiValue",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: false,
        inputs: [
          {
            name: "amount",
            type: "uint256"
          }
        ],
        name: "withdrawFunds",
        outputs: [
          {
            name: "success",
            type: "bool"
          }
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: true,
        inputs: [
          {
            name: "_hash",
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
            name: "_hash",
            type: "uint256"
          },
          {
            name: "_owner",
            type: "address"
          }
        ],
        name: "dataIsYourData",
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
            name: "_from",
            type: "address"
          }
        ],
        name: "getBalance",
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
            name: "_hash",
            type: "uint256"
          }
        ],
        name: "getDataAddressIPFS",
        outputs: [
          {
            name: "",
            type: "bytes32"
          },
          {
            name: "",
            type: "bytes32"
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
            name: "_hash",
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
          },
          {
            name: "",
            type: "uint256"
          },
          {
            name: "",
            type: "bytes32"
          },
          {
            name: "",
            type: "bytes32"
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
            name: "_owner",
            type: "address"
          },
          {
            name: "_hash",
            type: "uint256"
          }
        ],
        name: "getDataShareFromAddressID",
        outputs: [
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
      },
      {
        constant: true,
        inputs: [
          {
            name: "_owner",
            type: "address"
          }
        ],
        name: "getItemsBuyable",
        outputs: [
          {
            components: [
              {
                name: "submitter",
                type: "address"
              },
              {
                name: "data",
                type: "uint256"
              },
              {
                name: "date",
                type: "uint256"
              },
              {
                name: "valueWei",
                type: "uint256"
              },
              {
                name: "addressIPFS",
                type: "bytes32[2]"
              }
            ],
            name: "",
            type: "tuple[]"
          },
          {
            name: "",
            type: "uint256[]"
          },
          {
            name: "",
            type: "bool[]"
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
            name: "_owner",
            type: "address"
          }
        ],
        name: "getItemsPurchased",
        outputs: [
          {
            components: [
              {
                name: "submitter",
                type: "address"
              },
              {
                name: "data",
                type: "uint256"
              },
              {
                name: "date",
                type: "uint256"
              },
              {
                name: "valueWei",
                type: "uint256"
              },
              {
                name: "addressIPFS",
                type: "bytes32[2]"
              }
            ],
            name: "",
            type: "tuple[]"
          },
          {
            name: "",
            type: "bool[]"
          }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: true,
        inputs: [],
        name: "getNumBuyable",
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
            name: "_owner",
            type: "address"
          }
        ],
        name: "getOwnItems",
        outputs: [
          {
            components: [
              {
                name: "submitter",
                type: "address"
              },
              {
                name: "data",
                type: "uint256"
              },
              {
                name: "date",
                type: "uint256"
              },
              {
                name: "valueWei",
                type: "uint256"
              },
              {
                name: "addressIPFS",
                type: "bytes32[2]"
              }
            ],
            name: "",
            type: "tuple[]"
          },
          {
            name: "",
            type: "bool[]"
          },
          {
            name: "",
            type: "uint256[]"
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
            name: "_hash",
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
            name: "_hash",
            type: "uint256"
          },
          {
            name: "_owner",
            type: "address"
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
      }
    ],
    "0xa89fc3f6dde67bc1d0c0c144d15c420f7be385f2"
  );

  //POST Ethereum & Db
  $("#userForm").submit(function(event) {
    // Prevent the form from submitting via the browser.
    event.preventDefault();
    var elementLoading = document.getElementById("insertLoading");
    var type = $("input:radio[name=optradio]:checked").val();
    var radioSaveToDb = $("input:radio[name=radioSaveToDb]:checked").val();
    var weiValue = $("#weiValue").val();
    var fileArrayBuffer;
    var hashNumber;
    var title = $("#title").val();
    var titleBytes32 = ethers.utils.formatBytes32String(title);
    var description = $("#description").val();
    var file = document.getElementById("file").files[0];

    Promise.all([openFile("file")]).then(function(result) {
      fileArrayBuffer = result[0];
      fileArrayBuffer = ethers.utils.keccak256(fileArrayBuffer);
      hashNumber = ethers.utils.bigNumberify(fileArrayBuffer);
      hashNumber = hashNumber.toString();
      contract.methods
        .dataExists(hashNumber)
        .call({ from: account })
        .then(function(result) {
          if (result == false) {
            if (radioSaveToDb === "Yes") {
              $("#postResultDiv").html(
                "<b>Please, wait. <br>Do not close the Window until uploading is done</b>"
              );
              elementLoading.classList.add("running");
            }
            contract.methods
              .dataWrite(hashNumber, weiValue)
              .send({ from: account })
              .then(function(result) {
                if (radioSaveToDb === "No") {
                  return;
                }
                contract.methods
                  .getTimestamp(hashNumber)
                  .call({ from: account })
                  .then(function(setTimestamp) {
                    ajaxPost(
                      hashNumber,
                      setTimestamp,
                      result.gasUsed,
                      type,
                      result.transactionHash,
                      result.blockHash,
                      title,
                      description,
                      file
                    );
                    //elementLoading.classList.remove("running");
                  });
              })
              .catch(function(error) {
                $("#postResultDiv").html("");
                elementLoading.classList.remove("running");
                alert(error);
              });
          } else {
            console.log("File already exists");
            alert("File already exists!\n Check Marketplace if it's available");
          }
        });
    });
  });

  function ajaxPost(
    hash,
    timestamp,
    gasUsed,
    type,
    transactionHash,
    blockHash,
    title,
    description,
    file
  ) {
    var formData = new FormData();
    formData.append("hash", hash);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("type", type);
    formData.append("timestamp", timestamp);
    formData.append("submitter", account);
    formData.append("gasUsed", gasUsed);
    formData.append("transactionHash", transactionHash);
    formData.append("blockHash", blockHash);
    formData.append("file", file);
    // DO POST
    $.ajax({
      type: "POST",
      enctype: "multipart/form-data",
      contentType: false,
      url: window.location.origin + "/api/users/save",
      data: formData,
      processData: false,
      success: function(user) {
        $("#postResultDiv").html(
          "<p>" + "Notarization Successfully!<br>File uploaded!" + "</p>"
        );
        var elementLoading = document.getElementById("insertLoading");
        elementLoading.classList.remove("running");
      },
      error: function(e) {
        alert("Error!");
        $("#postResultDiv").html("");
        var elementLoading = document.getElementById("insertLoading");
        elementLoading.classList.remove("running");
        console.log("ERROR: ", e);
      }
    });

    // Reset FormData after Posting
    resetData();
  }

  function resetData() {
    $("#title").val("");
    $("#description").val("");
    $("#id").val("");
    $("#weiValue").val("0");
  }

  // VERIFY FROM FILE
  $("#verifyForm").submit(function(event) {
    event.preventDefault();
    var verifyHtml = "Hash of File does NOT match. ";
    var testingData;
    var testingFileOwnerAdress = $("#verifyForm_address").val();
    testingData = openFile("uploadTestFile");
    Promise.all([openFile("uploadTestFile")]).then(function(result) {
      testingData = result[0];
      testingData = ethers.utils.keccak256(testingData);
      contract.methods
        .dataExists(testingData)
        .call({ from: account })
        .then(function(idExists) {
          if (idExists) {
            contract.methods
              .verifyHash(testingData, testingFileOwnerAdress)
              .call({ from: account })
              .then(function(result) {
                if (result) {
                  contract.methods
                    .getDataDetails(testingData)
                    .call({ from: account })
                    .then(function(result) {
                      var IPFSstring =
                        ethers.utils.parseBytes32String(result[4]) === ""
                          ? "No File"
                          : ethers.utils.parseBytes32String(result[4]) +
                            ethers.utils.parseBytes32String(result[5]);
                      verifyHtml =
                        "True" +
                        "<br>Account Original: " +
                        result[0] +
                        "<br><br>Data: " +
                        web3.utils.toHex(result[1]) +
                        "<br><br>Unix Date: " +
                        result[2] +
                        "<br>Time and Date :<br> " +
                        unixTimeToDate(result[2]) +
                        "<br>IPFS file: " +
                        IPFSstring;
                      $("#getVerifyDiv").html("Data	Integrity: " + verifyHtml);
                    });
                } else $("#getVerifyDiv").html("Data Integrity: " + verifyHtml);
              });
          } else $("#getVerifyDiv").html("Data Integrity: ID doesn't exists");
        });
    });
  });

  //Verify FILE from hash
  $("#verifyHash").submit(function(event) {
    event.preventDefault();
    var verifyHtml = "Hash does NOT match. ";
    var testingData = $("#verifyFromHashId").val();
    var testingFileOwnerAdress = $("#verifyFromHashAddress").val();
    contract.methods
      .dataExists(testingData)
      .call({ from: account })
      .then(function(idExists) {
        if (idExists) {
          contract.methods
            .verifyHash(testingData, testingFileOwnerAdress)
            .call({ from: account })
            .then(function(result) {
              if (result) {
                contract.methods
                  .getDataDetails(testingData)
                  .call({ from: account })
                  .then(function(result) {
                    contract.methods
                      .getDataShareFromAddressID(
                        testingFileOwnerAdress,
                        testingData
                      )
                      .call({ from: account })
                      .then(function(dataBought) {
                        console.log(dataBought);
                        var timeShare =
                          dataBought[0] == "0"
                            ? ""
                            : "<br>Time and Date Shared :<br> " +
                              unixTimeToDate(dataBought[1]);
                        var addressShared = dataBought[0] == "0"
                          ? ""
                          : "<br>Address Shared: " + testingFileOwnerAdress;
                        var IPFSstring =
                          ethers.utils.parseBytes32String(result[4]) === ""
                            ? "No File"
                            : ethers.utils.parseBytes32String(result[4]) +
                              ethers.utils.parseBytes32String(result[5]);
                        verifyHtml =
                          "True" +
                          "<br>Account Original: " +
                          result[0] +
                          "<br>Time and Date First Inserted :<br> " +
                          unixTimeToDate(result[2]) +
                          "<br>IPFS file: " +
                          IPFSstring + addressShared +
                          timeShare;
                        $("#getVerifyHashDiv").html(
                          "Data	Integrity: " + verifyHtml
                        );
                      });
                  });
              } else
                $("#getVerifyHashDiv").html("Data Integrity: " + verifyHtml);
            });
        } else $("#getVerifyHashDiv").html("Data Integrity: ID doesn't exists");
      });
  });

  //Verify from Db
  $("#verifyDbHash").submit(function(event) {
    event.preventDefault();
    var fileData = new FormData();
    var hashfile = $("#verifyFromDBHashId").val();
    hashfile = ethers.utils.bigNumberify(hashfile).toString();
    var addressOwner = $("#verifyFromDbHashAddress").val();
    if (!web3.utils.isAddress(addressOwner)) {
      alert("Insert Valid Address");
      return;
    }
    fileData.append("hash", hashfile);
    fileData.append("address", addressOwner.toLowerCase());
    $.ajax({
      type: "POST",
      enctype: "multipart/form-data",
      contentType: false,
      url: window.location.origin + "/api/db/verify",
      data: fileData,
      processData: false,
      success: function(result) {
        $("#getVerifyDbHashDiv").html("File Integrity: " + result + "<hr><hr>");
      },
      error: function(e) {
        console.log("ERROR: ", e);
      }
    });
  });

  //IPFS ADD FILES
  $("#IPFSform").submit(function(event) {
    // Prevent the form from submitting via the browser.
    event.preventDefault();
    $("#resultIPFS").html("");
    var ipfsElementLoading = document.getElementById("insertIPFS");
    var id = $("#idOfIPFS").val();
    var form = $("#IPFSform")[0];
    var ipfsData = new FormData(form);
    contract.methods
      .dataIsYourData(id, account)
      .call({ from: account })
      .then(function(result) {
        if (result) {
          ipfsElementLoading.classList.add("running");
          $.ajax({
            type: "POST",
            enctype: "multipart/form-data",
            contentType: false,
            url: window.location.origin + "/api/ipfs/save",
            data: ipfsData,
            processData: false,
            success: function(resultIPFS) {
              var addressIPFS = resultIPFS[0].hash;
              contract.methods
                .addAddressIPFS(ipfsHashToBytes32(addressIPFS), id)
                .send({ from: account })
                .then(function(result) {
                  ipfsElementLoading.classList.remove("running");
                  $("#resultIPFS").html(
                    "<p>IPFS address: " + resultIPFS[0].hash + "</p>"
                  );
                })
                .catch(function(error) {
                  ipfsElementLoading.classList.remove("running");
                  alert(error);
                });
            },
            error: function(e) {
              ipfsElementLoading.classList.remove("running");
              alert("Error!");
              console.log("ERROR: ", e);
            }
          });
        } else {
          alert("Insert only on your Ethereum Submission");
        }
      });
  });
});

async function openFile(id) {
  var input = document.getElementById(id).files[0];
  var readfile = new Promise((resolve, reject) => {
    let fr = new FileReader();
    fr.onload = x => {
      var arrayBuffer = fr.result;
      var bytes = new Uint8Array(arrayBuffer);
      resolve(bytes);
    };
    fr.readAsArrayBuffer(input); // or readAsText(file) to get raw content
  });
  var result = await readfile;
  return result;
}

function showFileName() {
  var input = document.getElementById("file");
  var infoArea = document.getElementById("file-upload-filename");
  var fileName = input.files[0].name;
  infoArea.textContent = "Selected: " + fileName;
}

function ipfsHashToBytes32(hash) {
  var hashPart1 = ethers.utils.formatBytes32String(hash.slice(0, 31));
  var hashPart2 = ethers.utils.formatBytes32String(hash.slice(31, hash.length));
  return new Array(hashPart1, hashPart2);
}
