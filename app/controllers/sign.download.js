const mongoose = require("mongoose");
const FindFile = require("../models/user.model.js");

exports.download = (req, res) => {
  for (var itemsFromBody in req.body){
    console.log("Key: " + itemsFromBody + " Value: " + req.body[itemsFromBody]);
}
  var id = req.body.id;
  var signature = req.body.signature;
  var account = req.body.account;
  if (typeof id != "string" || typeof account != "string") {
    return res.status(400).send({
      message: "Error"
    });
  }

  var accountToBeVerified = web3.eth.accounts.recover(id, signature);

  if (account != accountToBeVerified) {
    return res.status(400).send({
      message: "Error"
    });
  }

  var dataToBeVerified;
  var dataOriginal;
  contract.methods
    .getDataShareFromAddressID(accountToBeVerified, id)
    .call({ from: "0xc5bc9893289dfb4549646f7e176bb3f479100518" })
    .then(function(result) {
      //Getting the data hash of buyer
      dataToBeVerified = result;

      contract.methods
        .getDataDetails(id)
        .call({ from: "0xc5bc9893289dfb4549646f7e176bb3f479100518" })
        .then(function(originalHash) {
          //Getting Hash of original file
          dataOriginal = originalHash[1];

          if (dataOriginal != dataToBeVerified) {
            return res.status(400).send({
              message: "Error"
            });
          }
          res.json("is working");
          //var pendingFile = mongoose.model('File', )
          FindFile.find({ id: id }).then(result => {
            var link = result.url;
            res.send(link);
          });
        });
    });
};
