const dotenv = require('dotenv').config();
const bycrypt = require('bcryptjs');
const { addUserDB } = require("../model/user");

const signupPage = (req, res) => {
    res.render('sign-up');
}

const addUser = (req, res) => {
    const { username, password } = req.body;
    const PASS_SALT = parseInt(process.env.PASS_SALT);
    bycrypt.hash(password, PASS_SALT, async (err, hashedPassword) => {
        if (err) {
            res.status(404).json({'error': 'Unable to add User', 'msg': err});
        }
        else {
            await addUserDB(username, hashedPassword);
            res.redirect('/');
        }
    })
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