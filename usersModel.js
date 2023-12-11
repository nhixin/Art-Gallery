// Require mongoose
const mongoose = require('mongoose');

// Create schema for the database
const userSchema = mongoose.Schema({
    UserName: String,   // Name of user 
    Password: String    // Hold the password for the user 
});

// Create a model based on the gallerySchema
const userModel = mongoose.model("users", userSchema);

// Export the model 
module.exports = userModel;
