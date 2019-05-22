const Measurement = require('../models/user.model.js');
var pathFile = require('path');
const Web3 = require('web3');
var web3 = new Web3('http://localhost:8545');

// Save FormData - User to MongoDB
exports.save = (req, res) => {
  //console.log('Post a Measurement: ' + JSON.stringify(req.body));
  // TODO: Validate that dateServer is close to req.body.timestamp
  var url_file = "http://miletus.dynu.net:3008/uploads/" + req.body.submitter + req.body.timestamp + pathFile.extname(req.file.originalname);
  var dateServer = Math.floor(new Date() / 1000);
  console.log("Server Time:"+dateServer);
  console.log("Tx Time:"+ req.body.timestamp);

  //VALIDATION RULES:
  //dateServer can't be smaller than block.timestamp
  //after 150 seconds the POST request is canceled
  if (dateServer<req.body.timestamp || dateServer > req.body.timestamp + 200 ) {
    res.status(400).send({
        message: "Error: POST timeout"
    });
  }

  //Account must be a valid Ethereum Address
  // if (!web3.utils.isAddress(req.body.submitter)) {
  //   res.status(400).send({
  //       message: "Error"
  //   });
  // }
  // console.log(web3.utils.isAddress(req.body.submitter));

    // Create a Measurement
    const measurement = new Measurement({
        measurement: req.body.measurement,
        id: req.body.id,
        timestamp: req.body.timestamp,
        submitter: req.body.submitter,
        gasUsed: req.body.gasUsed,
        url: url_file
    });


    // Save a Measurement in the MongoDB
    measurement.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// Fetch all Users
exports.findAll = (req, res) =>  {
  console.log("Fetch all Users");

    Measurement.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
