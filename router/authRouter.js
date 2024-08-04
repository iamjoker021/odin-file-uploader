const { Router } = require('express');
const { signupPage, loginPage, addUser, validateUser } = require('../controller/authController');

const authRouter = Router();

authRouter.get('/', (req, res) => res.json({'msg': 'working'}));
authRouter.get('/sign-up', signupPage);
authRouter.post('/sign-up', addUser);
authRouter.get('/login', loginPage);
authRouter.post('/login', validateUser);

module.exports = authRouter;