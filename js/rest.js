
// Check if a user is logged in
document.addEventListener("DOMContentLoaded", function () {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
        updateUserUI(loggedInUser);
    }
});

// Function to update the UI with the logged-in user's name
function updateUserUI(username) {
    const userContainer = document.querySelector(".ca");
    const userNameElement = document.createElement("span");
    userNameElement.textContent = username;
    userNameElement.classList.add("username-display");
    userContainer.appendChild(userNameElement);
}

