const mongoose = require('mongoose');
 
const UserSchema = mongoose.Schema({
    measurement: String,
    id: String
});
 
module.exports = mongoose.model('Measurement', UserSchema);
