const Measurement = require('../models/user.model.js');

// Save FormData - User to MongoDB
exports.save = (req, res) => {
  console.log('Post a Measurement: ' + JSON.stringify(req.body));

    // Create a Measurement
    const measurement = new Measurement({
        measurement: req.body.measurement,
        id: req.body.id,
        timestamp: req.body.timestamp
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
