var loginForm = document.getElementById("login");
var signupForm = document.getElementById("signup");
var btn = document.getElementById("btn");

function signup() {
    loginForm.style.left = "-400px";
    signupForm.style.left = "50px";
    btn.style.left = "110px";
}

function login() {
    loginForm.style.left = "50px";
    signupForm.style.left = "450px";
    btn.style.left = "0px";
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
            // Handle successful registration (e.g., redirect or show a message)
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
            // Redirect or show a message
        } else {
            console.error('Login failed:', result);
            // Handle login error (e.g., show an error message)
        }
    } catch (error) {
        console.error('Error during login:', error);
    }
}