var LoginForm = document.getElementById("LoginForm");
var RegForm = document.getElementById("RegForm");
var Indicator = document.getElementById("Indicator");

// Switching forms
function register() {
    RegForm.style.transform = "translateX(0px)";
    LoginForm.style.transform = "translatex(0px)";
    Indicator.style.transform = "translatex(100px)";
}

function login() {
    RegForm.style.transform = "translateX(300px)";
    LoginForm.style.transform = "translatex(300px)";
    Indicator.style.transform = "translatex(0px)";
}

// Save the account on registration
document.querySelector("#RegForm button").addEventListener("click", function (e) {
    e.preventDefault();

    const username = RegForm.querySelector('input[placeholder="Username"]').value;
    const email = RegForm.querySelector('input[placeholder="Email"]').value;
    const password = RegForm.querySelector('input[placeholder="password"]').value;

    if (username && email && password) {
        const account = { username, email, password };
        localStorage.setItem("userAccount", JSON.stringify(account));
        alert("Account created successfully!");
        login();
    } else {
        alert("Please fill in all fields.");
    }
});

// Validate the account on login
document.querySelector("#LoginForm button").addEventListener("click", function (e) {
    e.preventDefault();

    const username = LoginForm.querySelector('input[placeholder="Username"]').value;
    const password = LoginForm.querySelector('input[placeholder="password"]').value;

    const savedAccount = JSON.parse(localStorage.getItem("userAccount"));

    if (savedAccount) {
        if (savedAccount.username === username && savedAccount.password === password) {
            alert("Login successful! Welcome, " + savedAccount.username);
            localStorage.setItem("loggedInUser", username);
            updateUserUI(username);
            window.location.href = "./HomePage.html";
        } else {
            alert("Invalid username or password.");
        }
    } else {
        alert("No account found. Please create one first.");
    }
});

// Update the UI with the logged-in user's name
function updateUserUI(username) {
    const userContainer = document.querySelector(".ca");
    const userNameElement = document.createElement("span");
    userNameElement.textContent = username;
    userNameElement.classList.add("username-display");
    userContainer.appendChild(userNameElement);
}

// Logout functionality
document.getElementById("logoutButton").addEventListener("click", function () {
    localStorage.removeItem("loggedInUser");
    resetUserUI();
    alert("You have been logged out.");
    window.location.href = "./login.html";
});

// Reset the UI after logout
function resetUserUI() {
    const userContainer = document.querySelector(".ca");
    const userNameElement = userContainer.querySelector(".username-display");
    if (userNameElement) {
        userContainer.removeChild(userNameElement);
    }
}

// Check if a user is already logged in
document.addEventListener("DOMContentLoaded", function () {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
        updateUserUI(loggedInUser);
    }
});
