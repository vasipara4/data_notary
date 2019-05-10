const mongoose = require('mongoose');
//require('mongoose-type-url');
//work: {type: mongoose.SchemaTypes.Url, required: true},
//profile: {type: mongoose.SchemaTypes.Url, required: true},

const UserSchema = mongoose.Schema({
    measurement: {
      type: String,
      required: true
    },
    id: {
      type: Number,
      min: 0,
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
    }
});

module.exports = mongoose.model('Measurement', UserSchema);
