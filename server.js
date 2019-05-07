var express = require('express');
var app = express();
const multer = require("multer");
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "/uploads");
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  }
});

var upload = multer({
  storage: storage,
  limits: { fileSize: 16 * 1024 * 1024 }
});
//var bodyParser = require('body-parser');
//const fileUpload = require('express-fileupload');
//var busboy = require('connect-busboy');
//const Web3 = require('web3');
//const net = require('net');
//app.use(bodyParser.json());

//const multer = require('multer');
//file size limit: 16MB
/*app.use(fileUpload({
  limits: { fileSize: 16 * 1024 * 1024 },
}));*/
/*
app.use(busboy({
  limits: {
    fileSize: 10 * 1024 * 1024
  }
}));*/


app.use(express.static('resources'));

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
