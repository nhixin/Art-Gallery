// Toggle between follow and unfollow button 
function toggleFollowUnfollow() {
    // Get the like and unlike buttons 
    let followButton = document.getElementById("followButton");
    let unfollowButton = document.getElementById("unfollowButton");

    // Check the visibility of the like button to determine the current state
    let clickFollow = followButton.style.display === "none";

    // Toggle button visibility
    if (clickFollow) {
        followButton.style.display = "inline-block";
        unfollowButton.style.display = "none";
    } else {
        followButton.style.display = "none";
        unfollowButton.style.display = "inline-block";
    }
}