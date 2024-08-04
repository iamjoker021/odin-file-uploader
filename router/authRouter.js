const { Router } = require('express');
const { signupPage, loginPage, addUser, validateUser } = require('../controller/authController');
const { validate, signupValidation, loginValidation } = require('../utils/validator');
const passport = require('passport');

const authRouter = Router();

authRouter.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({'msg': 'User is Authenticated'});
    }
    else {
        res.json({'msg': 'User is Not Authenticated'});
    }
});
authRouter.get('/sign-up', signupPage);
authRouter.post('/sign-up', signupValidation, validate, addUser);
authRouter.get('/login', loginPage);
authRouter.post('/login', loginValidation, validate, passport.authenticate('local', {successRedirect: '/', failureRedirect: '/'}));

module.exports = authRouter;