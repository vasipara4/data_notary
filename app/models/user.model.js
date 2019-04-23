const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    measurement: String,
    id: String,
    timestamp: Number,
    submitter: String,
    gasUsed: Number
});

module.exports = mongoose.model('Measurement', UserSchema);
