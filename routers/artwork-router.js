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
router.get("/", auth, loadArtworks);          // Get the list of artworks
router.get("/:artworkID", auth, sendArtwork);  // Get the list of individual artwork


//==================================================================================
// ALL FUNCTIONs FOR artwork-router.js

// authorization function
function auth(req, res, next) {
    if (!req.session.idLoggedIn) {
        res.status(200).send("You are unauthorized!");
    }
    next();
}

// Load all of the artworks to the webpage 
async function loadArtworks(req, res, next) {
    try {
        // Get the collections of artwork 
        const allArtworks = await Gallery.find({});

        // Respond with html page (or json data) if user request text/html (or application/json)
        res.format({
            "text/html": function() {
                res.status(200).render("artworks", {pugData: allArtworks});
            },
            "application/json": function() {
                res.status(200).json({"All Artworks": allArtworks});
            }
        }); 
    } catch (err) {
        res.status(500).send(err.message);  // Send an error 
    }
}

// Get all of the individual artworks 
async function sendArtwork(req, res, next) {
    try {
        // Get the id of each artwork
        const queryID = new ObjectId(req.params.artworkID);

        // Find the artwork based on the id found
        const foundArtwork = await Gallery.findOne(queryID);

        // Respond with html page (or json data) if user request text/html (or application/json)
        res.format({
            "text/html": function() {
                res.status(200).render("artwork", {pugData: foundArtwork});
            },
            "application/json": function() {
                res.status(200).json({"Individual Artwork": foundArtwork});
            }
        }); 
    } catch (err) {
        res.status(500).send(err.message);  // Send an error
    }
}

//Export the router object, so it can be accessed in the server.js file
module.exports = router;