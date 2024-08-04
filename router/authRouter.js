const { Router } = require('express');
const { signupPage, loginPage, addUser, validateUser } = require('../controller/authController');
const { validate, signupValidation, loginValidation } = require('../utils/validator');

const authRouter = Router();

authRouter.get('/', (req, res) => res.json({'msg': 'working'}));
authRouter.get('/sign-up', signupPage);
authRouter.post('/sign-up', signupValidation, validate, addUser);
authRouter.get('/login', loginPage);
authRouter.post('/login', loginValidation, validate, validateUser);

module.exports = authRouter;