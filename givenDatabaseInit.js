//-------------------------------------------------------------------------------------------------------
// GET THE DATA FROM GALLERY.JSON

// Require "fs"
const fs = require('fs'); 

// Create a list to hold artworks 
let galleryArtworks = [];

// Read JSON file and parse into JSON, then turn it into an array
galleryArtworks = JSON.parse(fs.readFileSync("database/gallery.json"));

//-------------------------------------------------------------------------------------------------------
// Require monggoose in the program
const mongoose = require('mongoose');
const Gallery = require('./galleryModel');

// Mongoose deployment's connection string
const connectionStr = "mongodb://127.0.0.1:27017/gallery";

// Create an array of data to insert the database
let dataToInsert = [];

// Connect to the database
mongoose.connect(connectionStr);
console.log("Connect to the database...");

// Create an asynchronous function when the program run
async function run() {
    try {
        // Drop the database
        await mongoose.connection.dropDatabase()
        console.log("Dropped the database. Starting to re-create.");

        // Add artworks to dataToInsert array
        galleryArtworks.forEach(artwork => {
            // Create new data based on Gallery model
            let newData = {
                Title: artwork["Title"],                // Title of the artwork
                Artist: artwork["Artist"],              // Artist's name
                Year: artwork["Year"],                  // Published year of the artwork
                Category: artwork["Category"],          // Category it's in
                Medium: artwork["Medium"],              // Artwork's medium
                Description: artwork["Description"],    // Decription of the artwork
                Poster: artwork["Poster"]               // Save image in binary form
            }

            // Add the new data to the dataToInsert array for many insertions
            dataToInsert.push(newData);
        });

        // Insert the supplies into the "supplies" collection
        const result = await Gallery.insertMany(dataToInsert);
        console.log("Successfully inserted artworks into the gallery collection!");

    } finally {
        // Close the Mongoose connection
        await mongoose.connection.close();
        console.log("Closed the database connection.");
    }
}

// Run the function and handle any errors
run().catch(console.dir);