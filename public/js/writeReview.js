// Function to send reviews 
function sendReview(artID) {
    // Get the values of input data 
    let inputName = document.getElementById("nameInput").value.trim();
    let userReview = document.getElementById("reviewInput").value.trim();
    let inputData = {inputName, userReview};  // Put all variables into a json object

    // Get the reviews div 
    var reviewDiv = document.getElementById("reviews");
    
    // If any data is blank --> ask the user to put in more information before proceeding any further
    if (inputName == "" || userReview == "") {
        alert("Please enter all fields (your name and your review of the artwork before proceeding!");
    } else {
        // XMLHttpRequest 
        let req = new XMLHttpRequest();  
        req.onreadystatechange = function() {
            if (this.readyState==4 && this.status==200) {
                // Clear the fields of the review form  
                document.getElementById("nameInput").value = "";
                document.getElementById("reviewInput").value = "";

                // Get data from the server
                const data = JSON.parse(this.responseText);

                // Create a new paragraph
                const newParagraph = document.createElement("p");
                const textNode = document.createTextNode(`Review of ${data.currArt.WriterName}: ${data.newReview}`);

                // Append the text node to the paragraph
                newParagraph.appendChild(textNode);

                // Append the new element to the div
                reviewDiv.appendChild(newParagraph);
            }
        }

        // Send POST request to /:artworkID/reviews
        req.open("PUT", `/artworks/${artID}`);
        req.setRequestHeader("Content-Type", "application/json");
        req.send(JSON.stringify(inputData));
    }
}

// Toggle between like and unlike button 
function toggleLikeUnlike() {
    // Get the like and unlike buttons 
    let likeButton = document.getElementById("likeButton");
    let unlikeButton = document.getElementById("unlikeButton");

    // Check the visibility of the like button to determine the current state
    let clickLiked = likeButton.style.display === "none";

    // Toggle button visibility
    if (clickLiked) {
        likeButton.style.display = "inline-block";
        unlikeButton.style.display = "none";
    } else {
        likeButton.style.display = "none";
        unlikeButton.style.display = "inline-block";
    }
}

