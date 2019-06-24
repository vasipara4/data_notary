const UserModelDB = require("../models/user.model.js");
const fs = require("fs");

// Save FormData - User to MongoDB
exports.save = (req, res) => {
  var url_file = "/uploads/" + req.file.filename;
  var dateServer = Math.floor(new Date() / 1000);
  console.log("Server Time:" + dateServer);
  console.log("Tx Time:" + req.body.timestamp);

  //VALIDATION RULES:
  //dateServer can be smaller than block.timestamp for 10 seconds
  //after 150 seconds the POST request is canceled
  // MUST: req.body.timestamp -50 < dateServer OR dateServer < req.body.timestamp + 150 to be valid
  if (
    dateServer < req.body.timestamp - 50 ||
    dateServer > req.body.timestamp + 150
  ) {
    fs.unlink(__basedir + "/public" + url_file);
    return res.status(400).send({
      message: "Error: POST timeout"
    });
  }

  if (!req.file) {
    return res.status(422).json({
      error: "File needs to be provided."
    });
  }

  //Account must be a valid Ethereum Address
  if (!web3.utils.isAddress(req.body.submitter)) {
    fs.unlink(__basedir + "/public" + url_file);
    return res.status(400).send({
      message: "Error"
    });
  }
  // Create a new User model
  const saveToDB = new UserModelDB({
    title: req.body.title,
    description: req.body.description,
    hash: req.body.hash,
    timestamp: req.body.timestamp,
    submitter: req.body.submitter,
    gasUsed: req.body.gasUsed,
    url: url_file,
    type: req.body.type,
    transactionHash: req.body.transactionHash,
    blockHash: req.body.blockHash
  });

  if (
    typeof req.body.title !== "string" ||
    typeof req.body.description !== "string" ||
    typeof req.body.gasUsed !== "string" ||
    typeof req.body.type !== "string" ||
    typeof req.body.transactionHash !== "string" ||
    typeof req.body.blockHash !== "string"
  ) {
    fs.unlink(__basedir + "/public" + url_file);
    return res.status(400).send({
      message: "Error"
    });
  }

  var ethereumTimestamp;
  contract.methods
    .dataExists(req.body.hash)
    .call({ from: req.body.submitter })
    .then(function(result) {
      if (result) {
        contract.methods
          .getDataDetails(req.body.hash)
          .call({ from: req.body.submitter })
          .then(function(result) {
            ethereumTimestamp = result[2];

            //timestamp must be the same as in Ethereum
            if (req.body.timestamp != ethereumTimestamp) {
              return res.status(400).send({
                message: "VALIDATION Error"
              });
            }

            // Save in the MongoDB
            saveToDB
              .save()
              .then(data => {
                res.send(data);
              })
              .catch(err => {
                console.log(err);
                fs.unlink(__basedir + "/public" + url_file);
                res.status(500).send({
                  message: err.message
                });
              });
          });
      } else {
        fs.unlink(__basedir + "/public" + url_file);
        return res.status(400).send({
          message: "Error"
        });
      }
    })
    .catch(err => console.log(err));
};

// // Fetch all Users
// exports.findAll = (req, res) => {
//   var usersProjection = {
//     __v: false,
//     _id: false
//   };
//
//   UserModelDB.find({}, usersProjection)
//     .then(users => {
//       res.send(users);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: err.message
//       });
//     });
// };

// Fetch only Title/Desc/Hash
exports.findStrings = (req, res) => {
  var usersProjection = {
    __v: false,
    _id: false,
    timestamp: false,
    submitter: false,
    gasUsed: false,
    url: false
  };

  UserModelDB.find({}, usersProjection)
    .then(users => {
      res.send(users);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
};

//Check file integrity
exports.fileIntegrity = (req, res) => {
  var ethers = require("ethers");
  var hash = req.body.hash;
  var address = req.body.address;
  if (!web3.utils.isAddress(address)) {
    return res.status(400).send({
      message: "Error"
    });
  }
address = address.toLowerCase();
  UserModelDB.findOne({ 'hash': hash, 'submitter': address })
    .then(users => {
      console.log(users);
      var hashOfDb;
      var url = __basedir + "/public" + users.url;
      fs.readFile(url, function(err, data) {
        if (err) {
          return res.status(400).send({
            message: "Error"
          });
        }
        const dataUint8 = new Uint8Array(data);
        hashOfDb = ethers.utils.keccak256(dataUint8);
        hashOfDb = ethers.utils.bigNumberify(hashDb).toString();
        if (hashOfDb === hash) {
          res.send("True");
        } else {
          res.send("False");
        }
      });
    })
    .catch(err => {
      res.send("Not Found in our Database");
    });
};

//Buy process
exports.buy = (req, res) => {
  var url_file = "PurchasedItem";
  var dateServer = Math.floor(new Date() / 1000);
  console.log("Server Time:" + dateServer);
  console.log("Tx Time:" + req.body.timestamp);
  //VALIDATION RULES:
  //dateServer can be smaller than block.timestamp for 10 seconds
  //after 150 seconds the POST request is canceled
  // MUST: req.body.timestamp -50 < dateServer OR dateServer < req.body.timestamp + 150 to be valid
  if (
    dateServer < req.body.timestamp - 50 ||
    dateServer > req.body.timestamp + 150
  ) {
    return res.status(400).send({
      message: "Error: POST timeout"
    });
  }

  //Account must be a valid Ethereum Address
  if (!web3.utils.isAddress(req.body.submitter)) {
    return res.status(400).send({
      message: "Error"
    });
  }

  var id = req.body.hash + req.body.submitter;
  // Create a new User model
  const saveToDBbuy = new UserModelDB({
    title: "PurchasedItem",
    description: "PurchasedItem",
    type: req.body.type,
    hash: id,
    timestamp: req.body.timestamp,
    submitter: req.body.submitter,
    gasUsed: req.body.gasUsed,
    url: url_file,
    transactionHash: req.body.transactionHash,
    blockHash: req.body.blockHash
  });
  var ethereumTimestamp;
  contract.methods
    .getDataShareFromAddressID(req.body.submitter, req.body.hash)
    .call({ from: req.body.submitter })
    .then(function(result) {
      ethereumTimestamp = result[1];
      //timestamp must be the same as in Ethereum
      if (req.body.timestamp != ethereumTimestamp) {
        return res.status(400).send({
          message: "Valid Error"
        });
      }

      // Save in the MongoDB
      saveToDBbuy
        .save()
        .then(data => {
          res.send("confirmed");
        })
        .catch(err => {
          res.status(500).send({
            message: err.message
          });
        });
    });
};
