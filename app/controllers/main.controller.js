module.exports = {
    showHome: showHome,
};

function showHome(req, res) {
    res.render('pages/home');
}