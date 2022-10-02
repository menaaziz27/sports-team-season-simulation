const { errorHandler, notFound } = require('./errorHandler');
const { requireJwtAuth } = require('./requireJwtAuth');
const { requireLocalAuth } = require('./requireLocalAuth');
const { validateRequest } = require('./validateRequest');

module.exports = { errorHandler, notFound, requireJwtAuth, requireLocalAuth, validateRequest };
