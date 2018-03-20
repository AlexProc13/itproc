const Contact = require('../models/contact');

module.exports = {
	showContacts: showContacts,
};


function showContacts(req, res) {
    //get data from db
    let a = Contact.find().where({}).exec(function (err, contacts) {
        //view
        console.log(contacts);
        res.render('pages/contact', {contacts: contacts});
    });
}
