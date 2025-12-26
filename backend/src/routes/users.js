const express = require('express');
const router = express.Router();
const { userController } = require('../controllers');
const { hashPassword, requireAdmin } = require('../middleware');

// GET /api/users - Get all users (for admin)
router.get('/', requireAdmin, userController.getAllUsers);

// GET /api/users/:id - Get user by ID
router.get('/:id', userController.getUserById);

// POST /api/users - Create a new user
router.post('/', hashPassword, userController.createUser);

// PUT /api/users/:id - Update user by ID (admin)
router.put('/:id', requireAdmin, userController.updateUser);

// DELETE /api/users/:id - Delete user by ID (admin)
router.delete('/:id', requireAdmin, userController.deleteUser);

module.exports = router;