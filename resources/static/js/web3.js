var account;
var contract;
var web3;
window.addEventListener('load', () => {

  const desiredNetwork = 3;
  var networkVersion;
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
    var accountsPromise = web3.eth.getAccounts();
    var networkIdPromise = web3.eth.net.getId();// web3.version.network;
    Promise.all([networkIdPromise,accountsPromise]).then(function(result){
      //console.log(result[0]);
      networkVersion=result[0];
      var accounts= result[1];
      account=accounts[0];
     if (networkVersion != desiredNetwork) {
        alert("Please switch to ropsten network.")
     }
    }).catch(console.error);
  } else {
      if (window.confirm('No web3 detected! You should consider trying MetaMask!\nRedirect to their website?'))
      {
      window.location.href='https://metamask.io/';
      }
    // fallback
    web3 = new Web3(new Web3.providers.HttpProvider('HTTP://127.0.0.1:8545'));
  }



   //console.log(web3.eth.net.getId());

  /*web3.eth.getAccounts().then((f) => {
    account = f[0];
   });*/

  contract = new web3.eth.Contract([
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "idToData",
		"outputs": [
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
				"name": "_data",
				"type": "string"
			},
			{
				"name": "_id",
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
				"type": "string"
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
	}
],"0x63c495af0dcc8cd7077e9b78910512008122a218");

});
