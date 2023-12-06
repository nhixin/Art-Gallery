// Require mongoose and express 
const express = require('express');
const mongoose = require("mongoose");
const ObjectId = require('mongoose').Types.ObjectId

//Create the router
let router = express.Router();

// Get the list of patrons
router.get("/", loadPatrons);

//==================================================================================
// ALL FUNCTIONs FOR patron-router.js

function loadPatrons(req, res, next) {
    try {
        res.status(200).render("artworks");
    } catch (err) {
        res.status(500).send(err.message);
    }
}

//Export the router object, so it can be accessed in the server.js file
module.exports = router;