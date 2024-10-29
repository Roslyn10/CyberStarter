var loginForm = document.getElementById("login");
var signupForm = document.getElementById("signup");
var btn = document.getElementById("btn");

function signup() {
    loginForm.style.left = "-400px"; // Move login form off-screen
    signupForm.style.left = "50px";  // Bring signup form into view
    btn.style.left = "110px";         // Move button to the signup position
}

function login() {
    loginForm.style.left = "50px";    // Bring login form into view
    signupForm.style.left = "450px";  // Move signup form off-screen
    btn.style.left = "0px";           // Move button to the login position
}

// Handle Sign Up
async function handleSignup(event) {
    event.preventDefault(); // Prevent the default form submission
    const formData = new FormData(signupForm);
    const userData = {
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
    };

    try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const result = await response.json();
        if (response.ok) {
            console.log('Registration successful:', result);
            // Redirect to the main page after successful signup
            window.location.href = 'index.html';
        } else {
            console.error('Registration failed:', result);
            // Handle registration error (e.g., show an error message)
        }
    } catch (error) {
        console.error('Error during registration:', error);
    }
}

// Handle Log In
async function handleLogin(event) {
    event.preventDefault(); // Prevent the default form submission
    const formData = new FormData(loginForm);
    const userData = {
        email: formData.get('username'), // Assuming 'username' field is used for email
        password: formData.get('password'),
    };

    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const result = await response.json();
        if (response.ok) {
            console.log('Login successful:', result);
            // Store the token if needed
            localStorage.setItem('token', result.token); // Example of storing the token
            // Redirect to the main page after successful login
            window.location.href = 'index.html';
        } else {
            console.error('Login failed:', result);
            // Handle login error (e.g., show an error message)
        }
    } catch (error) {
        console.error('Error during login:', error);
    }
}