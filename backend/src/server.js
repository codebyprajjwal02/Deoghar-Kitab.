const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./routes');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001; // Changed from 3000 to 3001

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', routes);

// Simple route for testing
app.get('/', (req, res) => {
  res.json({ 
    message: 'Deoghar Kitab Backend Server', 
    status: 'Running',
    version: '1.0.0'
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Deoghar Kitab backend server running on port ${PORT}`);
});

module.exports = app;