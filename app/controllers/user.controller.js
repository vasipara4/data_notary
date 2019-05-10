const Measurement = require('../models/user.model.js');

// Save FormData - User to MongoDB
exports.save = (req, res) => {
  //console.log('Post a Measurement: ' + JSON.stringify(req.body));
<<<<<<< HEAD
  var url_start = "http://miletus.dynu.net:3008/uploads/"+ /*dateOfFile + "-" +*/ file.originalname;
=======
  var url_start = "http://miletus.dynu.net:3008/uploads/"+ req.body.id + "-" + file.originalname;
>>>>>>> parent of e6d21e2... Name of upload
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

    // Create a Measurement
    const measurement = new Measurement({
        measurement: req.body.measurement,
        id: req.body.id,
        timestamp: req.body.timestamp,
        submitter: req.body.submitter,
        gasUsed: req.body.gasUsed,
        url: url_start
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
