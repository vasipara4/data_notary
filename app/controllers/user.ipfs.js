exports.save = (req, res) => {

  //MAX_SIZE of file: 16MB
  const MAX_SIZE = 16777216;

  const fileSize = req.file.size;
    if (fileSize > MAX_SIZE) {
      fs.unlink(req.file.path);

      return res.status(422).json({
        error: `File needs to be smaller than ${MAX_SIZE} bytes.`,
      });
    }


  if (!req.file) {
    return res.status(422).json({
      error: "File needs to be provided."
    });
  }

  const data = fs.readFileSync(req.file.path);

/*  return ipfs.add(data, (err, files) => {
    fs.unlink(req.file.path);
    if (files) {
      return res.json({
        hash: files[0].hash
      });
    }

    return res.status(500).json({
      error: err
    });
  });*/
};
