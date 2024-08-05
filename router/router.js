const { validate, signupValidation, loginValidation, createFolderValidation } = require('../utils/validator');
const passport = require('passport');

const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

const { Router } = require('express');
const { signupPage, loginPage, addUser, logoutUser } = require('../controller/authController');
const { indexPage, createFolder, deleteFolder, editFolderPage, editFolder, uploadFile, downloadFile } = require('../controller/fileController');

const router = Router();
router.get('/sign-up', signupPage);
router.post('/sign-up', signupValidation, validate, addUser);
router.get('/login', loginPage);
router.post('/login', loginValidation, validate, passport.authenticate('local', {successRedirect: '/', failureRedirect: '/'}));
router.get('/logout', logoutUser);

router.post('/upload-file', upload.single('uploaded_file'), uploadFile);
router.get('/download-file', downloadFile);

router.post('/create-folder', createFolderValidation, validate, createFolder)
router.get('/:id', indexPage);
router.get('/:id/delete', deleteFolder);
router.get('/:id/edit-folder', editFolderPage);
router.post('/:id/edit-folder', editFolder);

router.get('/', indexPage);

module.exports = router;