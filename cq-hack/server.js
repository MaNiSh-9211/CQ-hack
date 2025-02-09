const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import CORS middleware
const questionRoutes = require('./routes/questionRoutes'); // Import routes

const app = express();
app.use(express.json()); // Parse incoming JSON requests

// Enable CORS
app.use(cors()); // Apply CORS middleware

// Connect to MongoDB
mongoose.connect('mongodb+srv://manish9211:MaNiSh9211@cluster9211.be3bfds.mongodb.net/registration').then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Use routes
app.use('/', questionRoutes);

// Start the server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
