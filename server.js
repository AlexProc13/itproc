//pass env
require('dotenv').config();
//set dependences
const express = require('express'),
	app = express(),
	portServer = process.env.PORT || 3000,
	expressLayouts = require('express-ejs-layouts'),
    mongoose = require('mongoose');
    middleware = require('./app/middleware/middleware'),
    // CustomFields = require('./app/models/customField'),
    // Menu = require('./app/models/menu'),
    http = require('http').Server(app),
    io = require('socket.io')(http);

//configurations
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
//conect to db
mongoose.connect(`mongodb://${process.env.DB_USER_NAME}:${process.env.DB_USER_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`);

//get need variable
// app.use(function (req, res, next) {
//     (async function () {
//         customFields = await CustomFields.find().where({}).exec();
//         app.locals.customFields = customFields;
//         menus = await Menu.find().sort({property: 'asc'}).exec();
//         app.locals.menus = menus;
//         next();
//     })();
// });

//routes
app.use('/', require('./app/routes'));
//for chat
// io.on('connection', function(socket){
//     console.log('a user connected');
// });

//starting applicationd
app.listen(portServer, function () {
  console.log(`App listening on port ${portServer}`);
});