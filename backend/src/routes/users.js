const express = require('express');
const router = express.Router();
const { userController } = require('../controllers');

// GET /api/users - Get all users
router.get('/', userController.getUsers);

// GET /api/users/:id - Get user by ID
router.get('/:id', userController.getUserById);

// POST /api/users - Create a new user
router.post('/', userController.createUser);

module.exports = router;