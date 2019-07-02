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

  const contract = new web3.eth.Contract(abi, addressContract);

  //IPFS ADD FILES
  $("#IPFSform").submit(function(event) {
    // Prevent the form from submitting via the browser.
    event.preventDefault();
    $("#resultIPFS").html("");

    var ipfsInput = document.getElementById("file");
    var id = $("#idOfIPFS").val();

    contract.methods
      .dataIsYourData(id, account)
      .call({ from: account })
      .then(function(result) {
        if (result) {
          contract.methods
            .addAddressIPFS(ipfsHashToBytes32(ipfsInput), id)
            .send({ from: account })
            .then(function(result) {})
            .catch(function(error) {
              i;
              alert(error);
            });
        } else {
          alert("Insert only on your own Ethereum Submission");
        }
      });
  });
});

function ipfsHashToBytes32(hash) {
  var hashPart1 = ethers.utils.formatBytes32String(hash.toString().slice(0, 31));
  var hashPart2 = ethers.utils.formatBytes32String(hash.toString().slice(31, hash.length));
  return new Array(hashPart1, hashPart2);
}
