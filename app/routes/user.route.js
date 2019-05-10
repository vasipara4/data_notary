module.exports = function(app) {
  var express = require("express");
  var router = express.Router();
  const multer = require("multer");
<<<<<<< HEAD
//  var dateOfFile = Date.now();
=======

>>>>>>> parent of e6d21e2... Name of upload
  var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, __basedir + "/public/uploads");
    },
    filename: function(req, file, cb) {
<<<<<<< HEAD
      cb(null, /*dateOfFile + "-" +*/ file.originalname );
=======
      cb(null, req.body.id + "-" + file.originalname );
>>>>>>> parent of e6d21e2... Name of upload
    }
  });
  var upload = multer({
    storage: storage,
    limits: { fileSize: 16 * 1024 * 1024 }
  });

  const users = require("../controllers/user.controller.js");
  var path = __basedir + "/views/";

  router.use(function(req, res, next) {
    console.log("/" + req.method);
    next();
  });

  app.get("/", (req, res) => {
    res.sendFile(path + "index.html");
  });

  // Save a User to MongoDB
  app.post("/api/users/save", upload.single("file"), users.save);

  // Retrieve all Users
  app.get("/api/users/all", users.findAll);

  app.use("/", router);

  app.use("*", (req, res) => {
    res.sendFile(path + "404.html");
  });
};
