const loginForm = document.getElementById('login');
const signupForm = document.getElementById('signup');
const btn = document.getElementById('btn');
const errorMessage = document.getElementById('error-message');

// URL Base (set up for development, can be adjusted for production)
const API_BASE_URL = 'http://localhost:5000/api/auth';

// Function to switch to the signup form
function signup () {
  loginForm.style.left = '-400px';
  signupForm.style.left = '50px';
  btn.style.left = '110px';
}

// Function to switch to the login form
function login () {
  loginForm.style.left = '50px';
  signupForm.style.left = '450px';
  btn.style.left = '0px';
}

// Handle Sign Up
async function handleSignup (event) {
  event.preventDefault();
  errorMessage.textContent = '';

  const formData = new FormData(signupForm);
  const userData = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password')
  };

  try {
    console.log('Sign Up Data:', userData);
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    const result = await response.json();
    if (response.ok) {
      console.log('Registration successful:', result);
      localStorage.setItem('token', result.token);
      window.location.href = 'index.html';
    } else {
      console.error('Registration failed:', result);
      errorMessage.textContent = result.message || 'Registration failed';
    }
  } catch (error) {
    console.error('Error during registration:', error);
    errorMessage.textContent = 'An error occurred during registration.';
  }
}

// Handle Log In
async function handleLogin (event) {
  event.preventDefault();
  errorMessage.textContent = '';

  const formData = new FormData(loginForm);
  const userData = {
    email: formData.get('email'),
    password: formData.get('password')
  };

  try {
    console.log('Login Data:', userData);
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    const result = await response.json();
    if (response.ok) {
      console.log('Login successful:', result);
      localStorage.setItem('token', result.token);
      window.location.href = 'index.html';
    } else {
      console.error('Login failed:', result);
      errorMessage.textContent = result.message || 'Login failed';
    }
  } catch (error) {
    console.error('Error during login:', error);
    errorMessage.textContent = 'An error occurred during login.';
  }
}

document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');  // Get the JWT token from localStorage
    const errorMessage = document.getElementById('error-message');
    const usernameElement = document.getElementById('username');
    const emailElement = document.getElementById('email');
    
    if (!token) {
        errorMessage.textContent = 'You need to be logged in to view your profile.';
        errorMessage.style.display = 'block';
        return;
    }

    try {
        // Send a request to the backend to fetch the user's profile data
        const response = await fetch('http://localhost:5000/api/auth/profile', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,  // Include the token in the Authorization header
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();

        if (response.ok) {
            // Display the user's profile data
            usernameElement.textContent = result.username;
            emailElement.textContent = `Email: ${result.email}`;
        } else {
            errorMessage.textContent = result.message || 'Error fetching profile data';
            errorMessage.style.display = 'block';
        }
    } catch (error) {
        console.error('Error fetching profile data:', error);
        errorMessage.textContent = 'An error occurred while fetching profile data.';
        errorMessage.style.display = 'block';
    }
});

// Logout functionality
document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('token');  // Remove token from localStorage
    window.location.href = 'login.html';  // Redirect to login page
});

// Attach the functions to form buttons
document.getElementById('signup-btn').addEventListener('click', signup);
document.getElementById('login-btn').addEventListener('click', login);
signupForm.addEventListener('submit', handleSignup);
loginForm.addEventListener('submit', handleLogin);