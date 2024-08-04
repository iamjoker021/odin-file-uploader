const dotenv = require('dotenv').config();
const bycrypt = require('bcryptjs');
const { addUserDB } = require("../model/user");

const signupPage = (req, res) => {
    if(!req.isAuthenticated()) {
        res.render('sign-up');
    }
    else {
        res.redirect('/');
    }
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
    if(!req.isAuthenticated()) {
        res.render('login');
    }
    else {
        res.redirect('/');
    }
}

const logoutUser = (req, res) => {
    res.locals.currentUser = null;
    req.logout((err) => {
        if (err) {
          return next(err);
        }
        res.redirect('/login');
    });
}

module.exports = {
    signupPage,
    loginPage,
    addUser,
    logoutUser
}