// Reference to the form elements and sliding button
const loginForm = document.getElementById("login");
const signupForm = document.getElementById("signup");
const btn = document.getElementById("btn");

// Switch to signup form
function signup() {
    loginForm.style.left = "-400px";
    signupForm.style.left = "50px";
    btn.style.left = "110px";
}

// Switch to login form
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
        console.log('Sign Up Data:', userData); // Log the data being sent
        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
            credentials: 'include',
        });

        const result = await response.json();
        console.log('Sign Up Response:', result); // Log the response
        if (response.ok) {
            console.log('Registration successful:', result);
            // Redirect to the main page after successful signup
            window.location.href = 'home-page.html';
        } else {
            console.error('Registration failed:', result);
            // Handle registration error 
            alert(result.message || 'Registration failed');
        }
    } catch (error) {
        console.error('Error during registration:', error);
        alert('An error occurred during registration.');
    }
}

// Handle Log In
async function handleLogin(event) {
    event.preventDefault(); // Prevent the default form submission
    const formData = new FormData(loginForm);
    const userData = {
        email: formData.get('email'), 
        password: formData.get('password'),
    };

    try {
        console.log('Login Data:', userData); // Log the data being sent
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const result = await response.json();
        console.log('Login Response:', result); // Log the response
        if (response.ok) {
            console.log('Login successful:', result);
            // Store the token if needed
            localStorage.setItem('token', result.token); // storing the token
            // Redirect to the main page after successful login
            window.location.href = 'home-page.html';
        } else {
            console.error('Login failed:', result);
            // Handle login error 
            alert(result.message || 'Login failed');
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred during login.');
    }
}