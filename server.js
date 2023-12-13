//==============================================================================
// Require express
const express = require('express');
const app = express();

// Require path
const path = require('path');     

// Parse incoming requests with JSON 
app.use(express.json());

// Set static folder for image
app.use('/images', express.static('images'));

// Create template engine - pug
app.set('views', './public/views');
app.set('view engine', 'pug');


//==============================================================================
// Require mongoose
const mongoose = require('mongoose');

// Require session and MongoDBStore 
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session); 

// Mongoose deployment's connection string
const connectionStr = "mongodb://134.117.128.120/gallery";
// Connect to the database
mongoose.connect(connectionStr); 

// Create new MongoDBStore
const store = new MongoDBStore({
	uri: 'mongodb://127.0.0.1:27017/store',
	collection: 'sessiondata' 
});

// Use express-session
app.use(session({
	secret: 'thisismyartGalleryProj', resave: true, saveUninitialized: true,
	store: store
}));

// Log the express-session into the console 
app.use(function (req, res, next) { 
	console.log(req.session); next();
});

// Require users module
const UsersModel = require("./usersModel.js");

// Add routers 
let artworkRouter = require("./routers/artwork-router");
app.use("/artworks", artworkRouter);
let userRouter = require("./routers/user-router");
app.use("/users", userRouter);
let searchRouter = require("./routers/search-router");
app.use("/search", searchRouter);

// Set static folder 
app.use(express.static(path.join(__dirname, 'public')));

// authorization function
function auth(req, res, next) {
    if (!req.session.idLoggedIn) {
        res.status(200).send("You are unauthorized!");
    }
    next();
}

// Get homepage
app.get("/", auth, async function(req, res) {
    try {
        const currentUser = await UsersModel.findById(req.session.idLoggedIn);
        res.status(200).render("index", {currentUser});
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
