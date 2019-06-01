const mongoose = require("mongoose");
const FindFile = require("../models/user.model.js");

exports.download = (req, res) => {
  var id = req.body.id;
  if (typeof id != "string") {
    res.status(400).send({
      message: "Error"
    });
  }
  var signature = req.body.signature;
  var accountToBeVerified = web3.eth.accounts.recover(id, signature);
  var dataToBeVerified;
  var dataOriginal;
  contract.methods
    .getDataShareFromAddressID(accountToBeVerified, id)
    .call({ from: "0xc5bc9893289dfb4549646f7e176bb3f479100518" })
    .then(function(result) {
      dataToBeVerified = result;
    });

  contract.methods
    .getDataDetails(id)
    .call({ from: "0xc5bc9893289dfb4549646f7e176bb3f479100518" })
    .then(function(originalHash) {
      dataOriginal = originalHash[1];

      if (dataOriginal != dataToBeVerified) {
        res.status(400).send({
          message: "Error"
        });
      }

      //var pendingFile = mongoose.model('File', )
      FindFile.find({ id: id }).then(result => {
        var link = result.url;
        res.send(link);
      });
    });
};
