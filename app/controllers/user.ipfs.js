exports.save = (req, res) => {

  //MAX_SIZE of file: 16MB
  const MAX_SIZE = 16777216;
  const pathOfUpload = req.file.path;
  const fileSize = req.file.size;
    if (fileSize > MAX_SIZE) {
      fs.unlink(pathOfUpload);
      return res.status(422).json({
        error: `File needs to be smaller than ${MAX_SIZE} bytes.`,
      });
    }


  if (!req.file) {
    return res.status(422).json({
      error: "File needs to be provided."
    });
  }

  //const data = fs.readFileSync(req.file.path);
//  var uploadData = new Buffer(data);
ipfs.addFromURL(pathOfUpload, (err, result) => {
  if (err) {
    throw err
  }
  //fs.unlink(pathOfUpload);
  console.log(result)
  res.send(result.hash);
});



};
