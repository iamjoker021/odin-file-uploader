const { Router } = require('express');
const { signupPage, loginPage } = require('../controller/authController');

const authRouter = Router();

authRouter.get('/', (req, res) => res.json({'msg': 'working'}));
authRouter.get('/sign-up', signupPage);
authRouter.get('/login', loginPage);

module.exports = authRouter;