module.exports = function(app) {
  const ipfsClient = require("ipfs-http-client");
  const multer = require("multer");
  const pathFile = require("path");
  const fs = require("fs");
  const Web3 = require('web3');

  //var web3 = new Web3('http://localhost:8545');
  console.log("Connected to Ropsten");

  var ipfs = ipfsClient("localhost", "5001", { protocol: "http" });

  var express = require("express");
  var router = express.Router();

  var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, __basedir + "/public/uploads");
    },
    filename: function(req, file, cb) {
      cb(
        null,
        req.body.submitter +
          req.body.timestamp +
          pathFile.extname(file.originalname)
      );
    }
  });

 var storage_IPFS = multer.memoryStorage(); //multer.diskStorage({
  //   destination: function(req, file, cb) {
  //     cb(null, __basedir + "/public/IPFS");
  //   },
  //   filename: function(req, file, cb) {
  //     cb(null, Date.now() + "IPFS" + pathFile.extname(file.originalname));
  //   }
  // });

  var upload = multer({
    storage: storage,
    limits: { fileSize: 16 * 1024 * 1024 }
  });

  var uploadIPFS = multer({
    storage: storage_IPFS,
    limits: { fileSize: 16 * 1024 * 1024 }
  });

  const users = require("../controllers/user.controller.js");
  //  const saveIpfs = require("../controllers/user.ipfs.js");
  var pathOfHtml = __basedir + "/views/";

  router.use(function(req, res, next) {
    console.log("/" + req.method);
    next();
  });

  app.get("/", (req, res) => {
    res.sendFile(pathOfHtml + "index.html");
  });

  app.get("/ipfs.html", (req, res) => {
    res.sendFile(pathOfHtml + "ipfs.html");
  });

  app.get("/index.html", (req, res) => {
    res.sendFile(pathOfHtml + "index.html");
  });

  // Save a User's Info to MongoDB
  app.post("/api/users/save", upload.single("file"), users.save);

  //Attach a file to IPFS
  app.post("/api/ipfs/save", uploadIPFS.single("file"), (req, res) => {
    //MAX_SIZE of file: 16MB
    const MAX_SIZE = 16777216;
    const pathOfUpload =
      "http://miletus.dynu.net:3008/IPFS/" + req.file.filename;
    console.log(pathOfUpload);
    const fileSize = req.file.size;
    if (fileSize > MAX_SIZE) {
      return res.status(422).json({
        error: `File needs to be smaller than ${MAX_SIZE} bytes.`
      });
    }

    if (!req.file) {
      return res.status(422).json({
        error: "File needs to be provided."
      });
    }

    var resultIPFS = ipfs.add(req.file.buffer,{progress: (prog) => {console.log(`received: ${prog}`);} }, (err, result) => {
      if (err) {
        throw err;
      }
      console.log(result);
      res.json(result);
    });
  });

  // Retrieve all Users' Info
  app.get("/api/users/all", users.findAll);

  app.use("/", router);

  app.use("*", (req, res) => {
    res.sendFile(pathOfHtml + "404.html");
  });
};
