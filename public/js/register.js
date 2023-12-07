// Submit the registration for new user 
function register() {
   // Get the values of input data 
   let uName = document.getElementById("fullName");
   let pass = document.getElementById("password");
   let inputData = [uName, pass];  // Put all variables into an array

   // XMLHttpRequest 
   let req = new XMLHttpRequest();

   req.onreadystatechange = function() {
      if (this.readyState==4 && this.status==200) {
         // Check response data from the server 
         const data = JSON.parse(this.responseText); 

         // Alert the user the message from the server
         alert(data);

         // Redirect to the user account
         
      }
   }

   // Send POST request to /items
   req.open("POST", "/users");
   req.setRequestHeader("Content-Type", "application/json");
   req.send(JSON.stringify(inputData));
}


// Let existing user log in 
function login() {
   // Get the values of input data 
   let uName = document.getElementById("fullName");
   let pass = document.getElementById("password");

   // XMLHttpRequest 
   let req = new XMLHttpRequest();

   req.onreadystatechange = function() {
      if (this.readyState==4 && this.status==200) {
         // Check response data from the server 
         const data = JSON.parse(this.responseText); 

         // Alert the user the message from the server
         alert(data);

         // Redirect to the user account
         
      }
   }

   req.open("GET", "/users");
   req.send();
}