function findArt() {
    let findTitle = document.getElementById("findTitle").value.trim();
    let findArtist = document.getElementById("findArtist").value.trim();
    let findCtg = document.getElementById("findCtg").value.trim();
    let findYear = document.getElementById("findYear").value.trim();
    let findMedium = document.getElementById("findMedium").value.trim();
    
    let findArtwork = {
        Title: findTitle,
        Artist: findArtist,
        Category: findCtg,
        Year: findYear,
        Medium: findMedium
    };

    // XMLHttpRequest 
    let req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (this.readyState==4 && this.status==200) {
            // Check if there is any response data from the server 
            const data = JSON.parse(this.responseText);

            // Empty the textbox 
            document.getElementById("addName").value = "";
            document.getElementById("addVendor").value = "";
            document.getElementById("addCtg").value = "";
            document.getElementById("addPrice").value = "";
            document.getElementById("addStock").value = "";
            document.getElementById("addDesc").value = "";

            // Redirect to the item window
            //window.location.href = `/items/${data._id}`;
        }
    }

    // Send PUT request to /search
    req.open("PUT", "/search");
    req.setRequestHeader("Content-Type", "application/json");
    req.send(JSON.stringify(findArtwork));
}