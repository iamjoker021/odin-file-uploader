const indexPage = (req, res) => {
    if (req.isAuthenticated()) {
        res.render('home');
    }
    else {
        res.redirect('/login');
    }
}

module.exports = {
    indexPage
}