function sendReview() {
    // Get the values of input data 
    let inputName = document.getElementById("nameInput").value.trim();
    let userReview = document.getElementById("reviewInput").value.trim();
    let inputData = {inputName, userReview};  // Put all variables into a json object
    
    // If any data is blank --> ask the user to put in more information before proceeding any further
    if (inputName == "" || userReview == "") {
        alert("Please enter all fields (your name and your review of the artwork before proceeding!");
    } else {
        // XMLHttpRequest 
        let req = new XMLHttpRequest(); 
        req.onreadystatechange = function() {
            if (this.readyState==4 && this.status==200) {
                // Clear the fields of the review form  
                document.getElementById("inputName").value = "";
                document.getElementById("userReview").value = "";

                // Alert the user that the review is posted  
                alert("Your review is posted. Go to 'View all reviews' to see your post");
            }
        }

        // Send POST request to /users
        req.open("POST", "/users");
        req.setRequestHeader("Content-Type", "application/json");
        req.send(JSON.stringify(inputData));
    }
}