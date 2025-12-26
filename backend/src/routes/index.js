// Routes index file
const express = require('express');
const router = express.Router();
const usersRouter = require('./users');
const booksRouter = require('./books');

// Route imports will be added here
router.use('/users', usersRouter);
router.use('/books', booksRouter);

module.exports = router;