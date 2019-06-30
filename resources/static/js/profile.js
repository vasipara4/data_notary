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

  const addressContract = "0xfc291dc329d996a908fc8c0a8f6606ddd5f7984b";
  const abi = [
    {
      constant: false,
      inputs: [{ name: "amount", type: "uint256" }],
      name: "withdrawFunds",
      outputs: [{ name: "success", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [{ name: "_owner", type: "address" }],
      name: "getItemsPurchased",
      outputs: [
        {
          components: [
            { name: "submitter", type: "address" },
            { name: "data", type: "uint256" },
            { name: "date", type: "uint256" },
            { name: "valueWei", type: "uint256" },
            { name: "addressIPFS", type: "bytes32[2]" }
          ],
          name: "",
          type: "tuple[]"
        },
        { name: "", type: "bool[]" }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [{ name: "_input", type: "string" }],
      name: "dataWriteWithKeccak",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        { name: "_hash", type: "uint256" },
        { name: "_valueWei", type: "uint256" }
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
        { name: "_hash", type: "uint256" },
        { name: "_owner", type: "address" }
      ],
      name: "verifyHash",
      outputs: [{ name: "", type: "bool" }],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [{ name: "_hash", type: "uint256" }],
      name: "getDataAddressIPFS",
      outputs: [{ name: "", type: "bytes32" }, { name: "", type: "bytes32" }],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        { name: "_addressIPFS", type: "bytes32[2]" },
        { name: "_hash", type: "uint256" }
      ],
      name: "addAddressIPFS",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [{ name: "_owner", type: "address" }],
      name: "getOwnItems",
      outputs: [
        {
          components: [
            { name: "submitter", type: "address" },
            { name: "data", type: "uint256" },
            { name: "date", type: "uint256" },
            { name: "valueWei", type: "uint256" },
            { name: "addressIPFS", type: "bytes32[2]" }
          ],
          name: "",
          type: "tuple[]"
        },
        { name: "", type: "bool[]" },
        { name: "", type: "uint256[]" }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        { name: "_owner", type: "address" },
        { name: "_hash", type: "uint256" }
      ],
      name: "getDataShareFromAddressID",
      outputs: [{ name: "", type: "uint256" }, { name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [{ name: "_hash", type: "uint256" }],
      name: "dataExists",
      outputs: [{ name: "", type: "bool" }],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [{ name: "_hash", type: "uint256" }],
      name: "takeCopyrights",
      outputs: [],
      payable: true,
      stateMutability: "payable",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        { name: "_to", type: "address" },
        { name: "_hash", type: "uint256" }
      ],
      name: "shareOwnership",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        { name: "_hash", type: "uint256" },
        { name: "_valueWei", type: "uint256" }
      ],
      name: "updateWeiValue",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [{ name: "_hash", type: "uint256" }],
      name: "getTimestamp",
      outputs: [{ name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        { name: "_hash", type: "uint256" },
        { name: "_owner", type: "address" }
      ],
      name: "dataIsYourData",
      outputs: [{ name: "", type: "bool" }],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [{ name: "_hash", type: "uint256" }],
      name: "getDataDetails",
      outputs: [
        { name: "", type: "address" },
        { name: "", type: "uint256" },
        { name: "", type: "uint256" },
        { name: "", type: "uint256" },
        { name: "", type: "bytes32" },
        { name: "", type: "bytes32" }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "getNumBuyable",
      outputs: [{ name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [{ name: "_owner", type: "address" }],
      name: "getItemsBuyable",
      outputs: [
        {
          components: [
            { name: "submitter", type: "address" },
            { name: "data", type: "uint256" },
            { name: "date", type: "uint256" },
            { name: "valueWei", type: "uint256" },
            { name: "addressIPFS", type: "bytes32[2]" }
          ],
          name: "",
          type: "tuple[]"
        },
        { name: "", type: "uint256[]" },
        { name: "", type: "bool[]" }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [{ name: "_from", type: "address" }],
      name: "getBalance",
      outputs: [{ name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function"
    }
  ];

  //Web3 Init Contract
  const contract = new web3.eth.Contract(abi, addressContract);

  //EtherJS SECTION
  // Connect to the network
  let providerEtherJS = new ethers.providers.Web3Provider(
    window.web3.currentProvider
  );
  // The Contract interface
  let contractEtherJS = new ethers.Contract(
    addressContract,
    abi,
    providerEtherJS
  );

  // Generate signature
  $("#generateSign").submit(function(event) {
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
    $("#digitalSignatureToPost").val(signature.signature);
    $("#idToPost").val(downloadID);

    $("#downloadId").val("");
  });

  //Init Your Copyrights Wallet
  (async function() {
    account = await web3.eth.getAccounts();
    account = account[0];
    $("#accountToPost").val(account);
    $("#accountName").html("Account: " + account);
    const stringsIDtxBlockHash = await $.ajax({
      type: "GET",
      url: window.location.origin + "/api/users/strings"
    });

    const stringsForOriginalItems = stringsIDtxBlockHash;

    //Items Inserted (Original)
    contractEtherJS
      .getOwnItems(account)
      .then(function(items) {
        var emptyWallet = 1;
        for (var i = 0; i < items[0].length; i++) {
          if (!items[1][i]) break;
          emptyWallet = 0;
          var txHash = "";
          var blockHash = "";
          var type = "";
          var title = "";
          var hashFromEthereumCall = items[0][i].data.toString();
          $.each(stringsForOriginalItems, function(index, user) {
            if (user.hash.toString() === hashFromEthereumCall) {
              txHash = user.transactionHash;
              blockHash = user.blockHash;
              type = user.type;
              title = user.title;
              stringsForOriginalItems.splice(index, 1);
              return false;
            }
          });
          blockHash = blockHash === "" ? `` : `<p>Block Hash: ${blockHash}</p>`;
          txHash = txHash === "" ? "" : `<p>Transaction Hash: ${txHash} </p>`;
          type = type === "" ? "" : `<p>Type: ${type} </p>`;
          title = title === "" ? "" : `<p>Type: ${title} </p>`;
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
            `<li class="list-group-item">` +
              title +
              `<p>Data hash: ` +
              items[0][i].data.toHexString() +
              `</p><p>Price: ` +
              valueWei +
              `</p>` +
              type +
              `<p>IPFS Address: ` +
              ipfsAddress +
              `</p><p>Date: ` +
              unixTimeToDate(items[0][i].date.toString()) +
              `</p>` +
              txHash +
              blockHash +
              `</li>`
          );
        }

        if (emptyWallet) {
          $("#showYourData").append(
            `<li class="list-group-item"><strong>No Original Files</strong></li>`
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

    //Items Purchased
    contractEtherJS
      .getItemsPurchased(account)
      .then(function(items) {
        var emptyWallet = 1;
        for (var i = 0; i < items[0].length; i++) {
          if (!items[1][i]) break;
          emptyWallet = 0;
          var txHash = "";
          var blockHash = "";
          var type = "";
          var title = "";
          var hashFromEthereumCallPurchased = items[0][i].data.toString();
          $.each(stringsIDtxBlockHash, function(index, user) {
            if (
              user.hash.toString() ===
              hashFromEthereumCallPurchased
            ) {
              type = user.type;
              title = user.title;
              stringsIDtxBlockHash.splice(index, 1);
              return false;
            }
          });
          title = title === "" ? "" : `<p>Type: ${title} </p>`;
          type = type === "" ? "" : `<p>Type: ${type} </p>`;
          var ipfsAddress =
            ethers.utils.parseBytes32String(items[0][i].addressIPFS[0]) == ""
              ? "Empty"
              : ethers.utils.parseBytes32String(items[0][i].addressIPFS[0]) +
                ethers.utils.parseBytes32String(items[0][i].addressIPFS[1]);
          var valueWei = "Purchased";
          $("#showYourData").append(
            `<li class="list-group-item">` +
              title +
              `<p>Data hash: ` +
              items[0][i].data.toHexString() +
              `</p><p>Mode: ` +
              valueWei +
              `</p>` +
              type +
              `<p>IPFS Address: ` +
              ipfsAddress +
              `</p><p>Date: ` +
              unixTimeToDate(items[0][i].date.toString()) +
              `</p>` +
              txHash +
              blockHash +
              `</li>`
          );
        }

        if (emptyWallet) {
          $("#showYourData").append(
            `<li class="list-group-item"><strong>No Purchased Items</strong></li>`
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

  //Withdraw button
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

  //Update Price button
  $("#UpdateWeiForm").submit(function(event) {
    // Prevent the form from submitting via the browser.
    event.preventDefault();
    var hashOfFileUpdate = $("#hashOfFileUpdate").val();
    var newValueWei = $("#updateValueWei").val();
    contract.methods
      .updateWeiValue(hashOfFileUpdate, newValueWei)
      .send({ from: account })
      .then(function(res) {
        console.log(res);
      })
      .catch(e => console.log(e));
  });

  //convert Unix Time to Date
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

  $("#SendHashToAddress").submit(function(event) {
    // Prevent the form from submitting via the browser.
    event.preventDefault();
    var hashOfFile = $("#hashOfFileToSend").val();
    var toAddress = $("#addressToOwnYourFile").val();
    contract.methods
      .shareOwnership(toAddress, hashOfFile)
      .send({ from: account })
      .then(function(result) {
        console.log(result);
      });
  });
});
