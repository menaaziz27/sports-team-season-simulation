const router = require('express').Router();
const { getChampionsResult } = require('../controllers/championsController');
const { requireJwtAuth } = require('../middlewares');

router.get('/final', requireJwtAuth, getChampionsResult);

module.exports = router;
