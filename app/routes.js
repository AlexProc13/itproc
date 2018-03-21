const express = require('express'),
    app = express(),
	router = express.Router(),
	mainController = require('./controllers/main.controller'),
    contactController = require('./controllers/contact.controller'),
    viewContactController = require('./controllers/contact.controller'),
    Menu = require('./models/menu'),
    CustomFields = require('./models/customField'),
    staticDateController = require('./controllers/staticDate.controller');

//middlewareS
router.use(function loadGlobalVariable(req, res, next) {
    (async function () {
        customFields = await CustomFields.find().where({}).exec();
        app.locals.customFields = customFields;
        menus = await Menu.find().sort({property: 'asc'}).exec();
        app.locals.menus = menus;
        next();
    })();
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