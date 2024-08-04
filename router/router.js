const { Router } = require('express');
const { signupPage, loginPage, addUser, validateUser, logoutUser } = require('../controller/authController');
const { validate, signupValidation, loginValidation } = require('../utils/validator');
const passport = require('passport');
const { indexPage } = require('../controller/fileController');

const router = Router();
router.get('/', indexPage);
router.get('/sign-up', signupPage);
router.post('/sign-up', signupValidation, validate, addUser);
router.get('/login', loginPage);
router.post('/login', loginValidation, validate, passport.authenticate('local', {successRedirect: '/', failureRedirect: '/'}));
router.get('/logout', logoutUser);

module.exports = router;