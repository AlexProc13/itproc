module.exports = {
	showContacts: (req, res) =>
	{
		//get data from db
		let contactInfos = [
			{name: 'facebook', url: 'hghf'},
			{name: 'facebook2', url: 'hghf'},
			];
		//view
		res.render('pages/contact', {contacts: contactInfos});
	},
	getContact: (req, res) =>
    {
        //get data from db
        let contactInfos = [
            {name: 'facebook', url: 'hghf'},
            {name: 'facebook2', url: 'hghf'},
        ];
        //view
        res.render('pages/viewContact', {contacts: contactInfos});
    },
}