//pass env
require('dotenv').config();
//set dependences
const express = require('express'),
	app = express(),
	portServer = process.env.PORT || 3000,
	expressLayouts = require('express-ejs-layouts'),
    mongoose = require('mongoose');
    CustomFields = require('./app/models/customField');

//configurations
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
//conect to db
mongoose.connect(`mongodb://${process.env.DB_USER_NAME}:${process.env.DB_USER_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`);
//get need variable
CustomFields.find().where({}).exec(function (err, customFields) {
    app.locals.customFields = customFields;
});
//get need variable


//routes
app.use('/', require('./app/routes'));
app.use(function(req,res){
    res.send('fsdfdsfsf');
});

//starting application
app.listen(portServer, function () {
  console.log(`App listening on port ${portServer}`);
});