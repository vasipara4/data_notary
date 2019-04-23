const Measurement = require('../models/user.model.js');

// Save FormData - User to MongoDB
exports.save = (req, res) => {
  console.log('Post a Measurement: ' + JSON.stringify(req.body));
  // TODO: Validate that dateServer is close to req.body.timestamp
  var dateServer = Math.floor(new Date() / 1000);
  console.log("Server Time:"+dateServer);
  console.log("Tx Time:"+ req.body.timestamp);
    // Create a Measurement
    const measurement = new Measurement({
        measurement: req.body.measurement,
        id: req.body.id,
        timestamp: req.body.timestamp,
        submitter: req.body.submitter,
        gasUsed: req.body.gasUsed
    });

    //Average transaction's duration of Ethereum with safelow gas price: <30min
    //33min limit to post data from Ethereum
  //  if (dateServer < req.body.timestamp || dateServer > req.body.timestamp + )

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
