const Measurement = require('../models/user.model.js');
const fileUpload = require('express-fileupload');

// Save FormData - User to MongoDB
exports.save = (req, res) => {
  console.log('Post a Measurement: ' + JSON.stringify(req.body));
  // TODO: Validate that dateServer is close to req.body.timestamp
  var dateServer = Math.floor(new Date() / 1000);
  console.log("Server Time:"+dateServer);
  console.log("Tx Time:"+ req.body.timestamp);

  //VALIDATION RULERS:
  //dateServer can't be smaller than block.timestamp
  //after 200 seconds the POST request is canceled
  if (dateServer<req.body.timestamp || dateServer > req.body.timestamp + 200 ) {
    res.status(500).send({
        message: "Error: POST timeout"
    });
  }
  if (Object.keys(req.files).length != 1) {
    return res.status(400).send('Upload only one file, please');
  }

//upload file to Server
var uploadedFile = req.files.pdf;
console.log(__basedir);
uploadedFile.mv('./files/pdf/' + req.files.pdf.name, function(err) {
    if (err)
      return res.status(500).send(err + " on directory");
  });

    // Create a Measurement
    const measurement = new Measurement({
        measurement: req.body.measurement,
        id: req.body.id,
        timestamp: req.body.timestamp,
        submitter: req.body.submitter,
        gasUsed: req.body.gasUsed
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
