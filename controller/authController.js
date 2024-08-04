const signupPage = (req, res) => {
    res.render('sign-up');
}

const loginPage = (req, res) => {
    res.render('login');
}

module.exports = {
    signupPage,
    loginPage
}