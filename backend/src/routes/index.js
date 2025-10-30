// Routes index file
const express = require('express');
const router = express.Router();
const usersRouter = require('./users');

// Route imports will be added here
router.use('/users', usersRouter);

module.exports = router;