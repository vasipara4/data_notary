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
      console.log(result);
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
 
  contract = new web3.eth.Contract([ { "constant": false, "inputs": [ { "name": "data", "type": "uint256" }, { "name": "id", "type": "uint256" } ], "name": "dataWrite", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "id", "type": "uint256" } ], "name": "notDuplicates", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "hashToVerify", "type": "uint256" }, { "name": "id", "type": "uint256" } ], "name": "verify", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" } ],"0x048ae75c5927fc0ba7673fc61a870b58338166fb");
  
});