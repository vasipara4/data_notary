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
        //console.log(result[0]);
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
    // fallback
    web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:8545"));
  }

  ethereum.on("accountsChanged", function(accounts) {
    // Time to reload your interface with accounts[0]!
    account = accounts[0];
  });

  /*web3.currentProvider.publicConfigStore.on('update', function(accountsChanged){
    account = accountsChanged;
  });

  //console.log(web3.eth.net.getId());

  /*web3.eth.getAccounts().then((f) => {
    account = f[0];
   });*/
   let abi = [
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
       constant: false,
       inputs: [
         {
           name: "_data",
           type: "uint256"
         },
         {
           name: "_id",
           type: "uint256"
         },
         {
           name: "_valueGwei",
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
       constant: true,
       inputs: [
         {
           name: "_id",
           type: "uint256"
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
           name: "_id",
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
       constant: false,
       inputs: [
         {
           name: "_addressIPFS",
           type: "bytes32[2]"
         },
         {
           name: "_id",
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
               name: "valueGwei",
               type: "uint256"
             },
             {
               name: "addressIPFS",
               type: "bytes32[2]"
             }
           ],
           name: "",
           type: "tuple[]"
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
           name: "_id",
           type: "uint256"
         }
       ],
       name: "getDataShareFromAddressID",
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
           name: "_data",
           type: "uint256"
         },
         {
           name: "_id",
           type: "uint256"
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
       constant: false,
       inputs: [
         {
           name: "_id",
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
       constant: true,
       inputs: [],
       name: "getAllIndexes",
       outputs: [
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
       inputs: [],
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
               name: "valueGwei",
               type: "uint256"
             },
             {
               name: "addressIPFS",
               type: "bytes32[2]"
             }
           ],
           name: "",
           type: "tuple[]"
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
     }
   ];

  let contractAddress = "0x9e1cd5c460a28516b5e7fd1537716d67222bec6e";
  const contract = new web3.eth.Contract(
    abi,
    contractAddress  );

  //EtherJS SECTION
  // The Contract interface


  // Connect to the network
  let providerEtherJS = new ethers.providers.Web3Provider(window.web3.currentProvider);

  let contractEtherJS = new ethers.Contract(contractAddress, abi, providerEtherJS);


  $("#downloadForm").submit(function(event) {
    event.preventDefault();
    var downloadID = $("#downloadId").val();
    var signature = web3.eth.accounts.sign(
      downloadID,
      !$("#digitalSignature")
        .val()
        .startsWith("0x")
        ? "0x" + $("#digitalSignature").val()
        : $("#digitalSignature").val()
    );
    document.getElementById("digitalSignature").reset();
    var sendData = { id: downloadID, signature: signature.signature };
    $.ajax({
      type: "POST",
      enctype: "multipart/form-data",
      contentType: false, //"application/json",
      url: window.location.origin + "/api/sign/download",
      data: sendData, //JSON.stringify(formData),
      processData: false, //dataType: "json",
      success: function(user) {},
      error: function(e) {
        alert("Error!");
        console.log("ERROR: ", e);
      }
    });
  });

  //Generate User Profile

(async function() {
  let items = await contractEtherJS.getOwnItems(account);
  console.log(items);
})();



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
