const UserModelDB = require("../models/user.model.js");

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
    return res.status(400).send({
      message: "Address Error"
    });
  }
  // Create a new User model
  const saveToDB = new UserModelDB({
    title: req.body.title,
    description: req.body.description,
    id: req.body.id,
    timestamp: req.body.timestamp,
    submitter: req.body.submitter,
    gasUsed: req.body.gasUsed,
    url: url_file
  });
  var ethereumTimestamp;
  contract.methods
    .getDataDetails(req.body.id)
    .call({ from: req.body.submitter })
    .then(function(result) {
      ethereumTimestamp = result[2];

      //timestamp must be the same as in Ethereum
      if (req.body.timestamp != ethereumTimestamp) {
        return res.status(400).send({
          message: "Valid Error"
        });
      }

      // Save in the MongoDB
      saveToDB
        .save()
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message: err.message
          });
        });
    });
};

// Fetch all Users
exports.findAll = (req, res) => {
  console.log("Fetch all Users");
  var usersProjection = {
    __v: false,
    _id: false
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

// Fetch only Title/Desc/ID
exports.findStrings = (req, res) => {
  console.log("Fetch Title/Desc/ID");
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
