// Middleware index file
const errorHandler = require('./errorHandler');
const { hashPassword } = require('./auth');
const { adminAuth, requireAdmin } = require('./adminAuth');

module.exports = {
  errorHandler,
  hashPassword,
  adminAuth,
  requireAdmin
};