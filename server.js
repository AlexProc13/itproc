//pass env
require('dotenv').config();
//set dependences
const express = require('express'),
	app = express(),
	portServer = process.env.PORT || 3000,
	expressLayouts = require('express-ejs-layouts'),
    mongoose = require('mongoose');
    CustomFields = require('./app/models/customField'),
    Menu = require('./app/models/menu');

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

Menu.find().sort({property: 'asc'}).exec(function (err, menus) {
    app.locals.menus = menus;
});
//end get need variable

//routes
app.use('/', require('./app/routes'));

//starting applicationd
app.listen(portServer, function () {
  console.log(`App listening on port ${portServer}`);
});