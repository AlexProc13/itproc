const Contact = require('../models/contact');

module.exports = {
	showContacts: showContacts,
	getContact: getContact,
	seedContact: seedContact,
};


function showContacts(req, res) {
    console.log(Contact);
    //get data from db
    let contactInfos = [
        {name: 'facebook', url: 'hghf'},
        {name: 'facebook2', url: 'hghf'},
    ];
    //view
    res.render('pages/contact', {contacts: contactInfos});
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

function seedContact(req, res) {

    //seed values
    let seedContacts = [
        {
            name: 'facebook',
            desc: '',
            body: '',
            url: 'https://www.facebook.com/profile.php?id=100008422570612'
        },
        {
            name: 'gitHub',
            desc: '',
            body: '',
            url: 'https://github.com/AlexProc13'
        },

    ];
    //remove old contacts
    Contact.remove({}, function () {
        insertDate = Contact.insertMany(seedContacts);
        //view
        res.send('WELL. Add contacts');
    });
}
