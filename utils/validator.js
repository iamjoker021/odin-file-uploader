const { body, validationResult } = require('express-validator');

const signupValidation = [
    body('username')
    .trim()
    .notEmpty()
    .withMessage('Username should not be empty')
    .escape(),
    body('password')
    .notEmpty()
    .withMessage('Password should not be empty')
    .isLength({ min: 5 })
    .withMessage('Password length should be more than 5 characters'),
    body('confirm-password')
    .custom((confirmPassword, { req }) => {
        if (confirmPassword !== req.body.password) {
            throw Error('Passowrd and Confirm Password should match');
        }
        else {
            return true;
        }
    }),
]

const loginValidation = [
    body('username')
    .trim()
    .notEmpty()
    .withMessage('Username should not be empty')
    .escape(),
    body('password')
    .trim()
    .notEmpty()
    .withMessage('Password should not be empty')
    .escape(),
]

const createFolderValidation = [
    body('folder_name')
    .trim()
    .notEmpty()
    .withMessage('Folder Name should not be empty')
    .escape()
]

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }
  
    return res.status(422)
            .json(errors['errors'].map(err => {
                obj = {};
                obj[err.path] = err.msg;
                return obj;
            }))
}

module.exports = {
    signupValidation,
    loginValidation,
    createFolderValidation,
    validate
}