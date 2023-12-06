//==============================================================================
// Require express
const express = require('express');
const app = express();

// Require path
const path = require('path');     

// Parse incoming requests with JSON 
app.use(express.json());

// Set static folder 
app.use(express.static(path.join(__dirname, 'public')));

// Set static folder for image
app.use('/images', express.static('images'));

// Create template engine - pug
app.set('views', './public/views');
app.set('view engine', 'pug');


//==============================================================================
// Require mongoose and gallery model
const mongoose = require('mongoose');
const Gallery = require('./galleryModel');

// Require session and MongoDBStore 
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session); 

// Mongoose deployment's connection string
const connectionStr = "mongodb://127.0.0.1:27017/gallery";
// Connect to the database
mongoose.connect(connectionStr); 

// Add routers 
let artworkRouter = require("./routers/artwork-router");
app.use("/artworks", artworkRouter);
// let artistRouter = require("./routers/artist-router");
// app.use("/artists", artistRouter);
// let reviewRouter = require("./routers/review-router");
// app.use("/reviews", reviewRouter);

// Get homepage
app.get("/", async function(req, res) {
    try {
        res.status(200).render("index");
    } catch (err) {
        res.status(500).send(err.message);
        return;
    }
});

// Asynchronous function to run the server 
async function run() {
    try {

	} finally {
        console.log("Server listening at http://localhost:3000");		
        app.listen(3000); 
	} 
}

// call run() and catch error 
run().catch(console.dir);
