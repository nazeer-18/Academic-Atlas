document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const welcomeMessage = document.getElementById('welcomeMessage');

    // Check if user is already logged in
    if (localStorage.getItem('loggedInUser')) {
        const username = localStorage.getItem('loggedInUser');
        welcomeMessage.textContent = `Welcome back, ${username}!`;
        loginForm.style.display = 'none';
        // Redirect to another page if necessary
        // window.location.href = 'homepage.html';
    }

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Mock authentication check (replace this with your actual authentication logic)
        if (username === 'testuser' && password === 'password123') {
            // Store user in local storage
            localStorage.setItem('loggedInUser', username);
            welcomeMessage.textContent = `Login successful! Welcome, ${username}.`;

            // Hide the form after successful login
            loginForm.style.display = 'none';

            // Redirect to another page if necessary
            // window.location.href = 'homepage.html';
        } else {
            alert('Invalid username or password');
        }
    });
});