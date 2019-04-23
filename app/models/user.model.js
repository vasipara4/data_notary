const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    measurement: {
      type: String,
      required: true
    },
    id: {
      type: Number,
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
      required: true
    }
});

module.exports = mongoose.model('Measurement', UserSchema);
