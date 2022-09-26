const router = require('express').Router();
const { requireJwtAuth } = require('../middlewares');

router.get('/authenticated', requireJwtAuth, (req, res) => {
	console.log(req.user);
	const { email, name } = req.user;
	res.status(200).json({ isAuthenticated: true, user: { email, name } });
});

module.exports = router;