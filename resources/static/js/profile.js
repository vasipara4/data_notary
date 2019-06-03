window.addEventListener("load", () => {
  var account;
  const desiredNetwork = 3;
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (
    typeof window.ethereum !== "undefined" ||
    typeof window.web3 !== "undefined"
  ) {
    const provider = window["ethereum"] || window.web3.currentProvider;
    web3 = new Web3(provider);
    web3.eth.net.getId().then(function(networkId) {
      if (networkId != desiredNetwork)
        alert("Please switch to ropsten network.");
    });

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
		"constant": false,
		"inputs": [
			{
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "withdrawFunds",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_data",
				"type": "uint256"
			},
			{
				"name": "_id",
				"type": "uint256"
			},
			{
				"name": "_valueWei",
				"type": "uint256"
			}
		],
		"name": "dataWrite",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "dataIsYourData",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getDataAddressIPFS",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
			},
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_addressIPFS",
				"type": "bytes32[2]"
			},
			{
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "addAddressIPFS",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "getOwnItems",
		"outputs": [
			{
				"components": [
					{
						"name": "submitter",
						"type": "address"
					},
					{
						"name": "data",
						"type": "uint256"
					},
					{
						"name": "date",
						"type": "uint256"
					},
					{
						"name": "valueWei",
						"type": "uint256"
					},
					{
						"name": "addressIPFS",
						"type": "bytes32[2]"
					}
				],
				"name": "",
				"type": "tuple[]"
			},
			{
				"name": "",
				"type": "bool[]"
			},
			{
				"name": "",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_owner",
				"type": "address"
			},
			{
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getDataShareFromAddressID",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_data",
				"type": "uint256"
			},
			{
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "verifyHash",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "dataExists",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "takeCopyrights",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getTimestamp",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getDataDetails",
		"outputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "bytes32"
			},
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getNumBuyable",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "getItemsBuyable",
		"outputs": [
			{
				"components": [
					{
						"name": "submitter",
						"type": "address"
					},
					{
						"name": "data",
						"type": "uint256"
					},
					{
						"name": "date",
						"type": "uint256"
					},
					{
						"name": "valueWei",
						"type": "uint256"
					},
					{
						"name": "addressIPFS",
						"type": "bytes32[2]"
					}
				],
				"name": "",
				"type": "tuple[]"
			},
			{
				"name": "",
				"type": "uint256[]"
			},
			{
				"name": "",
				"type": "bool[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_from",
				"type": "address"
			}
		],
		"name": "getBalance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];
  //Web3 Init Contract
  let contractAddress = "0x468678792dab4bf18ca6729cd840961675ea9992";
  const contract = new web3.eth.Contract(abi, contractAddress);

  //EtherJS SECTION
  // Connect to the network
  let providerEtherJS = new ethers.providers.Web3Provider(
    window.web3.currentProvider
  );
  // The Contract interface
  let contractEtherJS = new ethers.Contract(
    contractAddress,
    abi,
    providerEtherJS
  );

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
    $("#digitalSignature").val("");
    var sendData = new FormData();
    sendData.append("account", account);
    sendData.append("id", downloadID);
    sendData.append("signature", signature.signature);

    $.ajax({
      type: "POST",
      enctype: "multipart/form-data",
      contentType: false, //"application/json",
      url: window.location.origin + "/api/sign/download",
      data: sendData, //JSON.stringify(formData),
      processData: false, //dataType: "json",
      success: function(user) {
        console.log(user);
      },
      error: function(e) {
        alert("Error!");
        console.log("ERROR: ", e);
      }
    });
  });

  // Your Copyrights Wallet
  (async function() {
    account = await web3.eth.getAccounts();
    account = account[0];
    contractEtherJS
      .getOwnItems(account)
      .then(function(items) {
        var emptyWallet = 1;
        for (var i = 0; i < items[0].length; i++) {
          if (items[1][i]) {
            emptyWallet = 0;
            var pendingId = items[2][i].toString();

            var ipfsAddress =
              ethers.utils.parseBytes32String(items[0][i].addressIPFS[0]) == ""
                ? "Empty"
                : ethers.utils.parseBytes32String(items[0][i].addressIPFS[0]) +
                  ethers.utils.parseBytes32String(items[0][i].addressIPFS[1]);
            var valueWei =
              ethers.utils.formatUnits(items[0][i].valueWei, 3) == "0.0"
                ? "Notary Mode"
                : ethers.utils.formatUnits(items[0][i].valueWei, 9) + " Gwei";
            $("#showYourData").append(
              `<li class="list-group-item"><p>ID:` +
                pendingId +
                `</p><p>Data hash: ` +
                items[0][i].data.toHexString() +
                `</p><p>Price: ` +
                valueWei +
                `</p><p>IPFS Address: ` +
                ipfsAddress +
                `</p><p>Date: ` +
                unixTimeToDate(items[0][i].date.toString()) +
                `</p>`
            );

            $("#showYourData").append(`</li>`);
          }
        }

        if (emptyWallet) {
          $("#showYourData").html(
            `<li class="list-group-item"><strong>Empty Wallet</strong></li>`
          );
          return;
        }
      })
      .catch(e => {
        console.log(e);
        $("#showYourData").html(
          `<li class="list-group-item"><strong>Error</strong></li>`
        );
      });

    // Your Balance
    contractEtherJS
      .getBalance(account)
      .then(function(item) {
        $("#withdrawEtherNumber").append(item.toString() + " Wei");
      })
      .catch(e => console.log(e));
  })();

  // TODO: Withdraw button
  $("#withdrawForm").submit(function(event) {
    // Prevent the form from submitting via the browser.
    event.preventDefault();

    var withdrawValueWei = $("#withdrawValueWei").val();
    contract.methods
      .withdrawFunds(withdrawValueWei)
      .send({ from: account })
      .then(function(res) {
        location.reload();
      })
      .catch(e => console.log(e));
  });

  // TODO: download button with Ajax POST

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
