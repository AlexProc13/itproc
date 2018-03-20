const express = require('express'),
	router = express.Router(),
	mainController = require('./controllers/main.controller'),
    contactController = require('./controllers/contact.controller'),
    viewContactController = require('./controllers/contact.controller');

//middlewareS
router.use(function timeLog(req, res, next) {
  //console.log('Time: ', Date.now());
  next();
});

//routers
router.get('/', mainController.showHome);
router.get('/contact', contactController.showContacts);
router.get('/contactView/seed', viewContactController.seedContact);
router.get('/contactView/:name', viewContactController.getContact);

module.exports = router;