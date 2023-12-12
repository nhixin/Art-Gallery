// Require mongoose, express and gallery model
const express = require('express');
const mongoose = require("mongoose");
const ObjectId = require('mongoose').Types.ObjectId
const Gallery = require('../galleryModel');
const UsersModel = require("../usersModel.js");

//Create the router 
let router = express.Router();

// Parse incoming requests with JSON 
router.use(express.json());

// Different routes 
router.get("/", loginPage);    // User login
router.post("/", signUp);   // New user signup 
router.put("/", logIn);    // When the user wants to log in 
router.get("/account/:userName", switchWindow);   // Switch window to the user account 
router.get("/logout", logOutFunc);  // Allow user to log out of the account and change the CurrentUser status
router.get("/artists", getGivenArists);  // Get the list of given artists
router.get("/artists/:artistName", getEachArtist);      // Get individual artist 


//==================================================================================
// ALL FUNCTIONs FOR artwork-router.js

// Create a login page --> render login.pug
async function loginPage(req, res, next) { 
    try {
        res.status(200).render("login");
    } catch (err) {
        // Send an error
        res.status(500).send(err.message);  
    }
} 

// Get data when the new user sign up --> create new session ID
async function signUp(req, res, next) {
    try {
        // Create new user 
        let newUser = new UsersModel({
            UserName: req.body.uName, 
            Password: req.body.pass,
            CurrentUser: false
        });
        
        // Save the user into the "users" collection
        const saveUser = await newUser.save();

        // Create an req.session array if there is none 
        if (!req.session.users) {
            req.session.users = [];
        }

        // Check if the name of user exists 
        const namefound = req.session.users.some(user => user.UserName === req.body.uName);

        // Add the new user into the Users array (session management) if its ID is not in the object yet
        if (!namefound) {
            // Add the new user data to the req.session.users
            req.session.users.push(saveUser);

            // Send the user data to client side 
            res.status(200).send(saveUser);
        } else {
            // Send the message for identical username 
            res.status(200).json({message: "The username is already existed!"});
        }
    } catch (err) {
        // Send an error
        res.status(500).send(err.message); 
    }
}

// Function to let the user logging in  
async function logIn(req, res, next) {
    try {
        // Get the username and password from the client side 
        const UserName = req.body.uName;
        const Password = req.body.pass;

        // Check if the name of the user exists and if the passwords match 
        const userfound = req.session.users.some(user => user.UserName === UserName && user.Password === Password);

        // Send successful message to the client side if user is found 
        if (userfound) {
            // Send the user data to client side 
            res.status(200).send({UserName});
        } else { // Send the message for username that is not existed or password that does not match with existing data
            res.status(200).json({errMessage: "The username does not exist or the password is invalid!"});
        }
    } catch (err) {
        // Send an error
        res.status(500).send(err.message); 
    }
}

// When the registration is valid, or the authentication for login is correct => switch to the user account 
async function switchWindow(req, res, next) {
    try {
        // Get the username of the account
        const getUsername = req.params.userName;

        // Update the CurrentUser in the database to true to indicate that this specific account is in used
        await UsersModel.findOneAndUpdate({UserName: getUsername}, {$set: {CurrentUser: true}},
            {new: true} // Returns the updated document
        );

        // Also update the CurrentUser in req.session 
        const userToUpdate = req.session.users.find(user => user.UserName === getUsername);
        if (userToUpdate) {
            userToUpdate.CurrentUser = true;
        }

        // Render the user account page
        res.status(200).render("userAccount.pug", {pugData: getUsername});
    } catch (err) {
        // Send an error 
        res.status(500).send(err.message); 
    }
} 

// Function to let the user to log out of the account
async function logOutFunc(req, res, next) {
    // Find the user with the CurrentUser's status as true 
    const findUser = await UsersModel.findOne({CurrentUser: true});

    // If there is a user with CurrentUser's status as true
    if (findUser) {
        findUser.CurrentUser = false;
        alert(`Logging out of ${findUser.UserName} account...`);
        res.status(200).redirect("/users");
    } else { // If no user has current status as true 
        res.status(200).send("Cannot do this action because you are not logged in yet.");
    }
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