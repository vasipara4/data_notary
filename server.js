var express = require('express');
var app = express();
//const Web3 = require('web3');
//const net = require('net');

//const multer = require('multer');

app.use(express.static('resources'));
app.use(express.static('public'));

global.__basedir = __dirname;

// Configuring the database
const dbConfig = require('./app/config/mongodb.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, { useNewUrlParser: true, useCreateIndex: true })
.then(() => {
    console.log("Successfully connected to MongoDB.");
}).catch(err => {
    console.log('Could not connect to MongoDB.');
    process.exit();
});


require('./app/routes/user.route.js')(app);

// Create a Server
var server = app.listen(3008, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("App listening at http://%s:%s", host, port)

})
