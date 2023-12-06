// Require mongoose
const mongoose = require('mongoose');

// Create schema for the database
const gallerySchema = mongoose.Schema({
    Title: String,          // Title of the artwork
    Artist: String,         // Artist's name
    Year: String,           // Published year of the artwork
    Category: String,       // Category it's in
    Medium: String,         // Artwork's medium
    Description: String,    // Decription of the artwork
    Poster: String          // Save artwork in binary form
});

// Create a model based on the gallerySchema
const galleryModel = mongoose.model("artworks", gallerySchema);

// Export the model 
module.exports = galleryModel;
