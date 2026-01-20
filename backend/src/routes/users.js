const express = require('express');
const router = express.Router();
const { userController } = require('../controllers');
const { hashPassword, requireAdmin } = require('../middleware');

/**
 * PUBLIC ROUTES
 */

// POST /api/users/register  → Create new user (PUBLIC)
router.post('/register', hashPassword, userController.createUser);

// POST /api/users/login → Login user (PUBLIC)
router.post('/login', userController.loginUser);

// GET /api/users/:id → Get user by ID (PUBLIC or protected later)
router.get('/:id', userController.getUserById);

/**
 * ADMIN ROUTES
 */

// GET /api/users → Get all users (ADMIN only)
router.get('/', requireAdmin, userController.getAllUsers);

// PUT /api/users/:id → Update user (ADMIN)
router.put('/:id', requireAdmin, userController.updateUser);

// PUT /api/users/:id/request-seller → Request to become seller (USER)
router.put('/:id/request-seller', userController.requestSeller);

// PUT /api/users/:id/approve-seller → Approve seller request (ADMIN)
router.put('/:id/approve-seller', requireAdmin, userController.approveSeller);

// PUT /api/users/:id/reject-seller → Reject seller request (ADMIN)
router.put('/:id/reject-seller', requireAdmin, userController.rejectSeller);

// PUT /api/users/:id/cancel-seller-request → Cancel seller request (USER)
router.put('/:id/cancel-seller-request', userController.cancelSellerRequest);

// DELETE /api/users/:id → Delete user (ADMIN)
router.delete('/:id', requireAdmin, userController.deleteUser);

module.exports = router;
