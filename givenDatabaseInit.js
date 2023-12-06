//-------------------------------------------------------------------------------------------------------
// GET THE DATA FROM GALLERY.JSON

// Require "fs"
const fs = require('fs'); 

// Create a list to hold artworks 
let galleryArtworks = [];

// Read JSON file and parse into JSON, then turn it into an array
galleryArtworks = JSON.parse(fs.readFileSync("database/gallery.json"));

//-------------------------------------------------------------------------------------------------------

