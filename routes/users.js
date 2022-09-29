const router = require('express').Router();
const { requireJwtAuth } = require('../middlewares');

router.get('/authenticated', requireJwtAuth, (req, res) => {
	const { _id, email, name } = req.user;
	res.status(200).json({ user: { _id, email, name } });
});

module.exports = router;
