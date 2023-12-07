// Require mongoose, express and gallery model
const express = require('express');
const mongoose = require("mongoose");
const ObjectId = require('mongoose').Types.ObjectId
const Gallery = require('../galleryModel');

//Create the router 
let router = express.Router();

// Parse incoming requests with JSON 
router.use(express.json());

// Different routes 
router.get("/", loginPage)   // User login 
router.get("/artists", getGivenArists);  // Get the list of given artists
router.get("/artists/:artistName", getEachArtist);      // Get individual artist 


//==================================================================================
// ALL FUNCTIONs FOR artwork-router.js

async function loginPage(req, res, next) {

}

// Function to get all artist
async function getGivenArists(req, res, next) {
    try {
        // Find all of the artists 
        const allArtists = await Gallery.distinct("Artist");

        // Send the data to pug
        res.status(200).render("artists", {pugData: allArtists});
    } catch (err) {
        // Send an error
        res.status(500).send(err.message);  
    }
}

// Function to get each artist 
async function getEachArtist(req, res, next) {
    try {
        // Find artist name with space
        let aName = decodeURIComponent(req.params.artistName);

        // Find all of the artworks with the same artist  
        const artWorks = await Gallery.find({Artist: aName});

        // Send the data to pug
        res.status(200).render("artist.pug", {pugData: artWorks, name: aName});
    } catch (err) {
        // Send an error
        res.status(500).send(err.message);  
    }
}

//Export the router object, so it can be accessed in the server.js file
module.exports = router;