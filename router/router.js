const { Router } = require('express');
const { signupPage, loginPage, addUser, logoutUser } = require('../controller/authController');
const { validate, signupValidation, loginValidation, createFolderValidation } = require('../utils/validator');
const passport = require('passport');
const { indexPage, createFolder, deleteFolder, editFolderPage, editFolder } = require('../controller/fileController');

const router = Router();
router.get('/sign-up', signupPage);
router.post('/sign-up', signupValidation, validate, addUser);
router.get('/login', loginPage);
router.post('/login', loginValidation, validate, passport.authenticate('local', {successRedirect: '/', failureRedirect: '/'}));
router.get('/logout', logoutUser);

router.get('/', indexPage);
router.post('/create-folder', createFolderValidation, validate, createFolder)
router.get('/:id', indexPage);
router.get('/:id/delete', deleteFolder);
router.get('/:id/edit-folder', editFolderPage);
router.post('/:id/edit-folder', editFolder);

module.exports = router;