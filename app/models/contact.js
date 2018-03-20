const mongoose = require('mongoose'),
 Schema = mongoose.Schema;

//create schema
const contactSchema = new Schema({
    name:  String,
    desc: String,
    body:   String,
    url: String
});

//create model
const contactModel = mongoose.model('Contact', contactSchema);

//export model
module.exports = contactModel;