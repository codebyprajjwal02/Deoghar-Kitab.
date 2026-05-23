// Middleware index file
const errorHandler = require('./errorHandler');
const { protect } = require('./auth');
const { adminAuth, requireAdmin } = require('./adminAuth');

module.exports = {
  errorHandler,
  protect,
  adminAuth,
  requireAdmin
};