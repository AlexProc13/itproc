

//set dependences
const express = require('express'),
	app = express(),
	portServer = process.env.PORT || 3000;


//actions

//route
app.get('/', function (req, res) {
  res.send('Hello World!');
});

//starting application
app.listen(portServer, function () {
  console.log(`Example app listening on port ${portServer}`);
});