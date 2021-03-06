//pass env
require('dotenv').config();
//set dependences
const express = require('express'),
	app = express(),
	portServer = process.env.PORT || 3000,
	expressLayouts = require('express-ejs-layouts'),
    mongoose = require('mongoose');
    http = require('http').Server(app),
    io = require('socket.io')(http);
    Chat = require('./app/controllers/chat.controller');
//configurations
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
//conect to db
mongoose.connect(`mongodb://${process.env.DB_USER_NAME}:${process.env.DB_USER_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`);

//routes
app.use('/', require('./app/routes'));

//chat
chat = new Chat();
chat.init(io);

//starting applicationd
http.listen(portServer, function () {
  console.log(`App listening on port ${portServer}`);
});