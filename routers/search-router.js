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
router.get("/", auth, getSearchPage); // Create a page with search layout 
router.put("/ ", auth, checkForm); // UPdate with data of the user 



//==================================================================================
// ALL FUNCTIONs FOR review-router.js

// authorization function
function auth(req, res, next) {
    if (!req.session.idLoggedIn) {
        res.status(200).send("You are unauthorized!");
    } 
    next();
}

// Create a search page 
async function getSearchPage(req, res, next) {
    try {
        res.status(200).render("search");
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");  // Send an error
    }
}

async function checkForm(req, res, next) {
    try {
        
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");  // Send an error
    }
}

//Export the router object, so it can be accessed in the server.js file
module.exports = router;