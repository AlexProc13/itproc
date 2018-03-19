
//set dependences
const express = require('express'),
	app = express(),
	portServer = process.env.PORT || 3000,
	expressLayouts = require('express-ejs-layouts');

//configurations
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

//routes
app.use('/', require('./app/routes'));

//starting application
app.listen(portServer, function () {
  console.log(`App listening on port ${portServer}`);
});