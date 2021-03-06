const mongoose = require("mongoose");
//require('mongoose-type-url');
//work: {type: mongoose.SchemaTypes.Url, required: true},
//profile: {type: mongoose.SchemaTypes.Url, required: true},

const UserSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  hash: {
    type: String,
    unique: true,
    required: true
  },
  timestamp: {
    type: Number,
    required: true
  },
  submitter: {
    type: String,
    required: true
  },
  gasUsed: {
    type: Number,
    min: 0,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  transactionHash: {
    type: String,
    required: true
  },
  blockHash: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Measurement", UserSchema);
