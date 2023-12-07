function checkForm() {
    // Get the values of input data 
    let uName = document.getElementById("fullName");
    let email = document.getElementById("email");
    let pass = document.getElementById("password");
    let confirm = document.getElementById("passwordConfirm");
    let inputData = [uName, email, pass, confirm];  // Put all variables into an array
 
    // Remove error value for each data
    for (let i = 0; i < inputData.length; i++) {
       inputData[i].classList.remove("error");
    }
 
    // Error message
    let message = document.getElementById("formErrors");
    message.classList.add("hide");   // hide the error message at first
    message.innerHTML = " ";   // Clear the previous data 
    let allErrors = [];     // Create a list of all errors 
 
    // Check if there is an error or not //
    // to check for user name
    const forName = /^\w+ \w+$/;    
    if (forName.test(uName.value.trim()) == false || !uName.value.trim()) {
       allErrors.push("Missing full name.");
       uName.classList.add("error");
    }
 
    // to check for email
    const forEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/   
    if (forEmail.test(email.value.trim()) == false || !email.value.trim()) {
       allErrors.push("Invalid or missing email address.");
       email.classList.add("error");
    }
 
    // To check password
    if (!/[a-z]/.test(pass.value) || !/[A-Z]/.test(pass.value) || !/\d/.test(pass.value) || pass.value.length < 10 || pass.value.length > 20) {
       pass.classList.add("error");
       if (pass.value.length < 10 || pass.value.length > 20) {
          allErrors.push("Password must be between 10 and 20 characters.");
       }
       if (!/[a-z]/.test(pass.value)) {
          allErrors.push("Password must contain at least one lowercase character.");
       }
       if (!/[A-Z]/.test(pass.value)) {
          allErrors.push("Password must contain at least one uppercase character.");
       } 
       if (!/\d/.test(pass.value)) {
          allErrors.push("Password must contain at least one digit.");
       }
    }
 
    // To check password and confirmed password
    if (pass.value !== confirm.value) {
       confirm.classList.add("error");
       allErrors.push("Password and confirmation password don't match.");
    }
 
    // Add error message to the website
    if (allErrors.length > 0) {
       // Create an unordered list
       let ul = document.createElement("ul"); 
       // Add to the unordered list 
       for (let i = 0; i < allErrors.length; i++) {
          let listEl = document.createElement("li");  // Create new list item
          listEl.appendChild(document.createTextNode(allErrors[i]))   // Append the text to list item 
          ul.appendChild(listEl);    // Append list item to unordered list
       }
       message.appendChild(ul);    // Add the list to error div
    }
 
    // Unhide the error
    message.classList.remove("hide");
}
 
document.getElementById("submit").addEventListener("click", function(event) {
    checkForm();

    // Prevent default form action. => Get this from tutorial 8 
    event.preventDefault();
});