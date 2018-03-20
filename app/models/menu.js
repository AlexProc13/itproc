const mongoose = require('mongoose'),
 Schema = mongoose.Schema;

//create schema
const menuSchema = new Schema({
    name:  String,
    slug: String,
    url: String,
    property: Number,
});

//create model
const menutModel = mongoose.model('Menu', menuSchema);

//export model
module.exports = menutModel;