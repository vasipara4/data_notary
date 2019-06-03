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
    }
  ];
  //Web3 Init Contract
  let contractAddress = "0xab4e31088762c483a32bbcec5b81486bc3da9b7d";
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

  //Print the marketplace
  (async function() {
  let getItems = await contractEtherJS.getItemsBuyable();
  console.log(getItems);

    await contractEtherJS
      .getItemsBuyable()
      .then(function(items) {
        for (var i = 0; i < items[0].length; i++) {
          if (i % 3 == 0)
            $("#marketplaceContainer").append(`<div class="row">`);
          var idOfItem = items[1][i].toString();
          var data = items[0][i].data.toHexString();
          var date = unixTimeToDate(items[0][i].date.toString());
          var ipfsAddress =
            ethers.utils.parseBytes32String(items[0][i].addressIPFS[0]) == ""
              ? "Empty"
              : ethers.utils.parseBytes32String(items[0][i].addressIPFS[0]) +
                ethers.utils.parseBytes32String(items[0][i].addressIPFS[1]);
          var valueWei = items[0][i].valueWei.toString();
          $("#marketplaceContainer").append(
            `<div class="col-sm-4">
          <form id="buyItem` +
              i +
              `" class="formdataBuy"> <div class="card card-price">
            <div class="card-img"></div><div class="card-body"><div class="lead">Title will ADDED</div><ul class="details"><li>Description</li><li>
            Extra Content: ` +
              ipfsAddress +
              `</li><li> Date Inserted: ` +
              date +
              `</li><li>ID of File: ` +
              `<span id="buyItem` +
              i +
              `ID">` +
              idOfItem +
              `</span>` +
              `</li></ul><div class="price"><span id="buyItem` +
              i +
              `Value">` +
              valueWei +
              `</span>``Wei></div><input type="Submit" class="btn btn-primary btn-lg btn-block buy-now" value="Buy now">
            </div></div></form></div>`
          );
          if (i % 3 == 2) $("#marketplaceContainer").append(`</div>`);
        }
      })
      .catch(e => {
        console.log("Error");
        $("#marketplaceContainer").html(
          `<li class="list-group-item"><strong>Error</strong></li>`
        );
      });
  })();

  //Buy Request
  $(".formdataBuy").submit(function(e) {
    var currentThis = this;
    alert(this.id);
    e.preventDefault(); // breaks this
    var formId = currentThis.id;
    var weiValueForm = formId + "Value";
    var idItemForm = formId + "ID";
    var weiToPay = $("#" + weiValueForm).val();
    var idRequest = $("#" + idItemForm).val();
    contract.methods
      .takeCopyrights(idRequest)
      .send({ from: account, value: weiToPay })
      .then(console.log("Transaction Completed!"))
      .catch(e => console.log(e));
  });
});
