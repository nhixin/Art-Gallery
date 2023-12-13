// Require mongoose
const mongoose = require('mongoose');

// Create schema for the database
const reviewsSchema = mongoose.Schema({
    WriterName: String,
    Review: String
});

// Create a model based on the reviewsSchema
const reviewsModel = mongoose.model("reviews", reviewsSchema);

// Export the model 
module.exports = reviewsModel;
