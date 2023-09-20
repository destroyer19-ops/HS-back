const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  facebookId: String, // Store Facebook ID
  // Other user fields like name, email, etc.
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
