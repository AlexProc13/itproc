const express = require('express'),
	router = express.Router(),
	mainController = require('./controllers/main.controller'),
    contactController = require('./controllers/contact.controller'),
    viewContactController = require('./controllers/contact.controller'),
    staticDateController = require('./controllers/staticDate.controller');

//middlewareS
router.use(function timeLog(req, res, next) {
  //console.log('Time: ', Date.now());
  next();
});

//routers
router.get('/', mainController.showHome);
router.get('/contact', contactController.showContacts);
//load seeds
router.get('/loadStatic/contact', staticDateController.loadContact);
router.get('/loadStatic/customFields', staticDateController.loadCustomField);
router.get('/loadStatic/menu', staticDateController.loadMenu);
//404 page
router.get('*', function(req, res){
    res.render('pages/404.ejs');
});
module.exports = router;