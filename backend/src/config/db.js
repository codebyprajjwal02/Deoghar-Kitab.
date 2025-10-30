const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  try {
    // MongoDB connection string from environment variables
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    
    // If MongoDB Atlas connection fails, try local MongoDB
    if (process.env.NODE_ENV === 'development') {
      console.log('Trying to connect to local MongoDB...');
      try {
        const localConn = await mongoose.connect('mongodb://localhost:27017/deoghar_kitab');
        console.log(`Local MongoDB Connected: ${localConn.connection.host}`);
      } catch (localError) {
        console.error(`Local MongoDB connection error: ${localError.message}`);
        process.exit(1);
      }
    } else {
      process.exit(1);
    }
  }
};

module.exports = connectDB;