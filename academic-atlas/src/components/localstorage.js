// Get user credentials from the user
const username = "exampleUser";
const password = "examplePassword";

// Store user credentials in local storage
localStorage.setItem("username", username);
localStorage.setItem("password", password);

// Retrieve user credentials from local storage
const storedUsername = localStorage.getItem("username");
const storedPassword = localStorage.getItem("password");

// Check if user credentials exist in local storage
if (storedUsername && storedPassword) {
    // User credentials exist, do something with them
    console.log("Username:", storedUsername);
    console.log("Password:", storedPassword);
} else {
    // User credentials do not exist in local storage
    console.log("User credentials not found,please log in again");
}