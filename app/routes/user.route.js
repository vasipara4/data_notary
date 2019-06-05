module.exports = function(app) {
  const ipfsClient = require("ipfs-http-client");
  const multer = require("multer");
  const path = require("path");
  var crypto = require("crypto");

  var ipfs = ipfsClient("localhost", "5001", { protocol: "http" });

  var express = require("express");
  var router = express.Router();

  //random Value Generator
  function randomValueHex(len) {
    return crypto
      .randomBytes(Math.ceil(len / 2))
      .toString("hex") // convert to hexadecimal format
      .slice(0, len); // return required number of characters
  }

  //Storage options
  var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, __basedir + "/public/uploads");
    },
    // TODO: Create a random name via crypto!
    filename: function(req, file, cb) {
      cb(
        null,
        randomValueHex(40) +
          req.body.submitter +
          randomValueHex(5) +
          req.body.id +
          path.extname(file.originalname)
      );
    }
  });

  var upload = multer({
    storage: storage,
    limits: { fileSize: 16 * 1024 * 1024 }
  });

  //Memory Storage for IPFS files
  var storage_IPFS = multer.memoryStorage();

  var uploadIPFS = multer({
    storage: storage_IPFS,
    limits: { fileSize: 16 * 1024 * 1024 }
  });

  const users = require("../controllers/user.controller.js");
  const sign = require("../controllers/sign.download.js");
  //  const saveIpfs = require("../controllers/user.ipfs.js");
  var pathOfHtml = __basedir + "/views/";

  router.use(function(req, res, next) {
    console.log("/" + req.method);
    next();
  });

  app.get("/", (req, res) => {
    res.sendFile(pathOfHtml + "index.html");
  });

  app.get("/profile.html", (req, res) => {
    res.header("Cache-Control", "private, no-cache, no-store, must-revalidate, proxy-revalidate");
    res.header("Expires", "-1");
    res.header("Pragma", "no-cache");
    res.sendFile(pathOfHtml + "profile.html");
  });

  app.get("/marketplace.html", (req, res) => {
    res.sendFile(pathOfHtml + "marketplace.html");
  });

  app.get("/ipfs.html", (req, res) => {
    res.sendFile(pathOfHtml + "ipfs.html");
  });

  app.get("/index.html", (req, res) => {
    res.sendFile(pathOfHtml + "index.html");
  });

  // Save a User's Info to MongoDB
  app.post("/api/users/save", upload.single("file"), users.save);

  // Save a User's Info to MongoDB
  app.post("/api/users/buy", upload.none(), users.buy);

  // request download
  app.post("/api/sign/download", sign.download);

  //Attach a file to IPFS
  app.post("/api/ipfs/save", uploadIPFS.single("file"), (req, res) => {
    //MAX_SIZE of file: 16MB
    const MAX_SIZE = 16777216;
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

    //options: {onlyHash: true, progress: (prog) => {console.log(`received: ${prog}`)}}
    var resultIPFS = ipfs.add(req.file.buffer, (err, result) => {
      if (err) {
        throw err;
      }
      console.log(result);
      res.json(result);
    });
  });

  // Retrieve all Users' Info
  app.get("/api/users/all", users.findAll);

  app.get("/api/users/strings", users.findStrings);

  app.use("/", router);

  app.use("*", (req, res) => {
    res.sendFile(pathOfHtml + "404.html");
  });
};
