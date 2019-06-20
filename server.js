var express = require("express");
var helmet = require('helmet');

var app = express();

//Connecting to ropsten
const Web3 = require("web3");
global.web3 = new Web3(
  new Web3.providers.HttpProvider("http://localhost:8545")
);
web3.eth.net
  .getNetworkType()
  .then(result => console.log("Ethereum network:" + result));
//const net = require('net');
global.contract = new web3.eth.Contract(
  [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_addressIPFS",
				"type": "bytes32[2]"
			},
			{
				"name": "_hash",
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
		"constant": false,
		"inputs": [
			{
				"name": "_hash",
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
		"constant": false,
		"inputs": [
			{
				"name": "_hash",
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
		"constant": false,
		"inputs": [
			{
				"name": "_hash",
				"type": "uint256"
			},
			{
				"name": "_valueWei",
				"type": "uint256"
			}
		],
		"name": "updateWeiValue",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
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
		"constant": true,
		"inputs": [
			{
				"name": "_hash",
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
				"name": "_hash",
				"type": "uint256"
			},
			{
				"name": "_owner",
				"type": "address"
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
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_hash",
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
		"constant": true,
		"inputs": [
			{
				"name": "_hash",
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
		"inputs": [
			{
				"name": "_owner",
				"type": "address"
			},
			{
				"name": "_hash",
				"type": "uint256"
			}
		],
		"name": "getDataShareFromAddressID",
		"outputs": [
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
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "getItemsPurchased",
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
				"name": "_hash",
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
				"name": "_hash",
				"type": "uint256"
			},
			{
				"name": "_owner",
				"type": "address"
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
],
  "0xa89fc3f6dde67bc1d0c0c144d15c420f7be385f2"
);

app.use(helmet());
app.use(express.static("resources"));
//app.use(express.static("public"));

global.__basedir = __dirname;

// Configuring the database
const dbConfig = require("./app/config/mongodb.config.js");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect(
    dbConfig.url, {
      useNewUrlParser: true,
      useCreateIndex: true
    }
  )
  .then(() => {
    console.log("Successfully connected to MongoDB.");
  })
  .catch(err => {
    console.log("Could not connect to MongoDB.");
    process.exit();
  });

require("./app/routes/user.route.js")(app);

// Create a Server
var server = app.listen(3008, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log("App listening at http://%s:%s", host, port);
});
