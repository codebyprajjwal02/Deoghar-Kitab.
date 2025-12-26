const bcrypt = require('bcryptjs');

// Hash password before saving
const hashPassword = async (req, res, next) => {
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    next();
  } catch (error) {
    console.error('Error hashing password:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Compare password with hash
const comparePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

module.exports = {
  hashPassword,
  comparePassword
};