const
    Contact = require('../models/contact'),
    CustomField = require('../models/customField');
    Menu = require('../models/menu');

module.exports = {
	loadContact: loadContact,
	loadCustomField: loadCustomField,
    loadMenu: loadMenu,
};

function loadContact(req, res) {

    //seed values
    let seeds = [
        {
            name: 'telephone',
            desc: '',
            body: '',
            url: '380668659879',
            property: 1,
        },
        {
            name: 'linkedin',
            desc: '',
            body: '',
            url: 'https://www.linkedin.com/in/александр-проценко-889a3b145/',
            property: 0,
        },
        {
            name: 'facebook',
            desc: '',
            body: '',
            url: 'https://www.facebook.com/profile.php?id=100008422570612',
            property: 0,
        },
        {
            name: 'gitHub',
            desc: '',
            body: '',
            url: 'https://github.com/AlexProc13',
            property: 0,
        },
    ];
    //remove old contacts
    Contact.remove({}, function () {
        insertDate = Contact.insertMany(seeds);
        //view
        res.send('WELL. Add contacts');
    });
}

function loadCustomField(req, res) {

    //seed values
    let seeds = [
        {
            name:  'nameSite',
            desc: '',
            value: 'It Proc',
            property: 0,
        },
        {
            name: 'adress',
            desc: '',
            value: '/',
            property: 0,
        },
        {
            name: 'description',
            desc: '',
            value: 'Если вам нужна помощь в решении различных веб-задач. Обращайтесь',
            property: 0,
        },
    ];
    //remove old contacts
    CustomField.remove({}, function () {
        insertDate = CustomField.insertMany(seeds);
        //view
        res.send('WELL. Add seeds');
    });
}

function loadMenu(req, res) {

    //seed values
    let seeds = [
        {
            name:  'Главная',
            slug: 'home',
            url: '/',
            property: 1,
        },
        {
            name: 'O нас',
            slug: 'aboutUs',
            url: '/aboutUs',
            property: 2,
        },
        {
            name: 'Контакты',
            slug: 'contact',
            url: '/contact',
            property: 3,
        },
    ];
    //remove old contacts
    Menu.remove({}, function () {
        insertDate = Menu.insertMany(seeds);
        //view
        res.send('WELL. Add seeds');
    });
}
