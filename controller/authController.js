const signupPage = (req, res) => {
    res.render('sign-up');
}

const addUser = (req, res) => {
    const { username, password } = req.body;
    res.json({username, password, 'msg': 'To add user'});
}

const loginPage = (req, res) => {
    res.render('login');
}

const validateUser = (req, res) => {
    const { username, password } = req.body;
    res.json({username, password, 'msg': 'To validate User Login'})
}

module.exports = {
    signupPage,
    loginPage,
    addUser,
    validateUser
}