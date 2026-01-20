const { User } = require('../models');

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create a new user
const createUser = async (req, res) => {
  try {
    const { name, email, password, userType } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Create new user (password is already hashed by middleware)
    const user = new User({
      name,
      email,
      password, // Already hashed
      userType
    });
    
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update user by ID (for admin use)
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete user by ID (for admin use)
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    
    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    
    // Return user data (without password)
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      userType: user.userType,
      sellerRequest: user.sellerRequest,
      createdAt: user.createdAt
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Request to become a seller
const requestSeller = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, phone, location, bio } = req.body;
    
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if user already has a pending request or is already a seller
    if (user.userType === 'seller') {
      return res.status(400).json({ message: 'You are already a seller' });
    }
    
    if (user.sellerRequest && user.sellerRequest.requested && !user.sellerRequest.approved) {
      return res.status(400).json({ message: 'You already have a pending seller request' });
    }
    
    // Update the user with seller request information
    user.sellerRequest = {
      requested: true,
      requestedAt: new Date(),
      approved: false,
      approvedAt: null
    };
    
    // Update seller info
    user.sellerInfo = {
      name: name,
      phone: phone,
      location: location,
      bio: bio
    };
    
    const updatedUser = await user.save();
    
    res.json({
      message: 'Seller request submitted successfully',
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        userType: updatedUser.userType,
        sellerRequest: updatedUser.sellerRequest
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Approve a seller request
const approveSeller = async (req, res) => {
  try {
    const userId = req.params.id;
    
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if user has a pending request
    if (!user.sellerRequest || !user.sellerRequest.requested || user.sellerRequest.approved) {
      return res.status(400).json({ message: 'No pending seller request found or already approved' });
    }
    
    // Update the user to approve the seller request
    user.userType = 'seller';
    user.sellerRequest.approved = true;
    user.sellerRequest.approvedAt = new Date();
    
    const updatedUser = await user.save();
    
    res.json({
      message: 'Seller request approved successfully',
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        userType: updatedUser.userType,
        sellerRequest: updatedUser.sellerRequest
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Reject a seller request
const rejectSeller = async (req, res) => {
  try {
    const userId = req.params.id;
    
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if user has a pending request
    if (!user.sellerRequest || !user.sellerRequest.requested || user.sellerRequest.approved) {
      return res.status(400).json({ message: 'No pending seller request found or already approved' });
    }
    
    // Update the user to reject the seller request
    user.sellerRequest.requested = false;
    user.sellerRequest.requestedAt = null;
    
    const updatedUser = await user.save();
    
    res.json({
      message: 'Seller request rejected',
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        userType: updatedUser.userType,
        sellerRequest: updatedUser.sellerRequest
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Cancel a seller request
const cancelSellerRequest = async (req, res) => {
  try {
    const userId = req.params.id;
    
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if user has a pending request
    if (!user.sellerRequest || !user.sellerRequest.requested || user.sellerRequest.approved) {
      return res.status(400).json({ message: 'No pending seller request to cancel or already approved' });
    }
    
    // Update the user to cancel the seller request
    user.sellerRequest.requested = false;
    user.sellerRequest.requestedAt = null;
    
    const updatedUser = await user.save();
    
    res.json({
      message: 'Seller request cancelled successfully',
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        userType: updatedUser.userType,
        sellerRequest: updatedUser.sellerRequest
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get all users (for admin use)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password'); // Don't return passwords
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
  loginUser,
  requestSeller,
  approveSeller,
  rejectSeller,
  cancelSellerRequest
};