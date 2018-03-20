const mongoose = require('mongoose'),
 Schema = mongoose.Schema;

//create schema
const customFieldSchema = new Schema({
    name:  String,
    desc: String,
    value: String,
    property: Number,
});

//create model
const customFieldModel = mongoose.model('CustomField', customFieldSchema);

//export model
module.exports = customFieldModel;