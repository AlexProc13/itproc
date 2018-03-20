const Contact = require('../models/contact');

module.exports = {
	showContacts: showContacts,
	getContact: getContact,
};


function showContacts(req, res) {
    //get data from db
    let a = Contact.find().where({}).exec(function (err, contacts) {
        //view
        console.log(contacts);
        res.render('pages/contact', {contacts: contacts});
    });
}

function getContact(req, res) {
    //get data from db
    let contactInfos = [
        {name: 'facebook', url: 'hghf'},
        {name: 'facebook2', url: 'hghf'},
    ];
    //view
    res.render('pages/viewContact', {contacts: contactInfos});
}