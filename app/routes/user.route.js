module.exports = function(app) {
  const ipfsClient = require("ipfs-http-client");
  const multer = require("multer");
  const pathFile = require("path");
  const fs = require("fs");

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

  var storage_IPFS = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, __basedir + "/public/IPFS");
    },
    filename: function(req, file, cb) {
      cb(
        null, Date.now() +
          pathFile.extname(file.originalname)
      );
    }
  });


  var upload = multer({
    storage: storage,
    limits: { fileSize: 16 * 1024 * 1024 }
  });

  var uploadIPFS = multer({
    storage: storage_IPFS,
    limits: { fileSize: 16 * 1024 * 1024 }
  });

  const users = require("../controllers/user.controller.js");
  const saveIpfs = require("../controllers/user.ipfs.js");
  var path = __basedir + "/views/";

  router.use(function(req, res, next) {
    console.log("/" + req.method);
    next();
  });

  app.get("/", (req, res) => {
    res.sendFile(path + "index.html");
  });

  app.get("/ipfs.html", (req, res) => {
    res.sendFile(path + "ipfs.html");
  });

  app.get("/index.html", (req, res) => {
    res.sendFile(path + "index.html");
  });

  // Save a User's Info to MongoDB
  app.post("/api/users/save", upload.single("file"), users.save);

  //Attach a file to IPFS
  app.post("/api/ipfs/save", uploadIPFS.single("ipfs_file"), saveIpfs.save);

  // Retrieve all Users' Info
  app.get("/api/users/all", users.findAll);

  app.use("/", router);

  app.use("*", (req, res) => {
    res.sendFile(path + "404.html");
  });
};
