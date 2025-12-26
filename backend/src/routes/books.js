const express = require('express');
const router = express.Router();
const { bookController } = require('../controllers');
const { requireAdmin } = require('../middleware');

// GET /api/books - Get all available books
router.get('/', bookController.getAllBooks);

// GET /api/books/seller/:sellerId - Get books by seller
router.get('/seller/:sellerId', bookController.getBooksBySeller);

// GET /api/books/:id - Get book by ID
router.get('/:id', bookController.getBookById);

// POST /api/books - Create a new book
router.post('/', bookController.createBook);

// PUT /api/books/:id - Update a book
router.put('/:id', bookController.updateBook);

// PUT /api/books/:id/status - Update book status (admin only)
router.put('/:id/status', requireAdmin, bookController.updateBookStatus);

// DELETE /api/books/:id - Delete a book (admin only)
router.delete('/:id', requireAdmin, bookController.deleteBook);

module.exports = router;