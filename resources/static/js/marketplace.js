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
  const providerEtherJS = new ethers.providers.Web3Provider(
    window.web3.currentProvider
  );
  // The Contract interface
  const contractEtherJS = new ethers.Contract(
    addressContract,
    abi,
    providerEtherJS
  );

  //Buy Request
  $("body").on("submit", ".formdataBuy", function submit(e) {
    e.preventDefault();
    var formId = $(this).attr("id");
    var weiValueForm = formId + "Value";
    var idItemForm = formId + "ID";
    var typeID = formId + "type";
    var idSubmit = formId + "Submit";
    var weiToPay = $("#" + weiValueForm).val();
    var idRequest = $("#" + idItemForm).val();

    $("#" + idSubmit).attr("value", "Loading...");
    contract.methods
      .takeCopyrights(idRequest)
      .send({ from: account, value: weiToPay })
      .then(function(result) {
        console.log("Transaction Completed!");
        $("#" + idSubmit).attr("value", "You Have It");
        $("#" + idSubmit).attr("disabled", true);
      })
      .catch(e => {
        console.log(e);
        $("#" + idSubmit).attr("value", "Buy Now");
      });
  });

  //Convert Unix Time to Human Readable Version
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

  //Address for href IPFS items => IPFS gateway
  const miletusIPFS = "http://miletus.dynu.net:8080/ipfs/";

  //Calculate Marketplace Variables & after print them
  (async function() {
    account = await web3.eth.getAccounts();
    account = account[0];
    const stringsTitleDescID = await $.ajax({
      type: "GET",
      url: window.location.origin + "/api/users/strings"
    });
    const items = await contractEtherJS.getItemsBuyable(account);
    for (var i = 0; i < items[1].length; i++) {
      var title = "";
      var description;
      var idOfItem = items[1][i];
      var _isYours = items[2][i];
      var type = "";
      var submitButton;
      $.each(stringsTitleDescID, function(index, user) {
        if (user.hash.toString() === idOfItem.toString()) {
          title = user.title;
          description = user.description;
          type = user.type;
          stringsTitleDescID.splice(index, 1);
          return false;
        }
      });
      //if user hasn't added contents to our contract through our app => don't show his contents
      if (title === "") continue;
      type =
        type === ""
          ? ""
          : `<li>Type: ${type} </li><input id="buyItem${i}type"  type ="hidden"  value ="${type}" readonly />`;
      //if content is yours => make submit disable
      if (_isYours) {
        _isYours = `onsubmit="return false;"`;
        submitButton = `"You have it" disabled`;
      } else {
        _isYours = "";
        submitButton = `"Buy Now"`;
      }
      var ownerOfData = items[0][i].submitter;
      var data = items[0][i].data.toHexString();
      var date = unixTimeToDate(items[0][i].date.toString());
      const ipfsAddressPart =
        ethers.utils.parseBytes32String(items[0][i].addressIPFS[0]) +
        ethers.utils.parseBytes32String(items[0][i].addressIPFS[1]);
      var ipfsAddress =
        ethers.utils.parseBytes32String(items[0][i].addressIPFS[0]) == ""
          ? "Empty"
          : `<a target="_blank" href="` +
            miletusIPFS +
            ipfsAddressPart +
            `">` +
            ipfsAddressPart +
            `</a>`;
      var valueWei = items[0][i].valueWei.toString();
      printMarketplace(
        i,
        items[1].length,
        _isYours,
        ownerOfData,
        title,
        description,
        ipfsAddress,
        date,
        idOfItem,
        type,
        valueWei,
        submitButton
      );
    }
  })();
});

//Print Marketplace
function printMarketplace(
  i,
  length,
  _isYours,
  _owner,
  title,
  description,
  ipfsAddress,
  date,
  idOfItem,
  type,
  valueWei,
  submitButton
) {
  var round = (i-(i%3))/3 ;
  if (i%3 ===0) $("#marketplaceContainer").append(`<div class="row" id="row${round}" >`);

  $(`#row${round}`).append(
    `<div class="col-sm-4">
    <form id="buyItem` +
      i +
      `" class="formdataBuy" ${_isYours} > <div class="card card-price">
      <div class="card-body"><div class="lead">${title}</div><ul class="details"><li>${description}</li><li>
      Extra Content (IPFS):  ${ipfsAddress}  </li>${type}<li> Date Inserted: ` +
      date +
      `</li><li> Owner:<a target="_blank" href="https://ropsten.etherscan.io/address/${_owner}">${_owner}</a></li><li>Hash of File: ` +
      `<input id="buyItem${i}ID"  type = "hidden"  value = "${idOfItem}" readonly />` +
      idOfItem.toHexString() +
      `</li></ul><div class="price"><input id="buyItem${i}Value"  type = "hidden" value = "${valueWei}" readonly />` +
      valueWei +
      ` Wei</div><input type="Submit" id="buyItem${i}Submit" class="btn btn-primary btn-md btn-block buy-now" value=${submitButton}>
      </div></div> </form></div>`
  );

  if (i === length - 1 || i% 3 === 2) {
    $(`#row${round}`).append(`</div>`);
  }
}
