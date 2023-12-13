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



//==================================================================================
// ALL FUNCTIONs FOR review-router.js

// authorization function
function auth(req, res, next) {
    if (!req.session.idLoggedIn) {
        res.status(200).send("You are unauthorized!");
    }
    next();
}