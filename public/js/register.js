// Submit the registration for new user 
function register() {
   // Get the values of input data 
   let uName = document.getElementById("fullName").value.trim();
   let pass = document.getElementById("password").value.trim();
   let inputData = {uName, pass};  // Put all variables into a json object

   // If any data is blank --> ask the user to put in more information before proceeding any further
   if (uName == "" || pass == "") {
      alert("Please enter all fields (username and password) before proceeding!");
   } else {
      // XMLHttpRequest 
      let req = new XMLHttpRequest(); 
      req.onreadystatechange = function() {
         if (this.readyState==4 && this.status==200) {
            // Clear the register field 
            document.getElementById("fullName").value = "";
            document.getElementById("password").value = "";

            // Get response data from the server 
            const data = JSON.parse(this.responseText); 

            // Alert the user that there is an identical username from the server
            if (data.message) {
               alert(data.message);
            } // Alert the user when the account is created successully when the username is unique.
            else {
               alert(data.UserName + " is a unique username. A new account is created successfully!"); 

               // Redirect to the user account
               window.location.href = `/users/account/${data.UserName}`;
            }         
         }
      }

      // Send POST request to /users
      req.open("POST", "/users");
      req.setRequestHeader("Content-Type", "application/json");
      req.send(JSON.stringify(inputData));
   }
}


// Let existing user log in 
function login() {
   // Get the values of input data 
   let uName = document.getElementById("fullName").value.trim();
   let pass = document.getElementById("password").value.trim();
   let inputData = {uName, pass};  // Put all variables into a json object

   // If any data is blank --> ask the user to put in more information before proceeding any further
   if (uName == "" || pass == "") {
      alert("Please enter all fields (username and password) before proceeding!");
   } else {
      // XMLHttpRequest 
      let req = new XMLHttpRequest();
      req.onreadystatechange = function() {
         if (this.readyState==4 && this.status==200) {
            // Clear the register field 
            document.getElementById("fullName").value = "";
            document.getElementById("password").value = "";
            
            // Check response data from the server 
            const data = JSON.parse(this.responseText); 

            // Alert the user the error message from the server if there is any 
            if (data.errMessage) {
               alert(data.errMessage);
            }

            // Alert the user if there is an account with correct username and password --> move to the user account
            if (data.UserName) {
               alert(`The account ${data.UserName} exists. Proceed to the user account...`);

               // Redirect to the user account
               window.location.href = `/users/account/${data.UserName}`;
            }
         }
      }

      // Send PUT request to /users
      req.open("PUT", "/users");
      req.setRequestHeader("Content-Type", "application/json");
      req.send(JSON.stringify(inputData));
   }
}