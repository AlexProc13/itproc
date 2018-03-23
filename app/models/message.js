const mongoose = require('mongoose'),
 Schema = mongoose.Schema;

//create schema
const messageSchema = new Schema({
    message:  String,
    user: String,
    direction: String,
    date: Date,
    id: String
});

//create model
const messModel = mongoose.model('Message', messageSchema);

//export model
module.exports = messModel;