const { registerSchema } = require('../validators/register');
const { validateRequest, requireLocalAuth, requireJwtAuth } = require('../middlewares');
const { loginSchema } = require('../validators/login');
const { register, login, logout } = require('../controllers/authController');

const router = require('express').Router();

router.post('/register', validateRequest(registerSchema), register);

router.post('/login', [validateRequest(loginSchema), requireLocalAuth], login);

router.get('/logout', requireJwtAuth, logout);

module.exports = router;
